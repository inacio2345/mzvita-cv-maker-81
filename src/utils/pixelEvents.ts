
/**
 * Utilitário para disparar eventos do Facebook Pixel (FBQ)
 * ID do Pixel: 1182136163753052
 */

export const fbEvent = (eventName: string, options = {}) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, options);
  }
};

// Eventos Padrão pré-configurados
export const trackLead = () => fbEvent('Lead');
export const trackInitiateCheckout = () => fbEvent('InitiateCheckout');
export const trackPurchase = (value: number, currency: string = 'MZN') => {
  fbEvent('Purchase', { value, currency });
};

// Evento Customizado para o Blog ou Visualização de Modelos
export const trackViewContent = (category: string) => {
  fbEvent('ViewContent', { content_category: category });
};
