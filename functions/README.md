# Leta Cloud Functions

Node 20 · region `us-east1`

## Callable functions

| Function | Purpose |
|----------|---------|
| `syncUserRoleClaims` | Firestore trigger — mirrors `users.role` to Auth custom claims |
| `createPaymentIntent` | Stripe PaymentIntent for customer checkout |
| `acceptOffer` | Field tech accepts offer → assigns ticket |
| `createLiveSession` | Start Leta Live escalation + signaling room |
| `joinLiveSession` | Remote expert joins session |
| `openclawOpsDigest` | Optional admin draft via local OpenClaw (`OPENCLAW_OPS_ENABLED`) |

## HTTP

| Endpoint | Purpose |
|----------|---------|
| `api` | Express health check |
| `stripeWebhook` | Stripe `payment_intent.succeeded` → update ticket |

## Setup

```bash
cd functions
cp .env.example .env
# Set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
# Optional: OPENCLAW_* (see ../openclaw/README.md) — default off for $0 API use
npm install
firebase deploy --only functions,firestore:rules,firestore:indexes,storage
```

Set secrets for production:

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
```

## Local emulator

```bash
firebase emulators:start --only functions,firestore
```
