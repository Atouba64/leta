# Cursor handoff — Barrister channel, OpenClaw, caveats

**Created:** 2026-05-23  
**Source:** Mac Cursor chat (transcript `316e609c-3285-4f58-9faf-cca8a36dcb3d`)  
**Use on Ubuntu:** `@docs/cursor-handoff/2026-05-23-barrister-openclaw-caveats.md` in Cursor chat after `git pull`.

---

## What you asked for (summary)

1. **Barrister Global Services** as a partner channel — Leta is **liaison** between Barrister (phone/email dispatch) and Leta field techs.
2. Techs see partner tickets **like a Barrister tech would**: partner WO #, POC-only, dispatch voice, phone-first UI.
3. **Web pages + app screens** for dispatch/support/phones; **migrate slowly** from Barrister’s email/phone habits to Leta’s platform.
4. **OpenClaw:** explain benefits, implement what can be implemented **in the repo**, but **do not install OpenClaw on Mac** — carry config to **Ubuntu**; **tight budget**.

---

## What was implemented (in `leta` repo)

### Web

| Path | Purpose |
|------|---------|
| `website/partners/barrister/index.html` | Overview, 3-party flow, migration phases |
| `website/partners/barrister/for-techs.html` | Tech-facing instructions |
| `website/partners/barrister/liaison.html` | Liaison / who-talks-to-whom |
| `website/partners.html` | “Partner channels” section → Barrister |
| `website/styles.css` | `.flow-steps`, `.partner-channel-hero`, `.tile--phone` |

### App (Leta Tech — demo mode works without Firebase)

| Path | Purpose |
|------|---------|
| `app/src/constants/partnerChannels.js` | `BARRISTER` channel config, rules, labels |
| `app/src/utils/partnerChannel.js` | `isBarristerChannel`, `isPartnerChannelOffer` |
| `app/src/components/PartnerChannelBadge.js` | Badge on offers/jobs |
| `app/src/components/PhoneContactCard.js` | Tap-to-call POC + Leta voice |
| `app/src/components/PartnerOfferCard.js` | Dispatch board card |
| `app/src/screens/technician/TechPartnerOfferDetail.js` | Offer detail + accept |
| `app/src/screens/technician/TechPartnerActiveJob.js` | Phone-first active job |
| `app/src/screens/technician/TechDispatch.js` | Partner filter, Barrister offers |
| `app/src/screens/technician/TechActiveJob.js` | Routes Barrister jobs to partner screen |
| `app/src/services/mockData.js` | `DEMO_BARRISTER_OFFERS`, `offerToActiveJob` |
| `app/src/services/demoActiveJob.js` | Demo accept → correct Active job |
| `app/src/navigation/TechnicianNavigator.js` | `TechPartnerOfferDetail` route |

### Partner account docs

| Path | Purpose |
|------|---------|
| `07-partner-accounts/barrister-global-services/digital-channel.md` | Map web + app + OpenClaw |
| `07-partner-accounts/barrister-global-services/README.md` | Links to digital-channel |

### OpenClaw (portable — **not installed**, only files)

| Path | Purpose |
|------|---------|
| `integrations/openclaw/README.md` | Install overview (Ubuntu) |
| `integrations/openclaw/BENEFITS-BARRISTER.md` | Full benefit breakdown |
| `integrations/openclaw/ubuntu/SETUP.md` | Ubuntu steps |
| `integrations/openclaw/ubuntu/install-workspace.sh` | Copy workspace to `~/.openclaw` |
| `integrations/openclaw/workspace/leta-liaison/` | `AGENTS.md` + skills |
| `integrations/openclaw/env.example` | Env template (no secrets) |

---

## Demo walkthrough (app)

1. Run Leta Tech with **demo mode** (no Firebase configured).
2. **Dispatch** → go **Active** (toggle on) → enable **Partner dispatch (Barrister)**.
3. Open a Barrister offer → **View details** → **Accept**.
4. **Active** tab → phone-first UI (WO confirm, POC, dispatch voice, thread).

---

## Ubuntu next steps (OpenClaw)

```bash
# On Ubuntu only — not on Mac
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard --install-daemon
openclaw doctor

cd /path/to/leta/integrations/openclaw/ubuntu
chmod +x install-workspace.sh
./install-workspace.sh
```

Test skill: paste a **redacted** Barrister dispatch email → `barrister-email-triage` → review JSON before any ticket create.

Docs: https://docs.openclaw.ai/install

---

# CAVEATS (read this on Ubuntu)

These are the constraints and gaps from the Mac session. **Do not assume production-ready** without addressing them.

## Platform & environment

| Caveat | Detail |
|--------|--------|
| **OpenClaw on Mac** | Intentionally **not** installed on Mac. Install only on **Ubuntu** (or VPS). Repo pack is copy-paste via git. |
| **Cursor chat does not sync** | Mac chat history ≠ Ubuntu. Use **this file** (or `git pull` + `@` mention) to continue. |
| **Transcript stays on Mac** | UUID `316e609c-3285-4f58-9faf-cca8a36dcb3d` is local to the Mac project path unless you export it yourself. |

## App / product

