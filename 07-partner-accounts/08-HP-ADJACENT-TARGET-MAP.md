# HP-adjacent target map — how Leta gets enterprise-class work

**You do not pitch HP directly on day one.** HP and similar OEMs/enterprises buy **national programs** from **primes** (MSPs, field-service networks, integrators). Leta wins the **Georgia execution slice** inside that chain.

**Live tracker:** [ops-tracker.html](https://leta.repair/ops-tracker.html) — sort by **pathPriority** column (lower = call/register sooner).

---

## The chain (GUS model)

```
HP / large enterprise (or their end customer)
  → Tier 2 prime: CompuCom, Essintial, Barrister, NCR, DXC-class integrator
    → Tier 3 Leta: Georgia smart hands + SLA + portal
      → Tier 4: Leta field techs
```

See [`../06-partner-operations/ticket-lifecycle-gus.md`](../06-partner-operations/ticket-lifecycle-gus.md).

---

## Three paths to HP-class volume

| Path | What it means | Leta action |
|------|----------------|-------------|
| **A — Subcontract prime** | Prime already holds HP/OEM/retail national contract | Pitch GA wedge to Barrister, Essintial, CompuCom, Source Support |
| **B — OEM / rollout partner** | Device lifecycle, POS, refresh (often HP-adjacent) | NCR Voyix, Spencer, Level 10, ServicePoint |
| **C — Procurement rails** | Buyer adds you when invited | Field Nation, Coupa, Ariba, Beeline, Team Georgia, SAM.gov |

**Path A is highest leverage.** Path C is baseline paperwork so you are **payable** when a prime adds vendors.

---

## Call / register order (`pathPriority`)

### Wave 1 — Primes most likely to carry HP-scale field work (weeks 1–4)

| Prio | Target | `enterpriseChain` | Who to call | First ask |
|------|--------|-------------------|-------------|-----------|
| **1** | Barrister Global Services | HP/enterprise → Barrister panel → **Leta GA** | Enver (partnerships) | Georgia wedge pilot ([`barrister-global-services/georgia-wedge-pilot.md`](./barrister-global-services/georgia-wedge-pilot.md)) |
| **2** | Source Support (Techworks) | OEM/enterprise → Source → **Leta GA** | Director vendor partnerships | Lawrenceville-local bench; OEM cert matching |
| **3** | Essintial Enterprise Solutions | National break-fix prime → Essintial → **Leta GA** | Vendor partner program | Submit vendor form; GA reliability vs cancellation pain |
| **4** | CompuCom | Enterprise MSP / staffing → CompuCom → **Leta GA** | Staffing / field services vendor mgr | Atlanta footprint subcontract |

### Wave 2 — Aggregators & deployment (weeks 3–8)

| Prio | Target | `enterpriseChain` | Who to call |
|------|--------|-------------------|-------------|
| **5** | NCR Voyix | Retail/OEM programs → NCR → **Leta GA** | Regional field services / partner program |
| **6** | Kinettix | Global coordination → Kinettix → **Leta GA** | Field ops / vendor onboarding |
| **7** | Spencer Technologies | Retail POS rollouts → Spencer → **Leta GA** | Director field operations |
| **8** | Pomeroy | Infrastructure lifecycle → Pomeroy → **Leta GA** | Field services partnerships |
| **9** | Bailiwick | Pre-kit rollout → Bailiwick → **Leta GA** | Deployment partnerships |
| **10** | TechLink Services | SD-WAN / lockers → TechLink → **Leta GA** | Vendor management |
| **11** | Telaid Industries | CCTV / access → Telaid → **Leta GA** | Deployment vendor desk |
| **12** | Buchanan Technologies | Regional enterprise field → Buchanan → **Leta GA** | Field services lead |

### Wave 3 — Procurement & marketplace rails (parallel paperwork)

| Prio | Platform | Why for HP-adjacent work |
|------|----------|--------------------------|
| **13** | Field Nation (service company) | Overflow when primes post WOs to FN |
| **14** | Team Georgia Marketplace | State IT / public sector baseline |
| **15** | ATLSuppliers | City of Atlanta vendor list |
| **16** | SAM.gov | Federal subcontract eligibility |
| **17** | Coupa Supplier Portal | Corporate invoice / PO rail |
| **18** | SAP Ariba | Same — many Fortune 500 buyers |
| **19** | Beeline BSN | Contingent workforce / VMS |
| **20** | CloudWork\|PRO | IT field marketplace |
| **21** | WorkMarket | ADP labor cloud (secondary) |

### Wave 4 — Georgia MSPs (regional Tier-2, not HP direct)

Priorities **22–30** in tracker: Leapfrog, Integris, Granite, MIS, VTC, Navious, The 20, Abel, AdvanTech — smart-hands overflow; easier closes than national primes.

---

## Prerequisites (do before Wave 1 calls)

From [`../06-partner-operations/vendor-registration/01-MASTER-VENDOR-PACKET-CHECKLIST.md`](../06-partner-operations/vendor-registration/01-MASTER-VENDOR-PACKET-CHECKLIST.md):

1. W-9, Articles of Org, EIN letter, GA good standing  
2. COI: GL $1M/$2M, workers’ comp, auto (E&O if available)  
3. One-page **capability statement** (Georgia statewide, POS, networking, smart hands, API dispatch)  
4. D-U-N-S number (recommended for enterprise)  
5. Dedicated email: `vendor-compliance@leta.repair` (or similar)

---

## Pitch one-liner (primes)

> “We are not trying to replace your national contract. We are your **Georgia execution layer** — one SLA, one invoice, photo/sign-off on every ticket, so your HP-scale programs do not fail in our state.”

---

## What success looks like

| Milestone | Signal |
|-----------|--------|
| **30 days** | Vendor packet sent to Barrister + Source Support; Essintial form submitted |
| **60 days** | Georgia wedge pilot scoped or 5-ticket MSP pilot live |
| **90 days** | First paid WOs through a prime with partner WO# on Leta tickets |
| **12 months** | Steady GA volume from 2+ primes; Field Nation + Team Georgia active |

---

## Tracker columns

| Column | Meaning |
|--------|---------|
| `pathPriority` | HP-adjacent call/register order (1 = first) |
| `enterpriseChain` | Who sits above Leta in the commercial chain |
| `nextStep` | Your concrete next action |
| `outreachStage` | research → outreach → conversation → pilot → production |

Update via [Google Sheets](./07-GOOGLE-SHEETS-TRACKER.md) or `data/partner-platform-tracker.json`.

---

## Related

- [`00-LETA-PARTNER-ACQUISITION-PLAYBOOK.md`](./00-LETA-PARTNER-ACQUISITION-PLAYBOOK.md)  
- [`barrister-global-services/coopetition-thesis.md`](./barrister-global-services/coopetition-thesis.md)  
- [`03-WORK-ORDER-SOURCES-GEORGIA.md`](./03-WORK-ORDER-SOURCES-GEORGIA.md)
