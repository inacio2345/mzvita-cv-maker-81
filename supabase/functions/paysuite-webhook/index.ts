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
        .select("user_id, plan_type, status")
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

      // 4. Aplicar benefícios do Plano
      const now = new Date()
      let expires_at = null
      let cv_limit = 0
      let is_premium = true

      if (payment.plan_type === 'single') {
          // Apenas adiciona 1 crédito ao que o usuário já tem
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("cv_limit")
            .eq("id", payment.user_id)
            .single()
            
          cv_limit = (profile?.cv_limit || 0) + 1
          is_premium = false // Plano avulso não dá status premium (sem anúncios) permanentemente
      } else if (payment.plan_type === 'monthly') {
          cv_limit = 10
          expires_at = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      } else if (payment.plan_type === 'annual') {
          cv_limit = 999999 // Sem limites práticos
          expires_at = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
      }

      const { error: upError } = await supabase
        .from("user_profiles")
        .update({
          plan_type: payment.plan_type,
          cv_limit: cv_limit,
          subscription_expires_at: expires_at ? expires_at.toISOString() : null,
          is_premium: is_premium
        })
        .eq("id", payment.user_id)

      if (upError) throw upError
      
      console.log(`Plano ${payment.plan_type} ativado para o usuario ${payment.user_id}`)
    }

    return new Response("Webhook processado", { status: 200 })

  } catch (error) {
    console.error("Erro no Webhook:", error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
