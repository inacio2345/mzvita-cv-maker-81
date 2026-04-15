import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

const PAYSUITE_WEBHOOK_SECRET = Deno.env.get("webhooks") || Deno.env.get("PAYSUITE_WEBHOOK_SECRET")

async function verifySignature(payload: string, signature: string, secret: string) {
  const encoder = new TextEncoder()
  const keyBuffer = encoder.encode(secret)
  const payloadBuffer = encoder.encode(payload)
  
  const key = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    payloadBuffer
  )
  
  const calculatedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")

  return calculatedSignature === signature
}

serve(async (req) => {
  if (req.method !== "POST") return new Response("Metodo nao permitido", { status: 405 })

  const signature = req.headers.get("X-Webhook-Signature")
  if (!signature) return new Response("Assinatura ausente", { status: 401 })

  try {
    const rawBody = await req.text()
    const payload = JSON.parse(rawBody)

    // 1. Verificacao de Seguranca
    if (PAYSUITE_WEBHOOK_SECRET) {
      const isValid = await verifySignature(rawBody, signature, PAYSUITE_WEBHOOK_SECRET)
      if (!isValid) return new Response("Assinatura invalida", { status: 403 })
    }

    if (payload.event === "payment.success") {
      const { id: paysuite_id, amount, reference } = payload.data
      
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      )

      // 2. Buscar o pagamento e o usuario
      const { data: payment, error: pError } = await supabase
        .from("payments")
        .select("id, user_id, plan_type, status, amount, affiliate_code, affiliate_id, cv_id")
        .eq("paysuite_id", paysuite_id)
        .single()

      if (pError || !payment) {
          console.error("Pagamento não encontrado no BD:", paysuite_id)
          return new Response("Nao encontrado", { status: 404 })
      }

      if (payment.status === "paid") {
          return new Response("Ja processado", { status: 200 })
      }

      // 3. Atualizar status do pagamento
      await supabase
        .from("payments")
        .update({ status: "paid", updated_at: new Date().toISOString() })
        .eq("paysuite_id", paysuite_id)

      // 4. Aplicar benefícios do Plano com ACUMULAÇÃO (Stacking)
      const now = new Date()
      
      // Buscar perfil actual do utilizador
      const { data: currentProfile } = await supabase
        .from("user_profiles")
        .select("cv_limit, cv_used, subscription_expires_at, plan_type")
        .eq("id", payment.user_id)
        .single()

      const currentLimit = currentProfile?.cv_limit || 0
      const currentExpiry = currentProfile?.subscription_expires_at 
        ? new Date(currentProfile.subscription_expires_at) 
        : null

      let newLimit = currentLimit
      let expires_at = null
      let is_premium = true
      let newPlanType = payment.plan_type

      if (payment.plan_type === 'single') {
          // Se o pagamento JÁ está vinculado a um CV específico (Pay-per-CV),
          // não adicionamos crédito genérico no cv_limit para evitar benefício duplo.
          // O acesso será garantido pela verificação do cvId na tabela de pagamentos.
          if (!payment.cv_id) {
            newLimit = currentLimit + 1
          }
          
          is_premium = currentProfile?.plan_type === 'monthly' || currentProfile?.plan_type === 'annual'
          // Manter o plan_type anterior se for superior
          if (currentProfile?.plan_type === 'monthly' || currentProfile?.plan_type === 'annual') {
            newPlanType = currentProfile.plan_type
          }
          // Manter a data de expiração existente
          expires_at = currentExpiry
      } else if (payment.plan_type === 'monthly') {
          // Mensal: acumular +10 créditos ao saldo existente
          newLimit = currentLimit + 10
          // Se o plano ainda está activo, somar +30 dias à data de expiração actual
          if (currentExpiry && currentExpiry > now) {
            expires_at = new Date(currentExpiry.getTime() + 30 * 24 * 60 * 60 * 1000)
          } else {
            // Se expirou ou é novo, contar +30 dias a partir de hoje
            expires_at = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
          }
      } else if (payment.plan_type === 'annual') {
          // Anual: sem limites práticos
          newLimit = 999999
          if (currentExpiry && currentExpiry > now) {
            expires_at = new Date(currentExpiry.getTime() + 365 * 24 * 60 * 60 * 1000)
          } else {
            expires_at = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
          }
      }

      const { error: upError } = await supabase
        .from("user_profiles")
        .update({
          plan_type: newPlanType,
          cv_limit: newLimit,
          subscription_expires_at: expires_at ? expires_at.toISOString() : null,
          is_premium: is_premium
        })
        .eq("id", payment.user_id)

      if (upError) throw upError
      
      console.log(`Plano ${payment.plan_type} ativado para o usuario ${payment.user_id}`)

      // 5. Atribuir comissão se houver afiliado (Nova Tabela affiliate_commissions)
      if (payment.affiliate_id || payment.affiliate_code) {
        let affiliateId = payment.affiliate_id;
        let commRate = 0.30;

        // Se não tivermos o ID mas tivermos o código, procuramos o afiliado
        if (!affiliateId && payment.affiliate_code) {
          const { data: affData } = await supabase
            .from("affiliates")
            .select("id, commission_rate")
            .eq("code", payment.affiliate_code)
            .single();
          
          if (affData) {
            affiliateId = affData.id;
            commRate = affData.commission_rate ? Number(affData.commission_rate) / 100 : 0.30;
          }
        } else if (affiliateId) {
          const { data: affData } = await supabase
            .from("affiliates")
            .select("commission_rate")
            .eq("id", affiliateId)
            .single();
          if (affData) {
            commRate = affData.commission_rate ? Number(affData.commission_rate) / 100 : 0.30;
          }
        }

        if (affiliateId) {
          const commissionAmount = Number(payment.amount) * commRate;

          const { error: commError } = await supabase
            .from("affiliate_commissions")
            .insert({
              affiliate_id: affiliateId,
              payment_id: payment.id,
              amount: commissionAmount,
              status: "pending"
            });
            
          if (commError) {
             console.error("Erro ao inserir comissao na nova tabela:", commError);
          } else {
             console.log("Comissao de", commissionAmount, "registada para o afiliado", affiliateId);
          }
        }
      }
    }

    return new Response("Webhook processado", { status: 200 })

  } catch (error) {
    console.error("Erro no Webhook:", error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
