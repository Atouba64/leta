# Georgia dispatch — corridors & SLA realism

Ops reference for liaison and dispatch. Anchors: [`../data/georgia-coverage.json`](../data/georgia-coverage.json).

## Matching rules

1. **Offer radius** is drive time, not crow-flies from Atlanta.  
2. **Macon-area techs** get first look at tickets between ATL and Valdosta when skills match.  
3. **Coastal tickets** prefer Savannah/Brunswick bench before inland Augusta techs.  
4. **SW tickets** (Bainbridge, Albany, Tifton) — do not auto-offer to ATL techs unless payout includes long-haul premium and tech opted into 60+ mi.

## Typical drive-time bands (planning)

| From anchor | ~90 min drive can reach |
|-------------|-------------------------|
| Macon | Warner Robins, Milledgeville, much of I-75 middle |
| Savannah | Brunswick, Statesboro (eastern), I-16 west toward Macon |
| Atlanta | LaGrange/Newnan, Gainesville (traffic-dependent) |
| Columbus | LaGrange, south ATL exurbs (off-peak) |

Use Google Maps at dispatch time; table is for **recruit promises**, not guarantees.

## Partner SLA language

| Partner asks | Ops answer |
|--------------|------------|
| 4 hr NBD statewide | Yes **where anchor bench is live**; Phase 1 = hubs + ATL |
| Same-day coast | Savannah bench required |
| Rural SW | Phase 3; may be next-day without premium |

## Ticket fields (future Firestore)

- `serviceAnchorId` — e.g. `macon-warner-robins`  
- `corridorIds[]` — e.g. `["i-75","i-16"]`  
- `longHaulEligible` — boolean for 60+ mi offers

## Barrister liaison

Email WO → assign anchor from site address → OpenClaw triage skill suggests anchor (human confirms). See [`../integrations/openclaw/`](../integrations/openclaw/).

## KPIs by phase

| Phase | KPI |
|-------|-----|
| 1 | % WOs assigned to tech within same anchor region |
| 2 | Median miles from tech home to accept |
| 3 | Partner status calls per WO &lt; 1 per 5 |
