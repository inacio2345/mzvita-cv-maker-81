
// Utilitário para gerenciar códigos de anúncio do Ads Terra
export interface AdConfig {
  id: string;
  type: 'header' | 'footer' | 'blog-inline' | 'blog-end';
  scriptCode: string;
  isActive: boolean;
}

// Configurações dos anúncios - você pode modificar aqui quando receber os códigos do Ads Terra
export const adConfigs: AdConfig[] = [
  {
    id: 'header-ad',
    type: 'header',
    scriptCode: '', // Inserir código do Ads Terra aqui
    isActive: false
  },
  {
    id: 'footer-ad',
    type: 'footer',
    scriptCode: '', // Inserir código do Ads Terra aqui
    isActive: false
  },
  {
    id: 'blog-inline-ad',
    type: 'blog-inline',
    scriptCode: '', // Inserir código do Ads Terra aqui
    isActive: false
  },
  {
    id: 'blog-end-ad',
    type: 'blog-end',
    scriptCode: '', // Inserir código do Ads Terra aqui
    isActive: false
  }
];

export const getAdConfig = (id: string): AdConfig | undefined => {
  return adConfigs.find(config => config.id === id);
};

export const updateAdConfig = (id: string, scriptCode: string, isActive: boolean = true) => {
  const configIndex = adConfigs.findIndex(config => config.id === id);
  if (configIndex !== -1) {
    adConfigs[configIndex].scriptCode = scriptCode;
    adConfigs[configIndex].isActive = isActive;
  }
};

// Exemplo de como usar quando receber os códigos:
/*
updateAdConfig('header-ad', `
<script type="text/javascript" src="https://example.adsterra.com/header-banner.js"></script>
<div id="adsterra-header"></div>
`);
*/
