# Relatório Técnico de Auditoria SEO & Google Search Console - MozVita CV

**Data do Relatório**: 31 de Agosto de 2026  
**Domínio**: `https://www.mozvita.online`  
**Plataforma**: MozVita CV Maker (`mzvita-cv-maker-81`)  
**Origem dos Dados**: Exportação Oficial do Google Search Console (`https___www.mozvita.online_-Coverage-2026-08-31.zip`)

---

## 1. Resumo Executivo & Desempenho de Tráfego

Com base na análise dos dados históricos do Google Search Console (Junho a Agosto de 2026):

- **Páginas Indexadas no Google**: **16 páginas** (crescimento de 11 para 16 páginas indexadas).
- **Páginas Não Indexadas**: **6 páginas**.
- **Volume Diário de Impressões**:
  - Média diária: **30 a 55 impressões**.
  - Picos de tráfego orgânico: **109 impressões** em 16/06/2026 e **80 impressões** em 21/08/2026.
- **Conclusão Principal**: O Google já está a reconhecer a autoridade do MozVita para pesquisas de currículos em Moçambique, mas cerca de 27% do universo de URLs da plataforma estava bloqueado ou omitido dos rastreios do Googlebot por falhas de configuração do sitemap e meta tags.

---

## 2. Diagnóstico Detalhado dos Problemas de Cobertura

### A. Categoria: "Rastreada – atualmente não indexada" (5 Páginas)

**Causa Raiz Identificada**:
1. **Página Privada Protegida no Sitemap (`/criar-cv`)**:
   - O arquivo `sitemap.xml` anterior continha a rota `https://www.mozvita.online/criar-cv`.
   - Como essa rota é protegida pelo `AuthGuard` do React Router, quando o robô do Google (Googlebot) tentou rastreá-la, foi redirecionado para a página de autenticação (`/auth`) ou se deparou com um estado de carregamento sem conteúdo indexável.
   - O Googlebot marcou a URL como "Rastreada – atualmente não indexada" para economizar orçamento de rastreio (*crawl budget*).
2. **Páginas Públicas Importantes Faltando no Sitemap**:
   - Várias rotas institucionais e comerciais cruciais para o tráfego do MozVita não estavam presentes no `sitemap.xml`:
     - `/como-funciona`
     - `/contato`
     - `/sobre-nos`
     - `/meu-emprego`
     - `/afiliado`
     - `/cv-mocambique`
     - `/modelo-cv-mocambique`
     - `/cv-mocambique-pdf`
     - `/cv-em-ingles-mocambique`
     - 14 rotas de artigos de blog dedicados.

### B. Categoria: "Página alternativa com etiqueta canónica correta" (1 Página)

**Causa Raiz Identificada**:
1. O componente `SEO.tsx` não estava a injetar a tag `<link rel="canonical" href="...">` a menos que a propriedade `canonical` fosse fornecida manualmente de forma explícita.
2. Haviam meta tags `og:description`, `og:url` e `twitter:description` duplicadas duas vezes no código HTML renderizado.
3. O Googlebot identificava URLs alternativas (como variantes com/sem barra no final ou parâmetros de URL) e selecionava a canónica correta por conta própria.

---

## 3. Ações de Correção Executadas no Código

### 🛠️ Ação 1: Correção do Componente Global `SEO.tsx`
- **Arquivo Modificado**: `src/components/SEO.tsx`
- **Melhorias Aplicadas**:
  - Removidas todas as meta tags OpenGraph e Twitter duplicadas.
  - Implementada a resolução automática de URL canónica (`pageUrl` é derivado automaticamente do `window.location.pathname` se a prop `canonical` for omitida).
  - Suporte expandido a múltiplos objetos JSON-LD no mesmo script de Dados Estruturados.

### 🛠️ Ação 2: Reestruturação Completa do `sitemap.xml`
- **Arquivo Modificado**: `public/sitemap.xml`
- **Melhorias Aplicadas**:
  - **REMOVIDA**: A rota privada `/criar-cv`.
  - **ADICIONADAS**: Mais de 25 URLs públicas de altíssima relevância SEO, incluindo:
    - Páginas Institucionais (`/como-funciona`, `/sobre-nos`, `/contato`, `/meu-emprego`, `/afiliado`).
    - Landing Pages SEO (`/cv-mocambique`, `/modelo-cv-mocambique`, `/cv-mocambique-pdf`, `/cv-em-ingles-mocambique`).
    - Todas as rotas de profissões (`/modelo-cv/engenheiro-civil`, `/modelo-cv/bancario`, etc.).
    - Todos os 38 artigos de blog (legados + dinâmicos).
  - Atualizadas todas as datas de modificação `<lastmod>` para `2026-08-31`.

### 🛠️ Ação 3: Implementação de Dados Estruturados Rich Snippets (Schema.org)
- **Arquivos Modificados**: `src/pages/Index.tsx` e `src/components/blog/BlogPost.tsx`.
- **Esquemas Adicionados**:
  1. `Organization`: Define a identidade oficial do MozVita para o Google Knowledge Graph.
  2. `WebApplication`: Apresenta o MozVita como uma aplicação web de criação de CVs com preço de 50 MZN.
  3. `FAQPage`: Injeta as perguntas mais frequentes diretamente na página de resultados do Google (SERP), aumentando a taxa de clique (CTR).
  4. `BreadcrumbList`: Garante uma navegação limpa (Home > Blog > Categoria > Artigo) no Google.
  5. `BlogPosting`: Atribui autor, data de publicação e imagens destacadas para o Google News e Discover.

---

## 4. Próximos Passos Recomendados para o Google Search Console

1. **Acessar o Painel do Google Search Console**:
   - Abrir `https://search.google.com/search-console` para a propriedade `https://www.mozvita.online`.
2. **Reenviar o Sitemap**:
   - Ir à secção **Sitemaps** no menu lateral.
   - Enviar a URL: `https://www.mozvita.online/sitemap.xml`.
3. **Solicitar Validação de Correção**:
   - Ir à secção **Páginas** / **Indexação de Páginas**.
   - Clicar nos relatórios de "Rastreada – atualmente não indexada" e clicar em **"Validar Correção"**.
4. **Inspeção de URL**:
   - Inserir as URLs principais (`https://www.mozvita.online/cv-mocambique` e `https://www.mozvita.online/blog`) na barra de busca superior do Console e clicar em **"Solicitar Indexação"**.

---
*Relatório gerado automaticamente após execução das otimizações SEO no projeto MozVita.*
