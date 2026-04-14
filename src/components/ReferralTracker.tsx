
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { saveReferralCode, getReferralCode } from '@/utils/referralTracking';
import { supabase } from '@/lib/supabase';

/**
 * Componente invisível que captura o parâmetro ?ref= da URL,
 * guarda em cookie/localStorage, e regista o clique no servidor.
 */
const ReferralTracker = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (!refCode) return;

    // Só gravar se não existir referral anterior (first-touch)
    const existingRef = getReferralCode();
    if (!existingRef) {
      saveReferralCode(refCode);

      // Registar clique no servidor (fire-and-forget)
      supabase.functions.invoke('register-referral-click', {
        body: {
          affiliate_code: refCode,
          user_agent: navigator.userAgent
        }
      }).catch(() => {
        // Falha silenciosa — não bloquear UX
      });
    }

    // Limpar ?ref= da URL sem reload
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('ref');
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return null;
};

export default ReferralTracker;
