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

## Run

```bash
cd app
cp .env.example .env
# Fill Firebase + optional Maps/Stripe keys
npm install --legacy-peer-deps
npx expo start
```

### Development build (maps, WebRTC, Stripe)

```bash
npx expo prebuild
npx expo run:ios
# or
npx expo run:android
```

Expo Go does **not** support WebRTC or all native map keys.

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
