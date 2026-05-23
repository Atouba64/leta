# Leta OpenClaw — placeholder checklist

Replace every `YOUR_*` value before enabling production use.

| Location | Keys / fields |
|----------|----------------|
| `openclaw/.env` | `OPENCLAW_GATEWAY_TOKEN`, `GEMINI_API_KEY`, optional `ANTHROPIC_API_KEY` |
| `~/.openclaw/.env` | `GEMINI_API_KEY` (gateway daemon) |
| `openclaw/openclaw.json.example` | `workspace` absolute path, `gateway.auth.token` |
| `leta/.cursor/mcp.json` | `OPENCLAW_GATEWAY_TOKEN` |
| `functions/.env` | `OPENCLAW_URL`, `OPENCLAW_GATEWAY_TOKEN`, `OPENCLAW_AGENT_ID`; set `OPENCLAW_OPS_ENABLED=true` only when ready |
| `website/contact-config.js` | `openclawOpsWebhookUrl` (future; site ignores when `openclawEnabled: false`) |

**Do not commit** filled `.env` files — they are gitignored.
