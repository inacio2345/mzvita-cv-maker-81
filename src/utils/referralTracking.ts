
const COOKIE_NAME = 'mzvita_ref';
const STORAGE_KEY = 'mzvita_referral_code';
const COOKIE_DAYS = 60;

export function saveReferralCode(code: string): void {
  // Cookie
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(code)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;

  // localStorage backup
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch (_) {
    // localStorage indisponível
  }
}

export function getReferralCode(): string | null {
  // Priorizar cookie
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === COOKIE_NAME && value) {
      return decodeURIComponent(value);
    }
  }

  // Fallback: localStorage
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (_) {
    return null;
  }
}

export function clearReferralCode(): void {
  // Remover cookie
  document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;

  // Remover localStorage
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    // ignore
  }
}
