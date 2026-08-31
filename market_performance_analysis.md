# Análise Estratégica de Métricas de Desempenho & Tendências - MozVita CV

**Data de Análise**: 31 de Agosto de 2026  
**Fonte dos Dados**: 5 Relatórios Oficiais de Desempenho do Google Search Console + Screenshots do Painel de Estatísticas.  
**Caminho dos Arquivos**: `D:\Projetos de websites\mozvita\mzvita-cv-maker-81` (`gsc_perf_0` a `gsc_perf_4`)

---

## 1. Visão Geral Comparativa das Métricas (Multi-Períodos)

| Período Analisado | Cliques | Impressões | CTR Médio | Posição Média | Dispositivo Dominante | País Líder |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Últimas 24 Horas** (`gsc_perf_0`) | **2** | **44** | 4.55% | 7.23 | Telemóvel (100%) | Moçambique |
| **Últimos 7 Dias** (`gsc_perf_1`) | **15** | **508** | 2.95% | 7.17 | Telemóvel (96%) | Moçambique |
| **Últimos 28 Dias** (`gsc_perf_2`) | **36 - 40** | **1.199 - 1.380** | 3.00% | 7.43 | Telemóvel (90%) | Moçambique (95%) |
| **Últimos 3 Meses** (`gsc_perf_3`) | **103** | **3.383** | 3.04% | 7.39 | Telemóvel (86%) | Moçambique |
| **Últimos 12 Meses (1 Ano)** (`gsc_perf_4`) | **249** | **6.811** | 3.66% | 7.43 | Telemóvel (81%) | Moçambique |

---

## 2. Palavras-Chave de Maior Impacto e Oportunidades de Otimização

### 🏆 A. Termos Campeões em Conversão (Melhores CTRs)
1. **`cv moz`**:
   - **CTR**: **10.0%** (7 cliques em 70 impressões no trimestre).
   - **Posição**: **#3.5** no Google.
   - **Diagnóstico**: É uma busca de intenção de marca/direta com altíssimo valor comercial.
2. **`cv profissional moçambique`**:
   - **CTR**: **6.67%** (5 cliques em 75 impressões).
   - **Posição**: **#4.0 a #5.7**.
   - **Diagnóstico**: Usuários procurando um resultado maduro e elegante.

### ⚠️ B. "Mina de Ouro" Não Explorada (Alto Volume de Impressões, Baixo CTR)
As pesquisas com a intenção explícita de **baixar em PDF no celular** acumulam a maioria das impressões do site, porém têm CTR baixo (entre 1.2% e 2.5%):
- **`curriculum vitae moçambique`**: 577 impressões no ano (1.39% CTR).
- **`baixar curriculum vitae pdf moçambique`**: 129 impressões (3.10% CTR).
- **`curriculum vitae moçambique pdf 2026`**: 158 impressões (1.27% CTR).
- **`curriculum vitae moçambique pdf download`**: 91 impressões (2.20% CTR).

**Por que a taxa de clique (CTR) nesses termos era baixa?**
Os usuários que pesquisam "baixar pdf" no celular querem garantia instantânea de que o site funciona direto no telefone sem complicação. Ajustamos a landing page `/cv-mocambique-pdf` e a Home para exibir títulos com gatilhos de download imediato em 2 minutos via M-Pesa.

---

## 3. Análise das Tendências de Conteúdo (Com Base nos Screenshots)

### 📈 Conteúdos em Ascensão (Tendência Positiva)
1. **Página Inicial (`/`)**: +29% de crescimento (+8 cliques novos no mês).
2. **`Os 5 Melhores Sites para Achar o Primeiro Emprego em Moçambique`** (`/blog/sites-emprego-mocambique`): +3 cliques.
3. **`O Futuro do Trabalho Remoto em Moçambique`** (`/blog/futuro-trabalho-remoto`): +1 clique.

### 📉 Conteúdo em Queda (Atenção!)
- **`Como criar um CV profissional em Moçambique`** (`/blog/cv-profissional-mocambique`): Queda de 100% (-1 clique).
- **Causa Raiz**: **Canibalização de Palavras-Chave**. O artigo no blog estava disputando a palavra `cv profissional moçambique` contra a própria página inicial (`/`).
- **Solução**: Garantimos a canonicalização adequada e direcionamento interno com links para a Home.

---

## 4. Onde Estamos a Falhar e Errar (E o Plano de Melhorias Executado)

1. **Falha #1: Dependência Quase Total da Página Inicial**
   - **Problema**: 99% das impressões no Google vinham apenas da rota `/`. As rotas internas de modelos e artigos do blog tinham pouca tração orgânica.
   - **Ação Tomada**: Criamos uma estrutura de **Links Internos (Internal Linking)** no Footer do site, ligando todas as páginas a 7 modelos de profissões (`/modelo-cv/bancario`, `/modelo-cv/engenheiro-civil`, etc.) e landing pages SEO.

2. **Falha #2: Ausência de Rich Snippets / Perguntas Frequentes no Google**
   - **Problema**: O Google exibia apenas título e descrição genéricos, perdendo espaço visual nos resultados.
   - **Ação Tomada**: Injetamos **Dados Estruturados JSON-LD (`FAQPage`, `WebApplication`, `Organization`, `BreadcrumbList`)** no React Helmet. Agora o Google exibirá sanfonas de perguntas frequentes e preços diretamente nos resultados da busca.

3. **Falha #3: Desfasamento do Sitemap**
   - **Problema**: O sitemap continha rotas privadas (`/criar-cv`) e ignorava 25+ páginas públicas.
   - **Ação Tomada**: Sitemap 100% reestruturado e limpo, já pronto para reenvio no Google Search Console.

---

## 5. Próxima Etapa do Plano de Crescimento (Metas de Tráfego)

- **Meta de Cliques (Próximos 28 dias)**: Subir de 40 para **100+ cliques mensais** no Google Search Console (desbloqueando a conquista de 50 e 100 cliques).
- **Estratégia de Conteúdo Futura**:
  1. Publicar modelos de cartas de candidatura em PDF (Carta de Apresentação, Pedido de Estágio).
  2. Criar artigos focados nas províncias (Maputo, Beira, Nampula, Tete e Cabo Delgado).
