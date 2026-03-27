import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const PAYSUITE_API_URL = "https://paysuite.tech/api/v1/payments"
const PAYSUITE_API_TOKEN = Deno.env.get("pymentmozvita") || Deno.env.get("PAYSUITE_API_TOKEN")

const PLAN_PRICES = {
  single: 25.00,
  monthly: 200.00,
  annual: 1290.00
}

const PLAN_DESCRIPTIONS = {
  single: "MozVita - Plano Avulso (1 CV/Carta)",
  monthly: "MozVita - Plano Mensal (10 Itens + Sem Anúncios)",
  annual: "MozVita - Plano Anual (Ilimitado + Sem Anúncios)"
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { plan_type, user_id, return_url } = await req.json()

    if (!PLAN_PRICES[plan_type]) {
      throw new Error("Plano inválido")
    }

    const amount = PLAN_PRICES[plan_type]
    const description = PLAN_DESCRIPTIONS[plan_type]
    const reference = `MZVT${Date.now()}${user_id.replace(/-/g, '').substring(0, 8)}`

    const response = await fetch(PAYSUITE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PAYSUITE_API_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        amount: amount.toFixed(2),
        reference: reference,
        description: description,
        method: 'mpesa',
        return_url: return_url || "https://mozvita.online/dashboard",
        callback_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/paysuite-webhook`
      })
    })

    const result = await response.json()

    if (result.status !== "success") {
      console.error("Erro no PaySuite:", JSON.stringify(result))
      throw new Error(result.message || "Falha ao iniciar pagamento no PaySuite")
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    const { error: dbError } = await supabase
      .from("payments")
      .insert({
        user_id,
        paysuite_id: result.data.id,
        amount,
        reference,
        plan_type,
        status: "pending"
      })

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ 
        checkout_url: result.data.checkout_url,
        paysuite_id: result.data.id
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    )

  } catch (error) {
    console.error("Erro geral:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    )
  }
})
