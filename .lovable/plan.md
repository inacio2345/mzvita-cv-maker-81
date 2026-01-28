

# Plano de Implementacao: Modo Avancado (Edicao por Blocos)

## Resumo Executivo

Este plano adiciona um **Modo Avancado** ao gerador de CV do MozVita.online, permitindo que usuarios reordenem secoes, ocultem/mostrem partes do CV, e editem texto inline - tudo mantendo o **Modo Simples** atual intacto.

---

## Arquitetura Atual (Analise)

```text
+------------------+     +----------------+     +-------------------+
|    CreateCV.tsx  | --> |  Preview.tsx   | --> | DownloadOptions   |
|  (Wizard Forms)  |     |  (Visualizar)  |     | (PDF/PNG/JPG)     |
+------------------+     +----------------+     +-------------------+
        |                       |
        v                       v
+------------------+     +-------------------+
|   useCVData.tsx  |     | CVLayoutRenderer  |
|   (Hook Estado)  |     | (10 Templates)    |
+------------------+     +-------------------+
```

**Dados Atuais (CVData):**
- `personalData`: nome, email, telefone, endereco, foto
- `about`: string
- `education[]`: array de formacoes
- `experience[]`: array de experiencias
- `skills`: { technical[], languages[] }
- `references[]`: array de referencias
- `colorPalette`: cores do template

---

## Nova Arquitetura Proposta

```text
+------------------+     +------------------+     +-------------------+
|    CreateCV.tsx  | --> |  Preview.tsx     | --> | DownloadOptions   |
|  (Wizard Forms)  |     |  + Advanced Mode |     | (PDF/PNG/JPG)     |
+------------------+     +------------------+     +-------------------+
        |                       |
        v                       v
+------------------+     +------------------------+
|   useCVData.tsx  |     |  CVUnifiedRenderer.tsx |
| + useLayoutConfig|     |  (Respeita layoutConfig)|
+------------------+     +------------------------+
        |
        v
+------------------+
| Persistencia:    |
| - saved_cvs.cv_data (inclui layoutConfig)
| - localStorage (backup)
+------------------+
```

---

## Fase 1: Schema Normalizado e Layout Config

### 1.1 Estender CVData Schema

**Arquivo:** `src/services/cvService.ts`

```typescript
export interface LayoutConfig {
  sectionsOrder: string[];
  hiddenSections: string[];
  itemOrder: {
    experience: string[];
    education: string[];
  };
}

export interface CVData {
  // ... campos existentes ...
  layoutConfig?: LayoutConfig;
}

export const getDefaultLayoutConfig = (): LayoutConfig => ({
  sectionsOrder: ['header', 'about', 'experience', 'education', 'skills', 'languages', 'references'],
  hiddenSections: [],
  itemOrder: {
    experience: [],
    education: []
  }
});
```

### 1.2 Atualizar useCVData Hook

**Arquivo:** `src/hooks/useCVData.tsx`

- Adicionar `layoutConfig` ao estado
- Criar funcoes: `updateLayoutConfig()`, `reorderSections()`, `toggleSectionVisibility()`, `reorderItems()`
- Auto-salvar em localStorage a cada alteracao

---

## Fase 2: Persistencia no Backend

### 2.1 Atualizar Estrutura de Dados

O `cv_data` (JSONB) ja suporta campos adicionais. O `layoutConfig` sera salvo junto com os dados do CV:

```typescript
// Em secureDbService.ts - updateCVSecurely
const cvDataWithLayout = {
  ...cvData,
  layoutConfig: layoutConfig
};
```

### 2.2 Backup em localStorage

**Arquivo Novo:** `src/hooks/useLayoutPersistence.tsx`

```typescript
// Auto-save para localStorage a cada 2 segundos (debounced)
// Restaurar ao carregar CV existente
// Sincronizar com banco quando usuario salva
```

---

## Fase 3: Biblioteca de Drag-and-Drop

### 3.1 Instalar dnd-kit

```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2"
  }
}
```

### 3.2 Componentes Sortable

