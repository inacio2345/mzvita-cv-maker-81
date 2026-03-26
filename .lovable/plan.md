

# Fix: Remover hifens da reference no create-paysuite-payment

## Alteração

No arquivo `supabase/functions/create-paysuite-payment/index.ts`, linha da reference:

**De:**
```typescript
const reference = `MZVT-${Date.now()}-${user_id.substring(0, 8)}`
```

**Para:**
```typescript
const reference = `MZVT${Date.now()}${user_id.replace(/-/g, '').substring(0, 8)}`
```

## Deploy

Redeploy da edge function `create-paysuite-payment` após a alteração.

