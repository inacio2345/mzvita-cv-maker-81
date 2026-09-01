import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// ============================================================
// ZumboPay Webhook — Processa notificações de pagamento
// Eventos: payment.succeeded, payment.failed, payment.refunded
// Verificação HMAC SHA-256 via x-zumbopay-signature
// ============================================================

const ZUMBOPAY_WEBHOOK_SECRET = Deno.env.get("ZUMBOPAY_WEBHOOK_SECRET") || "whsec_79d1d58a98e410bb6eb552fe43769378c07bb63e84fb6b41s"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Verificar assinatura HMAC SHA-256
async function verifySignature(rawBody: string, signature: string, secret: string): Promise<boolean> {
  if (!secret || !signature) return false
  
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    )
    
    const sig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(rawBody)
    )
    
    const expected = Array.from(new Uint8Array(sig))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    // Comparação segura contra timing attacks
    if (expected.length !== signature.length) return false
    let diff = 0
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i)
    }
    return diff === 0
  } catch (err) {
    console.error("Erro na verificação HMAC:", err)
    return false
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response("Método não permitido", { status: 405 })
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  )

  let rawBody = ""
  let payload: any = null

  try {
    rawBody = await req.text()
    payload = JSON.parse(rawBody)
  } catch (parseErr) {
    await supabase.from("webhook_logs").insert({
      event_type: "parse_error",
      payload: { raw: rawBody.substring(0, 2000) },
      processing_status: "failed",
      error_message: "JSON inválido recebido no webhook ZumboPay"
    })
    return new Response("JSON invalido", { status: 400 })
  }

  try {
    // PASSO 1: Verificar assinatura HMAC (se secret configurado)
    const signature = req.headers.get("x-zumbopay-signature") || ""
    
    if (ZUMBOPAY_WEBHOOK_SECRET) {
      const isValid = await verifySignature(rawBody, signature, ZUMBOPAY_WEBHOOK_SECRET)
      if (!isValid) {
        console.error("❌ Assinatura HMAC inválida!")
        await supabase.from("webhook_logs").insert({
          event_type: "signature_invalid",
          payload: payload,
          processing_status: "failed",
          error_message: "Assinatura HMAC inválida"
        })
        return new Response("Assinatura inválida", { status: 401 })
      }
      console.log("✅ Assinatura HMAC verificada com sucesso")
    } else {
      console.warn("⚠️ ZUMBOPAY_WEBHOOK_SECRET não configurado - pulando verificação HMAC")
    }

    // PASSO 2: Loggar o evento
    const eventType = payload.event || payload.type || "unknown"
    
    const logEntry = await supabase.from("webhook_logs").insert({
      event_type: eventType,
      payload: payload,
      paysuite_id: payload.data?.reference || payload.data?.id || null,
      processing_status: "received"
    }).select("id").single()

    const logId = logEntry.data?.id

    // PASSO 3: Extrair referência do ZumboPay
    const zumboReference = 
      payload.data?.reference ||
      payload.data?.id ||
      payload.reference ||
      payload.id ||
      payload.transaction_id ||
      payload.data?.source_id ||
      payload.source_id

    // PASSO 4: Classificar tipo de evento
    const eventLower = String(eventType).toLowerCase()
    
    const isSuccessEvent = 
      eventLower === "payment.succeeded" ||
      eventLower === "payment.completed" ||
      eventLower === "charge.succeeded" ||
      eventLower.includes("success") ||
      eventLower.includes("paid")

    const isFailureEvent =
      eventLower === "payment.failed" ||
      eventLower === "payment.cancelled" ||
      eventLower === "payment.expired" ||
      eventLower === "charge.failed" ||
      eventLower === "subscription.failed" ||
      eventLower.includes("fail") ||
      eventLower.includes("cancel")

    const isRefundEvent = eventLower === "payment.refunded" || eventLower.includes("refund")

    if (!isSuccessEvent && !isFailureEvent && !isRefundEvent) {
      console.log(`Evento secundário/não crítico ignorado: ${eventType}`)
      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "skipped",
          error_message: `Evento ignorado: ${eventType}`
        }).eq("id", logId)
      }
      return new Response("Evento ignorado", { status: 200 })
    }

    if (!zumboReference) {
      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "failed",
          error_message: "Nenhuma referência encontrada no payload ZumboPay"
        }).eq("id", logId)
      }
      return new Response("Referência ausente", { status: 400 })
    }

    console.log(`Processando evento [${eventType}] para referência ZumboPay: ${zumboReference}`)

    // PASSO 5: Buscar pagamento no BD
    let finalPayment: any = null

    const { data: payment } = await supabase
      .from("payments")
      .select("id, user_id, plan_type, status, amount, affiliate_code, affiliate_id, cv_id")
      .eq("paysuite_id", zumboReference)
      .single()

    if (payment) {
      finalPayment = payment
    } else {
      // Fallback: buscar por reference (source_id)
      const sourceId = payload.data?.source_id || payload.source_id
      if (sourceId) {
        const { data: refPayment } = await supabase
          .from("payments")
          .select("id, user_id, plan_type, status, amount, affiliate_code, affiliate_id, cv_id")
          .eq("reference", sourceId)
          .single()
        finalPayment = refPayment
      }
    }

    if (!finalPayment) {
      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "failed",
          paysuite_id: zumboReference,
          error_message: `Pagamento não encontrado no BD para referência: ${zumboReference}`
        }).eq("id", logId)
      }
      return new Response("Pagamento não encontrado", { status: 404 })
    }

    // PASSO 6: Tratar evento de FALHA / CANCELAMENTO
    if (isFailureEvent) {
      const failureReason = payload.data?.reason || payload.error?.message || "Pagamento recusado ou cancelado no ZumboPay"
      console.warn(`❌ Pagamento falhou/cancelou (${zumboReference}): ${failureReason}`)

      await supabase
        .from("payments")
        .update({ status: "failed", updated_at: new Date().toISOString() })
        .eq("id", finalPayment.id)

      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "processed",
          paysuite_id: zumboReference,
          error_message: `Pagamento falhou: ${failureReason}`
        }).eq("id", logId)
      }

      return new Response("Pagamento registrado como falhou", { status: 200 })
    }

    // PASSO 7: Tratar evento de REEMBOLSO
    if (isRefundEvent) {
      console.log(`↺ Pagamento reembolsado (${zumboReference})`)

      await supabase
        .from("payments")
        .update({ status: "refunded", updated_at: new Date().toISOString() })
        .eq("id", finalPayment.id)

      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "processed",
          paysuite_id: zumboReference
        }).eq("id", logId)
      }

      return new Response("Pagamento registrado como reembolsado", { status: 200 })
    }

    // PASSO 8: Verificar idempotência de SUCESSO
    if (finalPayment.status === "paid") {
      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "skipped",
          paysuite_id: zumboReference,
          error_message: "Já processado anteriormente como pago"
        }).eq("id", logId)
      }
      return new Response("Já processado", { status: 200 })
    }

    // ============================================================
    // PASSO 9: PROCESSAR SUCESSO DE PAGAMENTO (NÚCLEO)
    // ============================================================

    // 7a. Marcar pagamento como pago
    const { error: updateError } = await supabase
      .from("payments")
      .update({ status: "paid", updated_at: new Date().toISOString() })
      .eq("id", finalPayment.id)

    if (updateError) {
      throw new Error(`Falha ao atualizar pagamento: ${updateError.message}`)
    }

    // 7b. Aplicar benefícios do Plano com ACUMULAÇÃO
    const now = new Date()
    
    const { data: currentProfile } = await supabase
      .from("user_profiles")
      .select("cv_limit, cv_used, subscription_expires_at, plan_type")
      .eq("id", finalPayment.user_id)
      .single()

    const currentLimit = currentProfile?.cv_limit || 0
    const currentExpiry = currentProfile?.subscription_expires_at 
      ? new Date(currentProfile.subscription_expires_at) 
      : null

    let newLimit = currentLimit
    let expires_at: Date | null = null
    let newPlanType = finalPayment.plan_type

    if (finalPayment.plan_type === 'single') {
      if (!finalPayment.cv_id) {
        newLimit = currentLimit + 1
      }
      if (currentProfile?.plan_type === 'monthly' || currentProfile?.plan_type === 'annual') {
        newPlanType = currentProfile.plan_type
      }
      expires_at = currentExpiry
    } else if (finalPayment.plan_type === 'monthly') {
      newLimit = currentLimit + 10
      if (currentExpiry && currentExpiry > now) {
        expires_at = new Date(currentExpiry.getTime() + 30 * 24 * 60 * 60 * 1000)
      } else {
        expires_at = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      }
    } else if (finalPayment.plan_type === 'annual') {
      newLimit = 999999
      if (currentExpiry && currentExpiry > now) {
        expires_at = new Date(currentExpiry.getTime() + 365 * 24 * 60 * 60 * 1000)
      } else {
        expires_at = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
      }
    }

    const isPremiumPlan = newPlanType === 'monthly' || newPlanType === 'annual'

    const { error: upError } = await supabase
      .from("user_profiles")
      .update({
        plan_type: newPlanType,
        cv_limit: newLimit,
        subscription_expires_at: expires_at ? expires_at.toISOString() : null,
        is_premium: isPremiumPlan
      })
      .eq("id", finalPayment.user_id)

    if (upError) {
      throw new Error(`Falha ao atualizar perfil: ${upError.message}`)
    }
    
    console.log(`✅ Plano ${finalPayment.plan_type} ativado para ${finalPayment.user_id}. Limites: ${newLimit}`)

    // 7c. Atribuir comissão de afiliado
    if (finalPayment.affiliate_id || finalPayment.affiliate_code) {
      let affiliateId = finalPayment.affiliate_id
      let commRate = 0.30

      if (!affiliateId && finalPayment.affiliate_code) {
        const { data: affData } = await supabase
          .from("affiliates")
          .select("id, commission_rate")
          .eq("code", finalPayment.affiliate_code)
          .eq("status", "approved")
          .single()
        
        if (affData) {
          affiliateId = affData.id
          commRate = affData.commission_rate ? Number(affData.commission_rate) : 0.30
        }
      } else if (affiliateId) {
        const { data: affData } = await supabase
          .from("affiliates")
          .select("commission_rate")
          .eq("id", affiliateId)
          .single()
        if (affData) {
          commRate = affData.commission_rate ? Number(affData.commission_rate) : 0.30
        }
      }

      if (affiliateId) {
        const commissionAmount = Number(finalPayment.amount) * commRate

        const { data: existingComm } = await supabase
          .from("affiliate_commissions")
          .select("id")
          .eq("payment_id", finalPayment.id)
          .maybeSingle()

        if (!existingComm) {
          const { error: commError } = await supabase
            .from("affiliate_commissions")
            .insert({
              affiliate_id: affiliateId,
              payment_id: finalPayment.id,
              amount: commissionAmount,
              status: "pending"
            })
            
          if (commError) {
            console.error("Erro ao inserir comissão:", commError)
          } else {
            console.log(`💰 Comissão de ${commissionAmount} MT registada para afiliado ${affiliateId}`)
          }
        }
      }
    }

    // PASSO 8: Marcar log como processado
    if (logId) {
      await supabase.from("webhook_logs").update({
        processing_status: "processed",
        paysuite_id: zumboReference
      }).eq("id", logId)
    }

    console.log(`✅ Webhook ZumboPay processado com sucesso para pagamento ${finalPayment.id}`)
    return new Response("Webhook processado com sucesso", { status: 200 })

  } catch (error: any) {
    console.error("❌ Erro no Webhook ZumboPay:", error.message || error)
    
    try {
      await supabase.from("webhook_logs").insert({
        event_type: payload?.event || "error",
        payload: payload,
        paysuite_id: payload?.data?.reference || null,
        processing_status: "failed",
        error_message: error.message || "Erro desconhecido"
      })
    } catch (_) { /* ignore logging errors */ }

    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
