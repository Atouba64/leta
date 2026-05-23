# OpenClaw × Leta (portable pack)

**Do not install OpenClaw on your Mac for this project.** Run it on your **Ubuntu** machine (desktop or cheap VPS). Everything in this folder travels with the `leta` git repo — clone or pull on Ubuntu, then run the sync script.

## What OpenClaw is

[OpenClaw](https://docs.openclaw.ai/) is a **self-hosted AI gateway**: one process on your Linux box that can connect to model providers (Anthropic, OpenAI, Google, etc.) and optional channels (WhatsApp, Telegram, email). You pay **only for API usage** you choose — no per-seat Leta SaaS fee.

Official install (on Ubuntu):

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard --install-daemon
openclaw doctor
```

## Why it helps Barrister × Leta (budget-conscious)

| Use case | Value | Cost profile |
|----------|--------|----------------|
| **Email WO triage** | Paste or forward Barrister dispatch emails → structured fields (WO #, site, POC, SLA) for liaison to paste into Leta | Small model calls; run on cheapest model that passes your QA |
| **Dispatch reminders** | Cron-style “nudge” when a ticket has no status in X hours | Nearly free if you batch one check per hour |
| **Call/meeting notes → ticket** | After a phone bridge, turn bullet notes into thread messages | Manual paste in; no transcription API required at first |
| **WhatsApp recruit relay** | Draft replies for 18–26 recruit lane (human approves before send) | Optional channel; only if you already use WhatsApp Web |
| **After-hours digest** | Morning summary of open partner tickets for liaison inbox | One daily completion |

OpenClaw does **not** replace Leta’s app, Firestore, or voice stack. It is a **liaison-side copilot** on Ubuntu until Barrister is ready for full portal workflow.

## Cursor chat handoff (Mac → Ubuntu)

Cursor history does not sync between machines. Caveats and full context:

**`docs/cursor-handoff/2026-05-23-barrister-openclaw-caveats.md`**

On Ubuntu Cursor: `@` that file and continue the thread.

## Carry this folder to Ubuntu

From the repo root on Ubuntu:

```bash
cd integrations/openclaw/ubuntu
chmod +x install-workspace.sh
./install-workspace.sh
```

That copies `workspace/leta-liaison/` into `~/.openclaw/workspace/leta-liaison` (or path you set with `OPENCLAW_WORKSPACE`).

Then point OpenClaw at the workspace during `openclaw onboard` or in config.

## Files

| Path | Purpose |
|------|---------|
| [`BENEFITS-BARRISTER.md`](./BENEFITS-BARRISTER.md) | Full benefit breakdown + phased rollout |
| [`ubuntu/SETUP.md`](./ubuntu/SETUP.md) | Step-by-step Ubuntu-only setup |
| [`ubuntu/install-workspace.sh`](./ubuntu/install-workspace.sh) | Copy workspace skills to `~/.openclaw` |
| [`workspace/leta-liaison/`](./workspace/leta-liaison/) | Agent instructions + skills (versioned in git) |
| [`env.example`](./env.example) | Variables to set on Ubuntu (no secrets in git) |

## Security

- Keep API keys in `~/.openclaw/` or env vars on Ubuntu only — never commit `.env`.
- Human-in-the-loop for anything sent to Barrister or techs until you trust the prompts.
- POC phone numbers and WO data are partner-confidential; run gateway on a machine you control.

## Next steps after install

1. Run `openclaw doctor` on Ubuntu.
2. Test skill: `barrister-email-triage` with a redacted sample email.
3. Wire outputs into your liaison SOP (copy into Leta ticket / Netlify form / spreadsheet).
4. When ready, add a small script to POST structured JSON to your future partner webhook (not included yet — keeps scope zero-cost).
