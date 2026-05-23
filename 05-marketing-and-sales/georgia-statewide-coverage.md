# Georgia statewide coverage — Leta

**Canonical data:** [`../data/georgia-coverage.json`](../data/georgia-coverage.json)  
**Public map:** [leta.repair/coverage.html](https://leta.repair/coverage.html) (generated from `website/georgia-coverage-data.js`)

## North star

Say **“we cover Georgia”** only when the **anchor map** is staffed honestly — not when one Atlanta tech is willing to drive four hours on hope.

## Minimum anchor footprint (your requirement)

| Zone | Anchors | Why it matters |
|------|---------|----------------|
| **NW corner** | Dalton | I-75 at Tennessee; carpet/logistics belt |
| **SW corner** | Bainbridge, Albany | FL/AL borders; SW hub |
| **SE coast** | Savannah, Brunswick | Port, tourism, I-16 east |
| **E / NE** | Augusta | SC border, CSRA |
| **W** | Columbus | Alabama border, mid-west |
| **Heart** | **Macon, Warner Robins** | Geographic center (I-75 × I-16) — **non-negotiable** |
| **Deep South** | Valdosta, Tifton | I-75 before Florida; ag/logistics |
| **North** | Gainesville, Athens, Rome | I-985 mountains, UGA hub, NW interior |
| **West I-85** | LaGrange, Newnan | Atlanta–Columbus gap |
| **E inland** | Statesboro | Augusta–Savannah rural bridge |
| **Core density** | Metro Atlanta | SLA proof, partner pilots, recruit volume |

**Total:** 13 named anchor clusters + Metro Atlanta = **statewide box** on the map.

## Interstate corridors (dispatch logic)

| Corridor | Role |
|----------|------|
| **I-75** | N–S spine: Dalton → Macon → Tifton → Valdosta |
| **I-16** | Macon → Statesboro → Savannah |
| **I-85** | Atlanta → LaGrange/Newnan → Columbus flank |
| **I-985** | Gainesville into mountains |
| **I-20** | Augusta ↔ Atlanta ↔ west |

Offers must use **drive time along corridors**, not straight-line distance from ATL.

## Rollout phases (business honesty)

| Phase | Anchors | Marketing claim |
|-------|---------|-----------------|
| **0** | Metro Atlanta | “Launch market” |
| **1** | Macon, Savannah, Augusta, Columbus, Athens, Gainesville | “Statewide hub coordination” |
| **2** | Valdosta, Tifton, Dalton, Rome, LaGrange/Newnan, Statesboro | “Corridor-complete Georgia” |
| **3** | Bainbridge / Albany + rural long-radius | “Full state box including SW corner” |

**Bench target (pilot):** ~80 active techs statewide (`minimumBenchTargets` in JSON) — see per-anchor `targetTechsMin`.

## Related docs

| Doc | Use |
|-----|-----|
| [`georgia-partner-acquisition-by-region.md`](./georgia-partner-acquisition-by-region.md) | Partner pitch by anchor |
| [`../01-business-plan/georgia-rollout-strategy.md`](../01-business-plan/georgia-rollout-strategy.md) | Investor / plan narrative |
| [`../06-partner-operations/georgia-dispatch-corridors.md`](../06-partner-operations/georgia-dispatch-corridors.md) | Ops + SLA realism |
| [`../website/recruit/georgia-anchor-recruitment.md`](../website/recruit/georgia-anchor-recruitment.md) | Recruit playbook per city |
| [`tech-recruitment-georgia.md`](./tech-recruitment-georgia.md) | Channel mix statewide |

## Maintaining the map

1. Edit `data/georgia-coverage.json`.
2. Regenerate website JS:
   ```bash
   node -e "const fs=require('fs');const p='.';const d=JSON.parse(fs.readFileSync('data/georgia-coverage.json','utf8'));fs.writeFileSync('website/georgia-coverage-data.js','/** sync with data/georgia-coverage.json */\\nwindow.LETA_GEORGIA_COVERAGE = '+JSON.stringify(d,null,2)+';\\n');"
   ```
3. Update `contact-config.js` `recruitMetros` / `recruitRegions` if marketing one-liners change.
4. Sync `app/src/constants/georgiaAnchors.js` if app selectors change.
