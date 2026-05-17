# Test Leta on your iPhone

Leta uses native modules (maps, Stripe, WebRTC). **Expo Go will not work.** Use a **development build** once, then reload from your Mac over Wi‑Fi or tunnel.

## Before you start

1. **Connect your iPhone** to your Mac with USB (or stay on the same Wi‑Fi for later reloads).
2. On the iPhone: **Trust this computer**, unlock the phone, and enable **Developer Mode**  
   Settings → Privacy & Security → Developer Mode → On (restart if asked).
3. On the Mac: open **Xcode** once and sign in with your Apple ID  
   Xcode → Settings → Accounts → add Apple ID (free account is enough for personal testing).

## Option A — Install directly from your Mac (fastest)

```bash
cd app
npm install --legacy-peer-deps
npm run ios:device
```

- Pick **your iPhone** when prompted (not a simulator).
- First run may ask to register the device and fix signing; allow Xcode/Expo to use automatic signing.
- When the build finishes, the **Leta** app opens on the phone.

Start the dev server (same Wi‑Fi as the phone, or use tunnel if Wi‑Fi blocks LAN):

```bash
npm run start:dev
# if the phone cannot connect to your Mac on the LAN:
npm run start:tunnel
```

Open the Leta app on the phone and tap **Load** / connect to the bundler if it does not connect automatically.

## Option B — Cloud build (no USB after install)

Requires a free [Expo](https://expo.dev) account:

```bash
cd app
npm install -g eas-cli   # once
eas login
eas init               # links this app to an Expo project (updates app.json projectId)
npm run build:ios:dev
```

When the build finishes, open the **install link** on your iPhone (Safari), install the profile, then:

```bash
npm run start:tunnel
```

Open the dev client on the phone and connect.

## Demo mode (no Firebase)

You do not need a `.env` file to explore flows. Without `EXPO_PUBLIC_FIREBASE_*`, the app uses **demo data**.

To use Firebase later: `cp .env.example .env` and fill in keys, then restart the dev server.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| iPhone not listed | Reconnect USB, unlock phone, run `xcrun xctrace list devices` |
| Signing / provisioning errors | Open `app/ios/Leta.xcworkspace` in Xcode → Signing & Capabilities → Team = your Apple ID |
| “Could not connect to development server” | Run `npm run start:tunnel` and reload the app |
| Maps blank on iOS | Normal in simulator; on device, location permission is enough for Apple Maps |
| WebRTC / Leta Live | Only in dev build on a real device; needs camera permission |
