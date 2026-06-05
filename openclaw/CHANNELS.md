# Leta AI — channels (website, WhatsApp, Telegram, Discord)

One **OpenClaw gateway** + one **Leta agent workspace** serves every surface.

## Architecture

| Surface | How it connects |
|---------|-----------------|
| **Website** (`leta.repair`) | `leta-ai-chat.js` → Cloud Function `POST /agent/chat` → OpenClaw |
| **WhatsApp** | OpenClaw `channels.whatsapp` on VPS |
| **Telegram** | OpenClaw `channels.telegram` + @BotFather token |
| **Discord** | OpenClaw `channels.discord` + bot token |
| **App / staff** | Callable `letaAgentChat` (Firebase Auth → role context) |
| **Cursor / devs** | MCP `openclaw-mcp` → local or tunneled gateway |

## 1. Fix gateway config

```bash
cd /path/to/leta
./openclaw/scripts/repair-openclaw-json.sh
cp openclaw/.env.example openclaw/.env   # set tokens
openclaw doctor --fix
systemctl --user restart openclaw-gateway.service
./openclaw/scripts/dev-check.sh
```

## 2. Enable Cloud Function bridge

In `functions/.env`:

```bash
LETA_AGENT_ENABLED=true
OPENCLAW_URL=http://YOUR_VPS_OR_TAILSCALE_HOST:18789
OPENCLAW_GATEWAY_TOKEN=same-as-gateway-auth-token
OPENCLAW_AGENT_ID=leta
```

Deploy:

```bash
cd functions && firebase deploy --only functions
```

In `website/contact-config.js` set `firebaseProjectId` to your Firebase project ID (or paste full `aiChatApiUrl`).

## 3. WhatsApp

1. In `~/.openclaw/openclaw.json`, ensure `channels.whatsapp` and `plugins.entries.whatsapp.enabled: true`.
2. Link WhatsApp Web/device in OpenClaw Control UI (`http://127.0.0.1:18789`).
3. For **public visitors**: set `dmPolicy: "pairing"` or `"open"` (pairing is safer to start).
4. Business line placeholder: `+14702526681` (see `contact-config.js`).

## 4. Telegram

1. Create a bot: [@BotFather](https://t.me/BotFather) → `/newbot` → copy token.
2. In `~/.openclaw/openclaw.json`:

```json
"telegram": {
  "enabled": true,
  "botToken": "YOUR_TOKEN",
  "dmPolicy": "open",
  "allowFrom": ["*"]
}
```

3. `openclaw config set plugins.entries.telegram.enabled true --json`
4. Restart gateway. Visitors message your bot — same Leta agent.

## 5. Discord

1. [Discord Developer Portal](https://discord.com/developers/applications) → New Application → Bot → copy token.
2. Enable **Message Content Intent** and **Server Members Intent**.
3. Invite bot to your server (OAuth2 URL Generator: `bot` + `applications.commands`).
4. Config:

```json
"discord": {
  "enabled": true,
  "token": "YOUR_BOT_TOKEN",
  "dm": { "enabled": true, "policy": "open", "allowFrom": ["*"] }
}
```

5. Restart gateway. Use DMs or a `#help` channel with mention gating.

## 6. VPS (required for public messaging)

Loopback (`127.0.0.1`) only works on the host machine. For WhatsApp/Telegram/Discord 24/7 and for Cloud Functions to reach OpenClaw:

1. Deploy Ubuntu VPS (Hetzner ~$5/mo).
2. Install OpenClaw + clone `leta` repo.
3. Set `gateway.bind` to `0.0.0.0` **only behind firewall**, or use **Tailscale** (recommended).
4. Point `OPENCLAW_URL` in `functions/.env` at the reachable host.

## 7. Security

- **Public channels**: start with `dmPolicy: "pairing"`; review paired users in Control UI.
- **Never** expose gateway without token auth on the public internet.
- POC / partner WO data only flows to **authenticated** app users via `letaAgentChat`.
- Rotate tokens if leaked.

## 8. Human handoff

- Website AI panel → **Talk to a human** → Tawk.
- Messaging: tell users to call `(470) 252-6681` or email `support@leta.repair` for urgent issues.
