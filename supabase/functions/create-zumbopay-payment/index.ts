import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// ============================================================
// ZumboPay API - Hosted Checkout (POST /payments)
// Docs: https://zumbopay.com/documentacao
// ============================================================

const ZUMBOPAY_API_URL = "https://zumbopay.com/api/public/v1"
const ZUMBOPAY_API_KEY = Deno.env.get("ZUMBOPAY_API_KEY") || "zk_live_9aba8fa9b2d42fc2c97c17ff8d0c422399581bc80ea7784aSS"
const ZUMBOPAY_MERCHANT_ID = Deno.env.get("ZUMBOPAY_MERCHANT_ID") || "MCH_9A0C97B759"
const ZUMBOPAY_WALLET_ID = Deno.env.get("ZUMBOPAY_WALLET_ID") || ""

const PLAN_PRICES: Record<string, number> = {
  single: 100.00,
  monthly: 200.00,
  annual: 1290.00
}

const PLAN_TITLES: Record<string, string> = {
  single: "MozVita - Plano Avulso (1 CV/Carta)",
  monthly: "MozVita - Plano Mensal (10 Itens + Sem Anúncios)",
  annual: "MozVita - Plano Anual (Ilimitado + Sem Anúncios)"
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Headers padrão para chamadas à API ZumboPay
function zumboHeaders(): Record<string, string> {
  return {
    "Authorization": `Bearer ${ZUMBOPAY_API_KEY}`,
    "X-Merchant-Id": ZUMBOPAY_MERCHANT_ID,
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
}

// Obter wallet_id dinamicamente se não configurado
async function getWalletId(): Promise<string> {
  if (ZUMBOPAY_WALLET_ID) return ZUMBOPAY_WALLET_ID

  console.log("ZUMBOPAY_WALLET_ID não configurado, buscando via GET /wallets...")
  
  const response = await fetch(`${ZUMBOPAY_API_URL}/wallets`, {
    method: "GET",
    headers: zumboHeaders()
  })

  if (!response.ok) {
    const errBody = await response.text()
    console.error("Erro ao buscar wallets:", errBody)
    throw new Error("Não foi possível obter a wallet de pagamentos. Verifique as credenciais ZumboPay.")
  }

  const result = await response.json()
  const wallets = result.data || result

  if (!Array.isArray(wallets) || wallets.length === 0) {
    throw new Error("Nenhuma wallet ativa encontrada na conta ZumboPay.")
  }

  // Preferir wallet M-Pesa, depois qualquer uma ativa
  const mpesaWallet = wallets.find((w: any) => w.method === "mpesa" && w.is_active)
  const activeWallet = mpesaWallet || wallets.find((w: any) => w.is_active) || wallets[0]

  console.log(`Wallet encontrada: ${activeWallet.name} (${activeWallet.method}) ID: ${activeWallet.id}`)
  return activeWallet.id
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const { plan_type, user_id, affiliate_code, return_url, cv_id, affiliate_id } = body

    // Validações
    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "ID de usuário obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    if (!plan_type || !PLAN_PRICES[plan_type]) {
      return new Response(
        JSON.stringify({ error: "Plano inválido ou ausente" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Validar credenciais ZumboPay
    if (!ZUMBOPAY_API_KEY || !ZUMBOPAY_MERCHANT_ID) {
      console.error("Credenciais ZumboPay ausentes")
      throw new Error("Configuração do sistema de pagamento incompleta. Contacte o suporte.")
    }

    const amount = PLAN_PRICES[plan_type]
    const title = PLAN_TITLES[plan_type]
    
    // Referência interna única
    const userPart = String(user_id).replace(/-/g, '').substring(0, 8)
    const sourceId = `MZVT${Date.now()}${userPart}`

    // Obter wallet_id
    const walletId = await getWalletId()

    // ============================================================
    // CRIAR PAGAMENTO via ZumboPay Hosted Checkout (POST /payments)
    // ============================================================
    const paymentPayload = {
      title: title,
      amount: amount,
      currency: "MZN",
      channels: ["mpesa", "emola", "card"],
      wallet_id: walletId,
      description: `${title} - Ref: ${sourceId}`,
      max_uses: 1,
      source_id: sourceId
    }

    console.log("Criando pagamento ZumboPay:", JSON.stringify(paymentPayload))

    const response = await fetch(`${ZUMBOPAY_API_URL}/payments`, {
      method: "POST",
      headers: zumboHeaders(),
      body: JSON.stringify(paymentPayload)
    })

    const result = await response.json()

    if (!response.ok || result.error) {
      console.error("Erro no ZumboPay:", JSON.stringify(result))
      
      const errCode = result.error?.code || ""
      const errMsg = result.error?.message || ""
      let userMessage = "Falha ao iniciar pagamento."

      if (errCode === "invalid_api_key" || errCode === "revoked_api_key") {
        userMessage = "Erro de autenticação no sistema de pagamentos. Contacte o suporte."
      } else if (errCode === "insufficient_scope") {
        userMessage = "Permissões insuficientes no sistema de pagamentos. Contacte o suporte."
      } else if (errCode === "wallet_not_found" || errCode === "missing_wallet_id") {
        userMessage = "Wallet de pagamento não encontrada. Contacte o suporte."
      } else if (errMsg) {
        userMessage = errMsg
      }

      throw new Error(userMessage)
    }

    const paymentData = result.data || result
    const checkoutUrl = paymentData.checkout_url
    const zumboReference = paymentData.reference || paymentData.id

    if (!checkoutUrl) {
      console.error("Checkout URL ausente na resposta:", JSON.stringify(result))
      throw new Error("Link de pagamento não recebido do ZumboPay.")
    }

    // ============================================================
    // SALVAR NO BD (reutilizando tabela payments)
    // ============================================================
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    // Resolver affiliate_code
    let finalAffiliateCode = affiliate_code || null
    let finalAffiliateId = affiliate_id || null

    if (!finalAffiliateCode && !finalAffiliateId) {
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('referred_by')
        .eq('id', user_id)
        .single()
      
      if (userProfile?.referred_by) {
        finalAffiliateCode = userProfile.referred_by
        console.log(`Affiliate code do perfil: ${finalAffiliateCode}`)

        const { data: affiliate } = await supabase
          .from('affiliates')
          .select('id')
          .eq('code', finalAffiliateCode)
          .eq('status', 'approved')
          .single()
        
        if (affiliate) {
          finalAffiliateId = affiliate.id
        }
      }
    }

    // Snapshot do CV se aplicável
    let cvVersion = null
    let snapshotData = null

    if (cv_id) {
      const { data: cv } = await supabase
        .from('saved_cvs')
        .select('current_version, cv_data, template_name')
        .eq('id', cv_id)
        .single()
        
      if (cv) {
        cvVersion = cv.current_version
        snapshotData = {
          cv_data: cv.cv_data,
          template_name: cv.template_name
        }
      }
    }

    // Inserir pagamento (reutilizando paysuite_id para guardar referência ZumboPay)
    const { error: dbError } = await supabase
      .from("payments")
      .insert({
        user_id,
        affiliate_code: finalAffiliateCode,
        affiliate_id: finalAffiliateId,
        paysuite_id: zumboReference,
        amount,
        reference: sourceId,
        plan_type,
        status: "pending",
        cv_id: cv_id || null,
        cv_version: cvVersion,
        snapshot_data: snapshotData
      })

    if (dbError) {
      console.error("Erro ao inserir pagamento no BD:", dbError)
      throw new Error("Erro ao registar pagamento. Tente novamente.")
    }

    console.log(`✅ Pagamento ZumboPay criado: ${sourceId} | Ref: ${zumboReference} | Checkout: ${checkoutUrl}`)

    return new Response(
      JSON.stringify({ 
        checkout_url: checkoutUrl,
        paysuite_id: zumboReference,
        reference: zumboReference
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    )

  } catch (error: any) {
    console.error("❌ Erro geral:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    )
  }
})