| Caveat | Detail |
|--------|--------|
| **Demo vs production** | Barrister offers and accept flow are wired for **`demoMode`** + mock data. Real Firestore accept/routing for `partnerChannel: barrister` is **not** fully built. |
| **Active job subscription** | In production, `TechActiveJob` uses `subscribeTechActiveTicket` — partner channel detection depends on ticket fields (`partnerChannel`, `partnerId`) being set server-side. |
| **Voice calls** | “Call dispatch on Leta” navigates to `PartnerVoiceCall` with **demo session IDs** — real Twilio/platform voice must match your existing `ticketChannel` / voice stack. |
| **Ticket thread** | `TicketThread` still uses **demo thread** in demo mode; production messages need partner-visible rules. |
| **Only Barrister channel skin** | `partnerChannels.js` defines Barrister explicitly; other partners need new channel configs. |
| **POC phone on card** | `tel:` opens the **native dialer** — tech’s personal line is exposed to POC unless they use **Leta voice** only. Train techs. |
| **No auto email ingest** | Barrister emails are **not** parsed into tickets automatically yet — liaison manual entry (OpenClaw assists as copy-paste). |

## Web

| Caveat | Detail |
|--------|--------|
| **Not deployed until you push** | Barrister HTML under `website/partners/barrister/` goes live on **Netlify** when you deploy `leta` website (e.g. leta.repair). |
| **liaison.html OpenClaw link** | Points to contact, not a live doc URL — OpenClaw docs live in **repo** only. |

## OpenClaw

| Caveat | Detail |
|--------|--------|
| **Human in the loop** | Skills say: **never** auto-send to Barrister, techs, or POCs. Liaison approves all outbound. |
| **API cost** | You pay the model provider you pick in onboarding — use **cheapest model** that passes WO extraction QA. |
| **No Firestore webhook yet** | Triage output is **JSON for paste**, not `POST /tickets`. Building auto-create needs auth, budget for bad parses, and partner trust. |
| **Secrets** | Copy `env.example` → `~/.openclaw/leta-liaison.env` on Ubuntu only; **never commit** API keys. |
| **Cron / stale reminders** | Skill `dispatch-stale-reminder` exists; **scheduled jobs** require you to configure OpenClaw daemon/cron on Ubuntu — not pre-wired. |
| **WhatsApp channel** | Optional, extra setup in OpenClaw; recruit WhatsApp on **website** is separate (Business app quick replies). |

## Business / partner

| Caveat | Detail |
|--------|--------|
| **Barrister is outreach stage** | Account folder says first call / coopetition — UI is **pilot-ready demo**, not a signed integration. |
| **POC-only policy** | Based on ops doc (`06-partner-operations/ticket-lifecycle-gus.md`) — enforce in training and contracts. |
| **Migration promise** | Phase 1 accommodate phone/email; Phase 3 platform-native — **do not over-promise** portal features Barrister hasn’t agreed to. |
| **Budget** | No paid SaaS added in this work — self-hosted OpenClaw + API usage only. |

## Git / ops

| Caveat | Detail |
|--------|--------|
| **May not be committed/pushed** | If you haven’t committed since the Mac session, Ubuntu needs `git pull` **after** you push from Mac (or commit on either machine). |
| **Two workspaces** | You have `aResume` and `leta` in Cursor; Barrister work is in **`leta`** only. |

---

## OpenClaw benefits (quick reference)

Full detail: `integrations/openclaw/BENEFITS-BARRISTER.md`

1. **Email WO triage** — dispatch email → structured JSON (WO #, site, POC, SLA).  
2. **Stale / WO-confirm reminders** — liaison nudges (manual ticket list at first).  
3. **Call notes → thread drafts** — no transcription API required initially.  
4. **Morning digest** — one cheap daily summary.  
5. Later: recruit WhatsApp drafts, meeting follow-ups, duplicate WO check.

**Not:** replacement for Leta app, Firestore, or platform voice.

---

## Suggested prompts on Ubuntu Cursor

After `@docs/cursor-handoff/2026-05-23-barrister-openclaw-caveats.md`:

- *“Walk me through OpenClaw install on this machine and run install-workspace.sh.”*
- *“Wire Firestore acceptOffer for barrister partnerChannel using partnerChannels.js.”*
- *“Add Netlify deploy check for partners/barrister pages.”*
- *“Commit and push all Barrister + openclaw files with a clear message.”*

---

## Related paths (same thread, earlier work)

Not re-documented here; still in repo from same Cursor session lineage:

- Recruit funnel: `website/technicians.html`, `website/recruit/`, `website/contact-config.js` (WhatsApp)
- Tech onboarding: `website/tech-onboarding.html`, `app/.../TechOnboardingScreen.js`
- Live chat: `website/leta-live-chat.js`, Tawk pill-only theme

---

## File index (copy-paste for agents)

```
docs/cursor-handoff/2026-05-23-barrister-openclaw-caveats.md   ← this file
integrations/openclaw/README.md
integrations/openclaw/BENEFITS-BARRISTER.md
integrations/openclaw/ubuntu/SETUP.md
integrations/openclaw/ubuntu/install-workspace.sh
integrations/openclaw/workspace/leta-liaison/AGENTS.md
integrations/openclaw/workspace/leta-liaison/skills/barrister-email-triage/SKILL.md
integrations/openclaw/workspace/leta-liaison/skills/dispatch-stale-reminder/SKILL.md
07-partner-accounts/barrister-global-services/digital-channel.md
website/partners/barrister/index.html
website/partners/barrister/for-techs.html
website/partners/barrister/liaison.html
app/src/constants/partnerChannels.js
app/src/screens/technician/TechPartnerOfferDetail.js
app/src/screens/technician/TechPartnerActiveJob.js
```

---

*End of handoff — update this file if you resolve a caveat so Ubuntu sessions stay accurate.*
