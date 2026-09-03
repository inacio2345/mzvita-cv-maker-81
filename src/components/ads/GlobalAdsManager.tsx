import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Advertisement } from '@/types/ads';

/**
 * GlobalAdsManager: Gerenciador de Anúncios Globais (Popunder, Social Bar, In-Page Push do Adsterra).
 * Conforme exigido pelo Adsterra, os scripts globais devem ser executados na janela principal (window.top)
 * para ativar Popunders e o Social Bar flutuante tanto em Desktop quanto em Telemóveis.
 */
export const GlobalAdsManager: React.FC = () => {
  useEffect(() => {
    let isMounted = true;

    const loadGlobalAds = async () => {
      try {
        const { data, error } = await supabase
          .from('advertisements')
          .select('*')
          .in('slot_name', ['global_social_bar', 'global_popunder', 'global_script'])
          .eq('is_active', true);

        if (error || !data || !isMounted) return;

        const isMobile = window.innerWidth <= 768;

        data.forEach((ad: Advertisement) => {
          // Escolher conteúdo adequado ao dispositivo (Desktop vs Mobile)
          let content = isMobile ? ad.mobile_content : ad.desktop_content;
          if (!content || content.trim() === '') {
            content = isMobile ? ad.desktop_content : ad.mobile_content;
          }

          if (!content || content.trim() === '') return;

          const scriptId = `global-adsterra-script-${ad.id}`;
          if (document.getElementById(scriptId)) return;

          // Extrair URLs e código inline
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = content;

          const scriptTags = tempDiv.querySelectorAll('script');

          if (scriptTags.length > 0) {
            scriptTags.forEach((oldScript, index) => {
              const newScript = document.createElement('script');
              newScript.id = `${scriptId}-${index}`;
              newScript.type = oldScript.type || 'text/javascript';

              // Copiar todos os atributos (src, data-*, async, cfasync)
              Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
              });

              if (oldScript.src) {
                newScript.src = oldScript.src;
                newScript.async = true;
              } else {
                newScript.text = oldScript.text;
              }

              document.body.appendChild(newScript);
            });
          } else if (content.trim().startsWith('http://') || content.trim().startsWith('https://') || content.trim().startsWith('//')) {
            // Se o utilizador apenas colou a URL do script
            const scriptTag = document.createElement('script');
            scriptTag.id = scriptId;
            scriptTag.type = 'text/javascript';
            scriptTag.src = content.trim();
            scriptTag.async = true;
            document.body.appendChild(scriptTag);
          }
        });
      } catch (err) {
        console.error('Erro ao ativar anúncios globais do Adsterra:', err);
      }
    };

    loadGlobalAds();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
};

export default GlobalAdsManager;
