import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const PAYSUITE_API_URL = "https://paysuite.tech/api/v1/payments"
const PAYSUITE_API_TOKEN = Deno.env.get("pymentmozvita") || Deno.env.get("PAYSUITE_API_TOKEN")

const PLAN_PRICES: Record<string, number> = {
  single: 50.00,
  monthly: 200.00,
  annual: 1290.00
}

const PLAN_DESCRIPTIONS: Record<string, string> = {
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
    const body = await req.json().catch(() => ({}));
    const { plan_type, user_id, affiliate_code, return_url, cv_id, affiliate_id } = body;

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "ID de usuário obrigatório" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!plan_type || !PLAN_PRICES[plan_type]) {
      return new Response(
        JSON.stringify({ error: "Plano inválido ou ausente" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const amount = PLAN_PRICES[plan_type]
    const description = PLAN_DESCRIPTIONS[plan_type]
    
    // Formatação segura da referência
    const userPart = String(user_id).replace(/-/g, '').substring(0, 8);
    const reference = `MZVT${Date.now()}${userPart}`

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
        return_url: return_url || "https://mozvita.online/dashboard",
        callback_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/paysuite-webhook`
      })
    })

    const result = await response.json()

    if (result.status !== "success") {
      console.error("Erro no PaySuite:", JSON.stringify(result))
      throw new Error(result.message || "Falha ao iniciar pagamento no PaySuite")
    }

    // =========================================================
    // GARANTIR affiliate_code: fallback para referred_by do perfil
    // =========================================================
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    let finalAffiliateCode = affiliate_code || null
    let finalAffiliateId = affiliate_id || null

    // Se o frontend não enviou affiliate_code, verificar o referred_by do perfil
    if (!finalAffiliateCode && !finalAffiliateId) {
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('referred_by')
        .eq('id', user_id)
        .single()
      
      if (userProfile?.referred_by) {
        finalAffiliateCode = userProfile.referred_by
        console.log(`Affiliate code recuperado do perfil (referred_by): ${finalAffiliateCode}`)

        // Resolver o affiliate_id a partir do código
        const { data: affiliate } = await supabase
          .from('affiliates')
          .select('id')
          .eq('code', finalAffiliateCode)
          .eq('status', 'approved')
          .single()
        
        if (affiliate) {
          finalAffiliateId = affiliate.id
          console.log(`Affiliate ID resolvido: ${finalAffiliateId}`)
        }
      }
    }

    let cvVersion = null;
    let snapshotData = null;

    if (cv_id) {
      const { data: cv } = await supabase
        .from('saved_cvs')
        .select('current_version, cv_data, template_name')
        .eq('id', cv_id)
        .single();
        
      if (cv) {
        cvVersion = cv.current_version;
        snapshotData = {
          cv_data: cv.cv_data,
          template_name: cv.template_name
        };
      }
    }

    const { error: dbError } = await supabase
      .from("payments")
      .insert({
        user_id,
        affiliate_code: finalAffiliateCode,
        affiliate_id: finalAffiliateId,
        paysuite_id: result.data.id,
        amount,
        reference,
        plan_type,
        status: "pending",
        cv_id: cv_id || null,
        cv_version: cvVersion,
        snapshot_data: snapshotData
      })

    if (dbError) throw dbError

    console.log(`Pagamento criado: ${reference} | Affiliate: ${finalAffiliateCode || 'nenhum'} | AffID: ${finalAffiliateId || 'nenhum'}`)

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

  } catch (error: any) {
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
