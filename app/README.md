# Leta mobile app

React Native + Expo client for **customers**, **field technicians**, and **remote experts**.

## Features (implemented)

| Area | Implementation |
|------|----------------|
| **Firestore** | `users`, `tickets`, `offers`, `escalations`, `live_sessions` + `signals` — see [`../docs/FIRESTORE_SCHEMA.md`](../docs/FIRESTORE_SCHEMA.md) |
| **Auth** | Email/password + profile doc + **custom claims** via `syncUserRoleClaims` |
| **Maps** | `react-native-maps` + `expo-location` · `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` in `app.config.js` |
| **Storage** | Proof photos + PNG signatures → Firebase Storage |
| **Stripe** | `@stripe/stripe-react-native` + `createPaymentIntent` callable |
| **Leta Live** | WebRTC (`react-native-webrtc`) + Firestore signaling — **requires dev build** |

## Run on iPhone

**Expo Go does not work** (WebRTC, Stripe, dev client). Use a development build:

```bash
cd app
npm install --legacy-peer-deps
npm run ios:device    # USB + trust + Developer Mode on iPhone
npm run start:dev     # then reload the app on the phone
```

Full steps (signing, tunnel, EAS cloud build): **[TEST_ON_IPHONE.md](./TEST_ON_IPHONE.md)**

## Run (simulator / after dev client installed)

```bash
cp .env.example .env   # optional — demo mode works without Firebase
npm install --legacy-peer-deps
npm run start:dev      # not plain `expo start` after a dev build
```

## Environment

| Variable | Required for |
|----------|----------------|
| `EXPO_PUBLIC_FIREBASE_*` | Live data (omit for demo mode) |
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` | Android Google Maps |
| `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Card payments |

Backend Stripe secret: `functions/.env` → deploy Cloud Functions.

## Project layout

```
src/
  config/       firebase, env
  contexts/     AuthContext
  firebase/     collection constants
  services/     users, tickets, offers, storage, payments, liveSession, location
  hooks/        useWebRTC
  components/   LetaMap, SignaturePad, LiveVideo
  navigation/
  screens/
```
