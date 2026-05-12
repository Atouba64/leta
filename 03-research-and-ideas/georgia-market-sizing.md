# Georgia market sizing — Leta

Initial geography: **Georgia** to prove density, QA, and operational playbooks before Southeast expansion. Numbers below mix **public anchors** with **explicit assumptions**—replace assumptions with partner pipeline data, ticket exports, and (if budget allows) **IDC state IT spend** or similar licensed research.

## Why Georgia first

- Single-state operations simplify **insurance**, **contracting**, and **training**.  
- Mix of **metro** (high volume) and **regional** (coverage challenges) builds dispatch muscle.  
- Controlled expansion narrative for investors (**asset-light** without national chaos on day one).

## Public anchors (refresh annually)

| Anchor | Figure | Source / notes |
|--------|--------|----------------|
| **State population** | **11,180,878** (July 1, 2024 estimate) | [U.S. Census Bureau QuickFacts — Georgia](https://www.census.gov/quickfacts/ga) (population row; update when Census releases a new vintage). |
| **Small businesses (broad definition)** | **1,374,972** firms with **under 500 employees**; **99.7%** of Georgia businesses classified as small | [SBA Office of Advocacy, 2025 Small Business Profile — Georgia](https://advocacy.sba.gov/wp-content/uploads/2025/06/Georgia_2025-State-Profile.pdf) (Census **Nonemployer Statistics** + **Statistics of U.S. Businesses**, 2022 base in profile tables). |
| **Small-business employees** | **1.8M** employees; **42.5%** share of Georgia employment | Same SBA profile. |
| **“Professional, scientific, and technical services” (NAICS 54)** | **165,839** small firms total; **29,776** small **employer** firms; **~168.6k** employees; **~$13.7B** annual payroll (small employers, Georgia) | Same SBA profile — **not** IT-only (includes legal, accounting, etc.); use as a **ceiling** segment, then apply a relevance haircut below. |
| **Information sector (NAICS 51)** | **18,402** small firms (employer + nonemployer in profile table) | Same SBA profile — useful as high-intent IT demand cluster, still not purely break/fix. |

**Interpretation for Leta:** the state has a **very large long tail of nonemployer and micro businesses** (majority of counts). B2B dispatch and MSP overflow are concentrated in **employer firms** and mid-market locations—size SAM with **employer filters**, not raw small-business totals alone.

## Priority metros and corridors (working list)

| Area | Role in rollout |
|------|-----------------|
| **Atlanta MSA** | Volume, competition, talent pool stress test |
| **Gainesville / NE Georgia** | Coverage pattern for exurban routes |
| **Savannah / Coastal** | Logistics + different travel-time profile |
| **Augusta, Macon, Columbus** | Secondary density nodes (validate after core) |

## Demand-side segments to quantify

- SMB IT spend on **on-site** vs remote-only.  
- MSP overflow / after-hours dispatch willingness to pay.  
- B2C segments (home office, prosumer) and seasonality.

## Supply-side segments

- Independent IT contractors already doing **1099** work.  
- Bench techs at small shops seeking **evening/weekend** income.  
- Alumni networks from bootcamps and cert programs.

**Labor pool (official refresh):** pull **statewide and MSA employment** for relevant SOC codes (for example **15-1232** Computer user support specialists, **15-1252** Software developers where relevant, adjacent repair/install categories) from the BLS **Occupational Employment and Wage Statistics** data tool ([BLS OEWS](https://www.bls.gov/oes/))—the site may block automated fetches; paste the latest Georgia totals into this section when you run the export. Treat OEWS as **W-2-heavy**; independent contractors are **undercounted**, so pair with **1099 survey** or partner-reported **active tech roster** counts.

## TAM / SAM / SOM model (worksheet)

### Definitions

- **TAM (Georgia):** annual spend on **outsourced onsite / break-fix style IT labor** that could flow through dispatch networks, MSPs, or a modern marketplace—**excluding** pure helpdesk-only remote, major project SI work, and hardware resale (unless you explicitly include attach).  
- **SAM (Georgia):** portion of TAM Leta can **realistically reach** with Georgia-first ops: SMB + mid-market + partner overflow in served metros, constrained by **category** and **route economics**.  
- **SOM (near-term):** share of SAM captured in **12–24 months** given actual **tech supply**, **partner agreements**, and **CAC**.

### Step A — Top-down ceiling (optional)

If you license **state IT spending** research (for example IDC U.S. IT Spending Guide, state tables), map **services** lines to onsite field categories and record the vendor’s **definitions** here. Until then, skip dollar TAM and lean on **bottom-up**.

### Step B — Bottom-up SAM (employer-led, reproducible)

Use **employer firms** in segments that routinely buy onsite IT (start with NAICS **51**, **54** subset you believe is IT-heavy, **52** branches, **62** facilities, **44–45** retail HQ/regions—refine with CRM tagging).

1. **Count of addressable employer locations (N)** — from purchased firmographic data or manual partner lists; initial guess only with SBA: **~30k** small employer firms in NAICS 54 statewide is an **upper bound**, not the SAM count.  
2. **Annual onsite-relevant incidents per location (R)** — hypothesis range **2–12** depending on segment (retail rollouts spike; law firms cluster low).  
3. **Blended revenue per completed onsite visit (A)** — from rate cards and partner splits; keep **gross** vs **net** explicit.  

Then: **SAM revenue ≈ N × R × A** (and parallel **SAM visits ≈ N × R**).

Document your chosen **N, R, A** in a small table and date it.

### Step C — SOM from supply and utilization

Even if Step B implies a large SAM, **SOM** is capped by:

- **Active field tech equivalents (FTE or FTE-like)** you can credential and schedule.  
- **Utilization** (jobs per tech per week) at your quality bar.  
- **Partner ingestion rate** (tickets per week from each anchor partner).

Simple check: **SOM visits/year ≤ tech headcount × visits per tech per year × utilization cap**.

### Illustrative scenario (hypothetical — replace with your numbers)

| Parameter | Example value | Purpose |
|-----------|---------------|---------|
| N | 5,000 | Mid-market + SMB employer sites with recurring onsite needs in Year-1 footprint |
| R | 6 | Incidents / year / site |
| A | $350 | Net revenue to Leta per completed visit (illustrative) |
| **Implied SAM revenue** | **~$10.5M / year** | 5,000 × 6 × $350 |

If early **SOM** assumes **25** active techs, **2** visits per tech per **weekday**, **5** weekdays per week, **48** working weeks → **25 × 2 × 5 × 48 = 12,000 visits/year** → at **$350** net ≈ **$4.2M**—below SAM only if **N** and **R** are in the right ballpark; the point is to **force consistency** between demand-side SAM and supply-side SOM.

## Go-to-market experiments

- Partner with **2–3 anchor MSPs** for overflow tickets.  
- Geo-fenced digital acquisition in **one zip cluster** before broad spend.

## Related

- [`../01-business-plan/executive-summary.md`](../01-business-plan/executive-summary.md)  
- [`../05-marketing-and-sales/b2b-acquisition-strategy.md`](../05-marketing-and-sales/b2b-acquisition-strategy.md)  
- [`./competitor-analysis.md`](./competitor-analysis.md) — Barrister-class **weakness hypotheses** and coopetition framing tied to Georgia staffing pain.
