# Leta mobile app

Cross-platform **React Native + Expo** client for Leta’s three mobile roles:

| Role | Primary jobs |
|------|----------------|
| **Customer** | Request onsite IT, see estimates, track tickets |
| **Field technician** | Go Active, accept offers, run missions, escalate to overwatch |
| **Remote expert** | Join escalation queue, Leta Live sessions (WebRTC in a later sprint) |

Branding matches [`../brand/`](../brand/) and [`../website/`](../website/) — Leta blue `#2563eb`, logo assets in `assets/`.

## Stack (QuickTrash-inspired, Leta-scoped)

- **Expo SDK 54** · React **19** · React Native **0.81**
- **React Navigation 7** (native stack + bottom tabs)
- **Firebase JS SDK** (Auth, Firestore, Storage) when `.env` is configured
- **Demo mode** without Firebase — local session for UI/flow testing
- **Expo modules**: Location, Image Picker (wired in config for upcoming proof-of-work / maps)
- **Not in MVP yet**: Stripe, Crashlytics, partner web portal (browser), full offline sync

## Project layout

```
app/
  App.js                 # Entry providers
  src/
    navigation/          # Auth + role navigators
    screens/             # auth, customer, technician, remote
    contexts/            # AuthContext (role + session)
    config/              # env + Firebase bootstrap
    components/          # LetaButton, LetaCard, Screen, …
    theme/               # colors, typography (brand-aligned)
    services/mockData.js # demo tickets until Firestore
```

## Run locally

```bash
cd app
cp .env.example .env   # optional — leave empty for demo mode
npm install --legacy-peer-deps
npx expo start
```

- Press **`i`** / **`a`** for simulator, or scan QR with **Expo Go** (limited; dev client recommended for production features).
- For a **development build**: `npx expo run:ios` / `npx expo run:android` (requires Xcode/Android SDK).

## Firebase setup

1. Create a Firebase project.
2. Enable **Authentication** (email/password) and **Firestore**.
3. Copy web app config into `.env` using keys from `.env.example`.
4. Restart Metro (`npx expo start -c`).

Role is stored locally with the session until custom claims / profile documents exist in Firestore.

## Workflow (recommended build order)

1. **Auth + roles** — done in this MVP.
2. **Firestore** — `users`, `tickets`, `offers`, `escalations` collections per [`../02-app-documentation/system-architecture.md`](../02-app-documentation/system-architecture.md).
3. **Maps** — `expo-location` + Maps API key in `app.json` for tracking and dispatch radius.
4. **Payments** — Stripe + Cloud Functions (see business plan monetization doc).
5. **Leta Live** — WebRTC for remote expert sessions.
6. **Partner channel** — primarily web; mobile stays customer + field + remote.

## Related docs

- [`../02-app-documentation/`](../02-app-documentation/)
- [`../05-marketing-and-sales/partner-channel-win-win.md`](../05-marketing-and-sales/partner-channel-win-win.md)
