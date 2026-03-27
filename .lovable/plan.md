

# Fix Payment System: Create Missing Database Tables and Columns

## Problem

The payment flow fails with a 400 error because:
1. The `payments` table does not exist in the database — the edge function log confirms: *"Could not find the table 'public.payments'"*
2. The `user_profiles` table is missing subscription-related columns (`plan_type`, `cv_limit`, `cv_used`, `subscription_expires_at`, `is_premium`)

The PaySuite API call itself likely succeeds, but the edge function crashes when trying to insert the payment record into a non-existent table, returning a 400 to the frontend.

## Plan

### Step 1 — Create the `payments` table

Database migration to create:

```sql
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  paysuite_id TEXT,
  amount NUMERIC(10,2) NOT NULL,
  reference TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Users can view their own payments
CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Only service role (edge functions) inserts/updates payments
-- No insert/update policy for authenticated users needed
```

### Step 2 — Add subscription columns to `user_profiles`

```sql
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS plan_type TEXT DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS cv_limit INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cv_used INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
```

### Step 3 — Update CORS headers on the edge function

The current CORS headers are missing some headers that the Supabase JS client sends. Update `create-paysuite-payment/index.ts` to include the full set and redeploy:

```
'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version'
```

### Step 4 — Redeploy edge functions

Redeploy both `create-paysuite-payment` and `paysuite-webhook` to pick up any cached changes.

---

## Technical Details

- The `payments` table uses RLS with a SELECT policy for authenticated users. Inserts are done via the service role key in edge functions, which bypasses RLS.
- The `user_profiles` columns match what the webhook handler expects when activating plans (`plan_type`, `cv_limit`, `is_premium`, `subscription_expires_at`).
- The `amount` field sent to PaySuite as `amount.toFixed(2)` produces a string like `"25.00"` — this matches the PaySuite docs which show `"amount": "100.50"` as a string.
- The PWA `beforeinstallprompt` console warning is unrelated to payments and harmless.

