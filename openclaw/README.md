# Leta × OpenClaw (budget-friendly)

Run a **local OpenClaw gateway** ($0) + **Gemini free tier** for ops drafts, recruit copy, and dev help. No paid OpenClaw cloud required.

## Placeholder map

| File | What to fill in |
|------|-----------------|
| `openclaw/.env` | Copy from `.env.example` — `GEMINI_API_KEY`, `OPENCLAW_GATEWAY_TOKEN` |
| `openclaw/openclaw.json.example` | Merge into `~/.openclaw/openclaw.json`; fix `workspace` path |
| `leta/.cursor/mcp.json` | `OPENCLAW_URL`, `OPENCLAW_GATEWAY_TOKEN` for Cursor MCP |
| `functions/.env` | Optional `OPENCLAW_*` for server-side digest (off by default) |
| `~/.openclaw/.env` | Same `GEMINI_API_KEY` for the gateway daemon |

## Quick start (this laptop)

```bash
# 1. Secrets (never commit)
cp openclaw/.env.example openclaw/.env
# Edit openclaw/.env

# 2. Gateway env (daemon reads ~/.openclaw/.env)
echo "GEMINI_API_KEY=YOUR_GEMINI_API_KEY" >> ~/.openclaw/.env

# 3. Point OpenClaw at this workspace (see openclaw.json.example)
#    Set agents.list[].workspace to absolute path of openclaw/workspace/

# 4. Start gateway
openclaw gateway stop 2>/dev/null; systemctl --user start openclaw-gateway.service

# 5. Dev helper
./openclaw/scripts/dev-check.sh
```

## Cursor MCP (this repo)

Project config: `leta/.cursor/mcp.json` — enables **openclaw_chat** tools when the gateway is running.

Reload Cursor after editing placeholders.

## Firebase (optional, free tier)

Set in `functions/.env`:

```bash
OPENCLAW_URL=http://YOUR_TAILSCALE_OR_VPN_HOST:18789   # only if gateway reachable
OPENCLAW_GATEWAY_TOKEN=YOUR_OPENCLAW_GATEWAY_TOKEN
OPENCLAW_AGENT_ID=leta
OPENCLAW_OPS_ENABLED=true
```

Callable `openclawOpsDigest` returns a draft summary when enabled; otherwise `{ enabled: false }` (no API cost).

## WhatsApp / channels

Disabled in `openclaw.json.example` to avoid extra setup cost. Enable later in `~/.openclaw/openclaw.json` if needed.

## Files in this folder

```
openclaw/
  .env.example          # placeholders
  openclaw.json.example # merge into ~/.openclaw/openclaw.json
  README.md             # this file
  scripts/
    dev-check.sh        # health + test prompt
  workspace/            # Leta-specific agent memory
    AGENTS.md SOUL.md USER.md TOOLS.md
```
