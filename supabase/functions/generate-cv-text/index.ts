import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, tone, fieldType, language = 'Português' } = await req.json()

    // Validate inputs
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'O texto base (prompt) é obrigatório.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiKey) {
      console.error('OPENAI_API_KEY is not set')
      return new Response(JSON.stringify({ error: 'Erro interno: Chave da OpenAI não configurada.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let systemInstruction = `Você é um especialista em Recursos Humanos e formatação de Currículos Profissionais. 
O seu objetivo é reescrever o rascunho do utilizador para que soe altamente profissional, claro, sem erros ortográficos e impactante.
O utilizador está a escrever para o idioma: ${language}.
Formatação: Não uses Markdown (negritos asteriscos, etc), responde apenas com o texto simples e limpo, pois será injetado num campo de formulário.
Tone solicitado: ${tone || 'Profissional e Objetivo'}.
Campo do CV a editar: ${fieldType || 'Geral'}.`

    if (fieldType === 'experience') {
      systemInstruction += `\nInstruções extra: Como se trata de uma descrição de experiência profissional, foca-te em destacar conquistas, uso de verbos de ação no passado ou presente (consoante aplicável) e estrutura lógica (podes usar bullet points usando hífens -).`
    } else if (fieldType === 'about') {
      systemInstruction += `\nInstruções extra: Como se trata de um Resumo Profissional (Perfil), escreve de forma coesa num parágrafo atraente (ou dois), destacando os pontos fortes e objetivos principais de carreira na terceira ou primeira pessoa (adapta ao rascunho original).`
    } else if (fieldType === 'skills') {
      systemInstruction += `\nInstruções extra: O utilizador vai listar habilidades. Transforma numa lista separada por vírgulas, corrigindo termos técnicos e agrupando logicamente, sem escrever introduções.`
    }

    // Prepare OpenAI Request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenAI API Error:', data)
      throw new Error(data.error?.message || 'Erro na API da OpenAI')
    }

    const generatedText = data.choices[0].message.content.trim()

    return new Response(JSON.stringify({ text: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in generate-cv-text:', error)
    return new Response(JSON.stringify({ error: error.message || 'Erro inesperado' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
