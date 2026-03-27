

# Fix: CSRF Token Mismatch on PaySuite Checkout

## Problem

The "CSRF token mismatch" (HTTP 419) error occurs because PaySuite's checkout page is loaded inside an **iframe** in the PaymentModal. PaySuite uses CSRF cookies that cannot be set/read in a cross-origin iframe context (browsers block third-party cookies by default). This is a security restriction — not a bug in our code or API keys.

The screenshot confirms: the checkout page loads, but when the user clicks "Pagar com M-Pesa", PaySuite's server rejects the request because the CSRF cookie is missing.

## Solution

**Open the PaySuite checkout URL in a new browser tab** instead of embedding it in an iframe. This allows PaySuite's cookies to work normally.

### Changes to `src/components/payment/PaymentModal.tsx`

1. After receiving `checkout_url` from the edge function, call `window.open(checkoutUrl, '_blank')` instead of setting it for an iframe.
2. Show a "waiting for confirmation" UI in the modal (not an iframe) with the polling logic still active to detect when payment completes.
3. Remove the iframe-based checkout view entirely.

The updated flow:
- User selects plan → clicks Pay → edge function returns `checkout_url`
- `window.open()` opens PaySuite checkout in a new tab
- Modal shows a "waiting" state with a spinner and instructions
- Polling continues checking payment status every 3 seconds
- When paid, modal closes and shows success toast

### PWA Banner Warning

The `beforeinstallprompt` console message is a harmless browser warning about PWA install prompts — completely unrelated to payments. No action needed.