**Arquivos Novos:**
- `src/components/cv/SortableSection.tsx` - Container draggable para secoes
- `src/components/cv/SortableItem.tsx` - Item draggable (experiencia/educacao)
- `src/components/cv/SectionControls.tsx` - Botoes ocultar/mostrar

---

## Fase 4: Componente de Modo Avancado

### 4.1 Estrutura do Editor

**Arquivo Novo:** `src/components/cv/AdvancedCVEditor.tsx`

```text
+-----------------------------------------------+
|  [Modo Simples] [Modo Avancado]   Toggle      |
+-----------------------------------------------+
|                                               |
|  +------------------------------------------+ |
|  | [drag] CABECALHO          [👁] [✏️]     | |
|  +------------------------------------------+ |
|  | [drag] PERFIL             [👁] [✏️]     | |
|  |   (inline editable text area)            | |
|  +------------------------------------------+ |
|  | [drag] EXPERIENCIA        [👁]           | |
|  |   [drag] Cargo 1          [✏️] [🗑]     | |
|  |   [drag] Cargo 2          [✏️] [🗑]     | |
|  +------------------------------------------+ |
|  | [drag] FORMACAO           [👁]           | |
|  |   [drag] Curso 1          [✏️] [🗑]     | |
|  +------------------------------------------+ |
|  | [drag] HABILIDADES        [👁]           | |
|  +------------------------------------------+ |
|  | [drag] IDIOMAS            [👁]           | |
|  +------------------------------------------+ |
|  | [drag] REFERENCIAS        [👁]           | |
|  +------------------------------------------+ |
|                                               |
+-----------------------------------------------+
```

### 4.2 Funcionalidades

1. **Reordenar Secoes**: Drag-and-drop das secoes principais
2. **Ocultar/Mostrar**: Icone de olho para toggle de visibilidade
3. **Reordenar Itens**: Dentro de Experiencia e Educacao
4. **Edicao Inline**: Clicar em texto para editar diretamente
5. **Auto-save**: Salvar alteracoes automaticamente

---

## Fase 5: Renderer Unificado

### 5.1 Atualizar CVLayoutRenderer

**Arquivo:** `src/components/cv/CVLayoutRenderer.tsx`

```typescript
interface CVLayoutRendererProps {
  data: CVData;
  template: CVTemplate;
  layoutConfig?: LayoutConfig;  // NOVO
  isAdvancedMode?: boolean;     // NOVO
  onDataChange?: (data: CVData) => void;  // NOVO
}
```

**Logica:**
- Ordenar secoes conforme `layoutConfig.sectionsOrder`
- Ocultar secoes em `layoutConfig.hiddenSections`
- Ordenar itens conforme `layoutConfig.itemOrder`
- Se `isAdvancedMode`, adicionar handles de drag e controles

### 5.2 Secoes Dinamicas

```typescript
const renderSections = () => {
  const orderedSections = layoutConfig?.sectionsOrder || defaultOrder;
  const hidden = layoutConfig?.hiddenSections || [];
  
  return orderedSections
    .filter(section => !hidden.includes(section))
    .map(section => renderSection(section));
};
```

---

## Fase 6: Integracao com Preview.tsx

### 6.1 Toggle de Modo

**Arquivo:** `src/pages/Preview.tsx`

```typescript
const [editorMode, setEditorMode] = useState<'simple' | 'advanced'>('simple');
const [layoutConfig, setLayoutConfig] = useState(getDefaultLayoutConfig());
```

### 6.2 UI do Toggle

```text
+------------------------------------------+
| [📋 Modo Simples]  [🧱 Modo Avancado]    |
+------------------------------------------+
```

- **Modo Simples**: Voltar para CreateCV (formularios)
- **Modo Avancado**: Ativar edicao por blocos no preview

---

## Fase 7: Edicao Inline

### 7.1 Componente Editavel

**Arquivo Novo:** `src/components/cv/InlineEdit.tsx`

```typescript
interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
}

// Exibe texto normal
// Ao clicar, transforma em input/textarea
// Ao sair ou Enter, salva automaticamente
```

