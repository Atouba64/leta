# Run Leta in Expo Go (iPhone)

## 1. Install dependencies (once)

```bash
cd ~/Documents/Projects/GitHub/leta
npm run install:app
```

## 2. Start the dev server

```bash
npm start
```

Do **not** run `npx expo` from the repo root. Do **not** use `--dev-client` for Expo Go.

## 3. Open on iPhone

1. Install **Expo Go** from the App Store.
2. Same Wi‑Fi as your Mac (or press `s` in the terminal → switch to **tunnel**).
3. Scan the **QR code** in the terminal with the iPhone **Camera** app (opens Expo Go).

## What works in Expo Go

- All three roles (customer, field tech, remote expert)
- Demo mode (no Firebase `.env` required)
- Maps, location, navigation, tickets (mock or Firebase)

## What needs a dev build later

- Real Stripe card UI
- Leta Live WebRTC video
- Full production maps keys on Android

```bash
npm run start:dev    # after: cd app && npm run ios:device
```
