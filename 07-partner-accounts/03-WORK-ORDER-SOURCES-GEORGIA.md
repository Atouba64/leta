# Work order sources — Georgia & Leta service fit

Master index of **where Leta Tech can receive work orders** in Georgia: bid sites, procurement portals, marketplaces, aggregators, and direct partner overflow. All channels should map to services Leta actually fulfills.

**Canonical live tracker:** [leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html) (reads `data/partner-platform-tracker.json`)

**Related**
- Registration URLs (markdown mirror): [`02-REGISTRATION-URLS.md`](./02-REGISTRATION-URLS.md)
- Channel strategy: [`01-PLATFORM-AND-CHANNEL-TARGETS.md`](./01-PLATFORM-AND-CHANNEL-TARGETS.md)
- Partner outreach program: [`partners-reach/`](./partners-reach/)
- Vendor packet: [`../06-partner-operations/vendor-registration/01-MASTER-VENDOR-PACKET-CHECKLIST.md`](../06-partner-operations/vendor-registration/01-MASTER-VENDOR-PACKET-CHECKLIST.md)

---

## Leta services (what we accept)

| Code | What it covers |
|------|----------------|
| `break_fix` | Onsite break/fix, deskside, router/switch, peripherals |
| `pos_rollout` | POS install/swap, retail lane work, payment terminals |
| `networking` | Cabling, Wi-Fi AP, switch/router, structured cabling |
| `cabling` | Low-voltage, rack work, patch panels |
| `smart_hands` | Remote-guided physical tasks, rack-and-stack, smart hands |
| `digital_signage` | Display install, media players |
| `cctv_access` | Cameras, access control, physical security IT |
| `sd_wan` | Edge devices, Cradlepoint-class, WAN edge |
| `smart_lockers` | Package locker install and commissioning |
| `telematics_install` | Fleet GPS, dash cams, ELD hardware |
| `ev_charger` | EV charger install (licensed electrician tier) |
| `k12_higher_ed` | Campus device rollout, classroom AV, Wi-Fi |
| `government_onsite` | State/local/federal subcontract onsite IT |

**Georgia scope:** eighteen anchor markets + interstate corridors — see [`../data/georgia-coverage.json`](../data/georgia-coverage.json).

---

## 1. Work order bid sites & marketplaces (fastest volume)

Direct signup; work orders posted by buyers. **Priority for immediate WOs.**

| Platform | URL | Leta services | Notes |
|----------|-----|---------------|-------|
| **Field Nation** (service company) | https://fieldnation.com/signup/plus | break_fix, POS, networking, signage | **In progress** — profile created; account completion pending |
| Field Nation (individual tech) | https://fieldnation.com/technician-signup/form | break_fix, POS | Per-tech path |
| **CloudWork\|PRO** | https://cloudworkpro.com/independent-technicians/ | break_fix, POS, networking | IT-only; GL required |
| **WorkMarket** (contractors) | https://www.workmarket.com/contractors/join-workmarket | break_fix, smart_hands | ADP Labor Cloud |
| WorkMarket (business) | https://www.adp.com/what-we-offer/products/workmarket.aspx | break_fix | Dispatch company demo |
| Tech-Connect | https://www.tech-connect.com/ | break_fix, networking | Apply for provider onboarding |

---

## 2. Corporate VMS & procurement (invoice rails + enterprise WOs)

Often **invite-driven**; required to get paid by Fortune 500 / healthcare / telecom buyers.

| Platform | URL | Leta services |
|----------|-----|---------------|
| **Beeline Supplier Network** | https://bsn.beeline.com/ | smart_hands, networking |
| **SAP Ariba** | https://supplier.ariba.com/ | break_fix, networking |
| **Coupa Supplier Portal** | https://supplier.coupahost.com/ | break_fix, government |
| SAP Fieldglass | (buyer invite) | smart_hands, rollouts |
| Magnit (PRO Unlimited) | https://magnitglobal.com/us/en/partners/supplier-network.html | contingent labor |

---

## 3. Enterprise CMMS (multi-site retail / CRE)

Buyers route **approved vendor** WOs for stores, restaurants, offices.

| Platform | URL | Leta services |
|----------|-----|---------------|
| ServiceChannel | https://servicechannel.com/ | break_fix, POS, networking |
| Corrigo / CorrigoPro | https://corrigopro.com/ | break_fix, CCTV |
| fmPilot / FacilitySource (CBRE) | CBRE vendor onboarding | break_fix |
| Verisae (Accruent) | https://www.accruent.com/solutions/verisae | break_fix, c-store |
| Fexa / Fexa Link | https://info.fexa.io/ | break_fix |

---

## 4. Government & public sector (Georgia-first)

| Platform | URL | Leta services |
|----------|-----|---------------|
| **Team Georgia Marketplace** | https://fscm.teamworks.georgia.gov/... | government, K-12/higher ed |
| **ATLSuppliers** | https://www.atlsuppliers.com/ | government onsite |
| **SAM.gov** | https://sam.gov/ | federal subcontract baseline |
| Georgia DOAS | https://www.doas.ga.gov/state-purchasing/supplier-registration-bid-notices | state bids |
| GSA MAS (eOffer) | https://eoffer.gsa.gov/ | federal IT schedule |
| Sourcewell | https://www.sourcewell-mn.gov/ | cooperative purchasing |
| Hall County / Gainesville bids | County portals | municipal |
| USG procurement | https://www.usg.edu/procurement/ | universities |
| USAC E-Rate | https://www.usac.org/sl/ | K-12 infrastructure context |

---

## 5. National aggregators & MSPs (overflow / subcontract)

**Partner reach** — they hold national contracts; Leta is Georgia execution.

See [`04-PARTNER-REACH-MASTER-LIST.md`](./04-PARTNER-REACH-MASTER-LIST.md) and per-account folders under `07-partner-accounts/<slug>/`.

| Partner | HQ / GA relevance | Leta services |
|---------|-------------------|---------------|
| Barrister Global Services | National; GA wedge pilot | break_fix, POS |
| Source Support (Techworks) | Lawrenceville, GA | smart_hands, DC |
| Spencer Technologies | Retail POS volume | POS, signage |
| NCR Voyix | Atlanta HQ | POS, retail |
| Kinettix, TechLink, CompuCom, Telaid, Essintial, Pomeroy, Bailiwick | National | rollouts, smart hands |
| Leapfrog, Integris, MIS, VTC, Navious, Abel, AdvanTech, Granite | Georgia MSPs | smart hands |

---

## 6. Specialty channels (Leta expansion)

| Channel | Examples | Leta services |
|---------|----------|---------------|
| Retail / POS rollouts | Level 10, ServicePoint, HTG, Zones, POSZEO | pos_rollout |
| Smart lockers | Luxer One, Parcel Pending | smart_lockers |
| Telematics | Samsara, Verizon Connect, GPS Insight | telematics_install |
| EV charging | Qmerit, Blink | ev_charger |

---

## 7. How channels connect to product

Ticket `sourceSystem` values and partner channel configs: [`../app/src/constants/partnerChannels.js`](../app/src/constants/partnerChannels.js), [`../docs/FIRESTORE_SCHEMA.md`](../docs/FIRESTORE_SCHEMA.md).

---

*For status, dates, COI, and owners — use the [ops tracker](https://leta.repair/ops-tracker.html) or edit `data/partner-platform-tracker.json`.*
