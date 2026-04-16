import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  // Permitir apenas POST
  if (req.method !== "POST") {
    return new Response("Metodo nao permitido", { status: 405 })
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
    // Loggar tentativa inválida
    await supabase.from("webhook_logs").insert({
      event_type: "parse_error",
      payload: { raw: rawBody.substring(0, 2000) },
      processing_status: "failed",
      error_message: "JSON inválido recebido"
    })
    return new Response("JSON invalido", { status: 400 })
  }

  try {
    // PASSO 1: Loggar TUDO que chega (antes de qualquer validação)
    const logEntry = await supabase.from("webhook_logs").insert({
      event_type: payload.event || payload.type || "unknown",
      payload: payload,
      paysuite_id: payload.data?.id || payload.id || null,
      processing_status: "received"
    }).select("id").single()

    const logId = logEntry.data?.id

    // PASSO 2: Identificar o evento
    // PaySuite pode enviar: payment.success, payment.completed, ou variações
    const eventType = (payload.event || payload.type || "").toLowerCase()
    const isPaymentSuccess = 
      eventType.includes("success") || 
      eventType.includes("completed") || 
      eventType.includes("paid") ||
      payload.status === "success" ||
      payload.status === "completed"

    if (!isPaymentSuccess) {
      // Loggar mas não processar eventos que não são de pagamento
      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "skipped",
          error_message: `Evento ignorado: ${eventType}`
        }).eq("id", logId)
      }
      return new Response("Evento nao processavel", { status: 200 })
    }

    // PASSO 3: Extrair o paysuite_id (tentar múltiplos formatos)
    const paysuite_id = 
      payload.data?.id || 
      payload.id || 
      payload.transaction_id || 
      payload.payment_id ||
      payload.data?.transaction_id ||
      payload.data?.payment_id

    if (!paysuite_id) {
      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "failed",
          error_message: "Nenhum ID de transação encontrado no payload"
        }).eq("id", logId)
      }
      return new Response("ID de transacao ausente", { status: 400 })
    }

    // PASSO 4: Buscar o pagamento na nossa BD
    const { data: payment, error: pError } = await supabase
      .from("payments")
      .select("id, user_id, plan_type, status, amount, affiliate_code, affiliate_id, cv_id")
      .eq("paysuite_id", paysuite_id)
      .single()

    if (pError || !payment) {
      // Tentar buscar por referência como fallback
      const ref = payload.data?.reference || payload.reference
      let fallbackPayment = null
      
      if (ref) {
        const { data: refPayment } = await supabase
          .from("payments")
          .select("id, user_id, plan_type, status, amount, affiliate_code, affiliate_id, cv_id")
          .eq("reference", ref)
          .single()
        fallbackPayment = refPayment
      }

      if (!fallbackPayment) {
        if (logId) {
          await supabase.from("webhook_logs").update({
            processing_status: "failed",
            paysuite_id: paysuite_id,
            error_message: `Pagamento nao encontrado no BD para ID: ${paysuite_id}`
          }).eq("id", logId)
        }
        return new Response("Pagamento nao encontrado", { status: 404 })
      }

      // Usar o pagamento encontrado por referência
      Object.assign(payment || {}, fallbackPayment)
    }

    const finalPayment = payment!

    // PASSO 5: Verificar se já foi processado (idempotência)
    if (finalPayment.status === "paid") {
      if (logId) {
        await supabase.from("webhook_logs").update({
          processing_status: "skipped",
          paysuite_id: paysuite_id,
          error_message: "Ja processado anteriormente"
        }).eq("id", logId)
      }
      return new Response("Ja processado", { status: 200 })
    }

    // ============================================
    // PASSO 6: PROCESSAR PAGAMENTO (O NÚCLEO)
    // ============================================

    // 6a. Marcar pagamento como pago
    const { error: updateError } = await supabase
      .from("payments")
      .update({ status: "paid", updated_at: new Date().toISOString() })
      .eq("id", finalPayment.id)

    if (updateError) {
      throw new Error(`Falha ao atualizar pagamento: ${updateError.message}`)
    }

    // 6b. Aplicar benefícios do Plano com ACUMULAÇÃO
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
      // Pay-per-CV: só adicionar crédito se NÃO está vinculado a um CV específico
      if (!finalPayment.cv_id) {
        newLimit = currentLimit + 1
      }
      // Manter plan_type superior se existir
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

    // 6c. Atribuir comissão de afiliado
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

        // Verificar se a comissão já existe (idempotência)
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
            console.error("Erro ao inserir comissao:", commError)
          } else {
            console.log(`💰 Comissao de ${commissionAmount} MT registada para afiliado ${affiliateId}`)
          }
        }
      }
    }

    // PASSO 7: Marcar log como processado com sucesso
    if (logId) {
      await supabase.from("webhook_logs").update({
        processing_status: "processed",
        paysuite_id: paysuite_id
      }).eq("id", logId)
    }

    console.log(`✅ Webhook processado com sucesso para pagamento ${finalPayment.id}`)
    return new Response("Webhook processado com sucesso", { status: 200 })

  } catch (error: any) {
    console.error("❌ Erro no Webhook:", error.message || error)
    
    // Tentar loggar o erro
    try {
      await supabase.from("webhook_logs").insert({
        event_type: payload?.event || "error",
        payload: payload,
        paysuite_id: payload?.data?.id || null,
        processing_status: "failed",
        error_message: error.message || "Erro desconhecido"
      })
    } catch (_) { /* ignore logging errors */ }

    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