### 7.2 Campos Editaveis

- Resumo/Perfil (textarea)
- Descricoes de experiencia (textarea)
- Titulos e nomes (input)

---

## Fase 8: Estilos A4 e Impressao

### 8.1 CSS para Quebra de Pagina

**Arquivo:** `src/index.css` (adicionar)

```css
@media print {
  @page {
    size: A4;
    margin: 15mm;
  }
  
  .cv-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  .cv-item {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

### 8.2 Preview A4 Responsivo

- Container com aspect ratio A4 (1:1.414)
- Zoom adaptativo para telas menores
- Indicador de limite de pagina

---

## Fase 9: Arquivos a Criar/Modificar

### Novos Arquivos

| Arquivo | Descricao |
|---------|-----------|
| `src/components/cv/AdvancedCVEditor.tsx` | Editor principal do modo avancado |
| `src/components/cv/SortableSection.tsx` | Wrapper draggable para secoes |
| `src/components/cv/SortableItem.tsx` | Wrapper draggable para itens |
| `src/components/cv/SectionControls.tsx` | Controles de visibilidade |
| `src/components/cv/InlineEdit.tsx` | Componente de edicao inline |
| `src/hooks/useLayoutPersistence.tsx` | Persistencia em localStorage |

### Arquivos a Modificar

| Arquivo | Alteracoes |
|---------|-----------|
| `src/services/cvService.ts` | Adicionar LayoutConfig interface |
| `src/hooks/useCVData.tsx` | Adicionar layoutConfig ao estado |
| `src/components/cv/CVLayoutRenderer.tsx` | Suportar layoutConfig e modo avancado |
| `src/pages/Preview.tsx` | Adicionar toggle de modo |
| `src/services/secureDbService.ts` | Salvar layoutConfig junto com CV |
| `package.json` | Adicionar @dnd-kit |
| `src/index.css` | Adicionar estilos A4/print |

---

## Fase 10: Fluxo do Usuario

### Fluxo Modo Simples (Existente)

```text
Inicio -> Escolher Template -> Preencher Formularios -> Preview -> Download
```

### Fluxo Modo Avancado (Novo)

```text
Preview -> Ativar Modo Avancado -> Reordenar/Ocultar/Editar -> Auto-Save -> Download
```

---

## Testes Necessarios

1. **Integridade dos Templates**: Confirmar que todos os 10 templates renderizam corretamente com layoutConfig
2. **Persistencia**: Salvar CV, recarregar, verificar que layoutConfig persiste
3. **Drag-and-Drop**: Testar reordenacao de secoes e itens
4. **Edicao Inline**: Testar edicao de texto e auto-save
5. **PDF**: Verificar que PDF respeita layoutConfig
6. **Mobile**: Testar responsividade do editor
7. **localStorage**: Verificar backup e restauracao

---

## Secao Tecnica

### Dependencias Novas

```json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2"
}
```

### Estrutura de layoutConfig (Exemplo)

```json
{
  "sectionsOrder": ["header", "about", "skills", "experience", "education", "references"],
  "hiddenSections": ["references"],
  "itemOrder": {
    "experience": ["exp-2", "exp-1", "exp-3"],
    "education": ["edu-1", "edu-2"]
  }
}
```

### Logica de Merge

Quando usuario edita layoutConfig:
1. Atualizar estado local
2. Debounce 2s -> salvar em localStorage
3. Ao clicar "Salvar CV" -> salvar no banco com layoutConfig

---

## Estimativa de Implementacao

| Fase | Tempo Estimado |
|------|----------------|
| Schema e Hook | 30 min |
| Persistencia | 20 min |
| dnd-kit Setup | 30 min |
| AdvancedCVEditor | 60 min |
| CVLayoutRenderer Update | 45 min |
| Preview.tsx Integration | 30 min |
| InlineEdit | 30 min |
| CSS A4/Print | 15 min |
| Testes | 30 min |
| **Total** | **~5 horas** |

