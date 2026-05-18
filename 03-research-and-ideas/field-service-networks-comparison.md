# Field service networks — five reference companies

How Leta compares to platforms that **look like competitors** but are often **fulfillment partners** (Barrister-class) or **talent marketplaces** (Field Nation-class). Deep Barrister forensics: [`../docs/market_analysis/competitor_forensics_barrister.md`](../docs/market_analysis/competitor_forensics_barrister.md).

| # | Company | Website | Role for Leta |
|---|---------|---------|----------------|
| 1 | **Barrister Global Services Network** | [barrister.com](https://barrister.com/) | Blueprint + **coopetition partner** (they have demand; we add GA bench + modern comms) |
| 2 | **Field Nation** | [fieldnation.com](https://fieldnation.com/) | Marketplace competitor; optional overflow talent pool |
| 3 | **WorkMarket (ADP)** | [workmarket.com](https://www.workmarket.com/) | Compliance/payments competitor; not vertical IT ops |
| 4 | **Essintial Enterprise Solutions** | [essintial.com](https://www.essintial.com/) | National break-fix competitor; logistics-heavy |
| 5 | **Qmatic Group** | [qmatic.com](https://www.qmatic.com/) | **Ideal partner profile** (OEM/MSP with SLAs, thin local bench) |

---

## 1. Barrister Global Services Network

**What they do:** National IT field service broker — break/fix, deployments, retail, facilities. Claims 13k–15k+ technicians; BAM/TECHWA-style portals for accept/decline; phone + email dispatch remains dominant per field reports.

**How work arrives at techs**

| Mode | Description | Leta improvement |
|------|-------------|------------------|
| **Passive** | Calls + emails from dispatch; negotiate rate, scope, ETA on the phone | Rate locked **before** accept in app; ETA + status visible to partner without calling |
| **Active** | Web portal lists jobs by distance | Same + skill tags, auto-push to best matches, combined partner + direct demand |

**How customers create work**

- End site → enterprise IT (e.g. Food Lion IT) → **Bamboo** (example) → **Barrister** → tech (**GUS chain**).
- Partner internal ticket # passed on phone; remote support via emailed **Teams** links and large bridge calls.

**Pay model (typical public postings):** Flat break/fix (~$45 negotiable), hourly deskside (~$30/hr), 1099 contractors, parts often on-site.

**Leta lesson from Food Lion / Cradlepoint anecdote:** POC-only onsite contact, pre-arrival confirm ticket still open, **Leta Live** sub-session per ticket (not 50-tech bridge), access PIN workflow, sign-off + 24h payout target.

---

## 2. Field Nation

**What they do:** Largest open **IT labor marketplace** — buyers post work orders; providers bid or accept from a board.

**Strengths:** Scale, certs/skills, national ZIP coverage, compliance tooling.

**Weaknesses vs Leta:** No managed SLA ownership, no native tier-3 overwatch story, marketplace fees (~10%), race-to-bottom on open jobs.

**When Leta wins:** Partner wants **outcome + visibility**, not a list of strangers. When Leta loses on price alone on commodity break-fix.

---

## 3. WorkMarket (ADP)

**What they do:** **Freelancer management** — onboarding, 1099, payments, work order objects; ADP payroll adjacency.

**Strengths:** Compliance, enterprise procurement familiarity.

**Weaknesses vs Leta:** Generic horizontal tool; weak IT-specific dispatch, POC rules, GUS ticket linking, video overwatch.

**Leta stack:** Use WorkMarket only if a partner **requires** ADP—otherwise Leta + Stripe Connect + Checkr covers 1099 flow cheaper.

---

## 4. Essintial Enterprise Solutions

**What they do:** National **infrastructure + logistics** field service (retail, POS, rollouts, FSL kitting).

**Strengths:** Parts network, enterprise retail relationships.

**Weaknesses vs Leta:** Dispatch/logistics disconnect; punitive tech policies reported in forensics.

**Leta wedge:** Tighter **parts-ready gate** before dispatch in Georgia pilots (see predictive logistics doc).

---

## 5. Qmatic Group (partner archetype)

**What they do:** Customer journey / queue / kiosk **software** — sells to enterprises (e.g. Spectrum for in-store TV/queue installs).

**Why they matter:** Classic **Tier 2** — holds SLA, lacks cheap local tech in every city. Subcontracted Barrister in real anecdote; Leta replaces that hop with **faster GA bench + Qmatic remote on Leta Live**.

**Leta lesson from Spectrum install:** Partner dispatches Leta tech; Qmatic engineer joins **one** live session; everyone saves vs phone-tag + unknown proprietary hardware.

---

## Summary matrix

| Capability | Barrister | Field Nation | WorkMarket | Essintial | Leta (target) |
|------------|-----------|--------------|------------|-----------|---------------|
| GUS / multi-tier ticket ID | Phone + email | Buyer WO # | Generic WO | Enterprise WO | **Partner ref + API** on every ticket |
| Tech assignment | Passive calls + portal | Open market | Manual assign | Internal + subs | **Push + optional board** |
| Remote assist | Teams bridges | Buyer-dependent | None | Call center | **Leta Live** per ticket |
| Partner visibility | Limited | Buyer dashboard | Admin reports | Account mgmt | **Live map + timeline** |
| Tech payout speed | Variable | Platform-dependent | ADP cycle | Net terms | **24h target** (Stripe) |
| Georgia density | National thin | National pool | N/A | National | **Statewide bench focus** |

---

## Related repo docs

- Partner workflow: [`../06-partner-operations/partner-lifecycle-workflow.md`](../06-partner-operations/partner-lifecycle-workflow.md)
- GUS ticket stories: [`../06-partner-operations/ticket-lifecycle-gus.md`](../06-partner-operations/ticket-lifecycle-gus.md)
- Coopetition pitch: [`../05-marketing-and-sales/partner-channel-win-win.md`](../05-marketing-and-sales/partner-channel-win-win.md)
