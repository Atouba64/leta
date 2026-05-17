# Leta operational model

> Architecture deep dives: [`../docs/operations/`](../docs/operations/) · Leta Advantage: [`../docs/leta-advantage.md`](../docs/leta-advantage.md)

## 1. Multi-tier "GUS" subcontracting flow

Leta is built for complex service chains—the entity paying Leta is rarely the site experiencing the failure.

| Tier | Example | Role |
|------|---------|------|
| **Tier 1** | Food Lion store | End customer / site |
| **Tier 2** | Bamboo IT, Qmatic | Enterprise IT / MSP / OEM holding national contract |
| **Tier 3** | Leta | Localized smart hands for Tier 2 |
| **Tier 4** | Leta field tech | Vetted 1099 contractor on site |

**Leta solution:** Unified partner dashboard—Tier 2 sees live ETA, on-site status, sign-off, and optional **Leta Live** video **without** calling a Leta dispatcher.

## 2. Dispatching & work order assignment

Legacy competitors use slow passive phone trees. Leta uses **algorithmic active dispatch**.

- **Smart push notifications:** Filter Georgia roster by distance, skill tags (`Cradlepoint`, `POS`, `Cabling`), and rating. Notify top matches instantly.
- **Auto-accept premium:** High performers get a **5-minute exclusivity window** on premium jobs before general board.
- **Rate transparency:** Exact payout (hourly vs flat) and estimated duration **before** accept.

See [`../docs/operations/autonomous_algorithmic_dispatch.md`](../docs/operations/autonomous_algorithmic_dispatch.md).

## 3. On-site execution & communication stack

- **Pre-arrival briefings:** Manuals/quick-start for ticket hardware after accept.
- **Access UI:** POC name/photo, physical access rules, tap-to-reveal rack PINs (GPS-gated when live).
- **Leta Live:** One button → WebRTC to Tier 2 remote expert; rear camera default; session tied to ticket—no Teams link email chains.

## 4. Remote tech integration (quality assurance)

- Field techs **escalate before leaving unresolved** when policy requires.
- Remote experts guide via live video; events logged for QA and disputes.

## 5. Rapid resolution & payout

- **Digital sign-off** on device; mandatory completion photos.
- **Target: 24-hour payouts** after remote approval—retention lever vs 30–45 day net terms.

## 6. Tech onboarding & vetting

- Background checks (e.g. Checkr) before activation.
- Cert uploads or in-app skill quizzes.
- **Sandbox tickets** for new techs before high-severity enterprise access.

## 7. Dispute resolution

- GPS, chat, photos, and ticket event log reviewed by Leta admin when escrow disputes arise.

## 8. Predictive logistics (differentiator)

Parts validation and FSL kitting integrated into dispatch—see [`../docs/operations/predictive_logistics_and_supply_chain.md`](../docs/operations/predictive_logistics_and_supply_chain.md).
