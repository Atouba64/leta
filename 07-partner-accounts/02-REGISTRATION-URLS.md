# Leta Tech — Platform Registration Tracker

Master list of platforms where Leta Tech can register as a partner, approved vendor, or service company.

> **Canonical live tracker:** edit [`data/partner-platform-tracker.json`](../data/partner-platform-tracker.json) → run `node scripts/sync-partner-tracker.js` → view at [leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html). How-to: [`05-TRACKER-HOW-TO-UPDATE.md`](./05-TRACKER-HOW-TO-UPDATE.md).

**Related docs**
- Channel targets overview: [`01-PLATFORM-AND-CHANNEL-TARGETS.md`](./01-PLATFORM-AND-CHANNEL-TARGETS.md)
- Master vendor packet checklist: [`../06-partner-operations/vendor-registration/01-MASTER-VENDOR-PACKET-CHECKLIST.md`](../06-partner-operations/vendor-registration/01-MASTER-VENDOR-PACKET-CHECKLIST.md)
- Partner acquisition playbook: [`00-LETA-PARTNER-ACQUISITION-PLAYBOOK.md`](./00-LETA-PARTNER-ACQUISITION-PLAYBOOK.md)

## How to use this tracker

| Column | Meaning |
|--------|---------|
| **Type** | `Self-serve` · `Invite` · `Apply` · `Prime path` |
| **Status** | `Not started` · `In progress` · `Applied` · `Invite pending` · `Approved` · `Active` · `Rejected` |
| **Date applied** | Date Leta submitted registration or partner inquiry |
| **COI uploaded** | `Yes` / `No` / `N/A` — Certificate of Insurance submitted with application |
| **Owner** | Who on the Leta team owns this registration |
| **Notes** | Invitation source, blocker, next step |

**Registration types**
- **Self-serve** — create an account directly at the URL
- **Invite** — a buyer/client must invite Leta first; have vendor packet ready
- **Apply** — contact form, demo request, or partner application
- **Prime path** — subcontract through companies already on the platform (not a direct Leta portal)

---

## Priority queue (recommended order)

| Priority | Platform | Why |
|----------|----------|-----|
| 1 | Team Georgia Marketplace | Home-state public sector; stable contracts |
| 2 | ATLSuppliers.com | Atlanta metro municipal work |
| 3 | SAM.gov | Required baseline for all federal subcontracting |
| 4 | Field Nation (Service Company) | Fastest IT field-service volume |
| 5 | CloudWork\|PRO | IT-only marketplace; zero platform payout fees |
| 6 | Beeline Supplier Network | Enterprise VMS overflow |
| 7 | Coupa + Ariba | Corporate procurement / invoice rails |
| 8 | Source Support Services (Techworks) | HQ in Lawrenceville, GA |
| 9 | Spencer Technologies (SCP) | Retail POS volume |
| 10 | ServiceChannel + Corrigo | Enterprise CMMS (invite-driven) |

---

## 1. Enterprise CMMS & facility management

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| ServiceChannel | https://servicechannel.com/services-providers/trade-partner-guide/ | Invite | Not started | | No | | Client invitation or contact via servicechannel.com |
| Corrigo / CorrigoPro (JLL) | https://corrigopro.com/contactus | Invite | Not started | | No | | Invitation from connect@corrigo.com |
| fmPilot / FacilitySource (CBRE) | https://www.cbre.com/services/transform-facilities-management-with-technology | Apply | Not started | | No | | Enterprise vendor onboarding via CBRE |
| Verisae (Accruent) | https://www.accruent.com/solutions/verisae | Apply | Not started | | No | | Service provider onboarding |
| Fexa (provider network) | https://info.fexa.io/lp/fexa-request-a-demo | Apply | Not started | | No | | Select "For Service Providers" |
| Fexa Link | https://info.fexa.io/lp/fexa-link-request-a-demo | Apply | Not started | | No | | Provider waitlist / demo |

---

## 2. Corporate VMS & procurement

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| SAP Fieldglass | https://userapps.support.sap.com/sap/support/knowledge/en/3651629 | Invite | Not started | | No | | Buyer sends registration link; prep vendor packet |
| Beeline Supplier Network | https://bsn.beeline.com/ | Self-serve | Not started | | No | | "Get Started Today" form at bottom of docs |
| SAP Ariba / Business Network | https://supplier.ariba.com/ | Self-serve | Not started | | No | | Register Now for standard supplier account |
| Coupa Supplier Portal | https://supplier.coupahost.com/ | Self-serve | Not started | | No | | Self-register or customer invitation |
| Magnit (PRO Unlimited) | https://magnitglobal.com/us/en/partners/supplier-network.html | Apply | Not started | | No | | Complete Supplier Company Profile |
| Magnit supplier login | https://prowand.pro-unlimited.com/supplier/standard/client/geninfo.html | — | Not started | | N/A | | Login portal after approval |

---

## 3. IT field service marketplaces

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| Field Nation (Service Company) | https://fieldnation.com/signup/plus | Self-serve | In progress | 2026-06-16 | No | | Company profile created; pending account information completion (Tier 1 outstanding) |
| Field Nation (provider) | https://fieldnation.com/technician-signup/form | Self-serve | Not started | | No | | Individual tech signup |
| WorkMarket (contractors) | https://www.workmarket.com/contractors/join-workmarket | Self-serve | Not started | | No | | Contractor account |
| WorkMarket (business) | https://www.adp.com/what-we-offer/products/workmarket.aspx | Apply | Not started | | No | | Request demo as dispatch company |
| CloudWork\|PRO | https://cloudworkpro.com/independent-technicians/ | Self-serve | Not started | | No | | Get Started; GL insurance required |
| CloudWork\|PRO signup guide | https://support.cloudworkpro.com/support/solutions/articles/73000532105-signing-up-with-cloudwork-pro | Self-serve | Not started | | No | | Support article |
| Tech-Connect | https://www.tech-connect.com/ | Apply | Not started | | No | | Contact for provider onboarding |

---

## 4. National MSPs & deployment aggregators

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| Source Support Services (Techworks) | https://sourcesupport.com/source-techworks/ | Apply | Not started | | No | | HQ Lawrenceville, GA — priority local target |
| Source Support (general) | https://sourcesupport.com/ | Apply | Not started | | No | | Partner inquiry |
| TechLink Services | https://techlinkservices.com/ | Apply | Not started | | No | | National deployments, smart lockers |
| CompuCom | https://www.compucom.com/solutions/staffing/ | Apply | Not started | | No | | Atlanta footprint; staffing/subcontract |
| Telaid Industries | https://www.telaid.com/ | Apply | Not started | | No | | CCTV, access control, deployments |
| Kinettix | https://www.kinettix.com/ | Apply | Not started | | No | | Global field coordination |
| Spencer Technologies (SCP) | https://www.spencertech.com/about/our-techs/ | Apply | Not started | | No | | Spencer Certified Partner application |
| Essintial Enterprise Solutions | https://essintial.com/vendor-partners/ | Apply | Not started | | No | | Vendor partner form |
| Pomeroy | https://www.pomeroy.com/ | Apply | Not started | | No | | Subcontractor outreach |
| Barrister Global Services | https://barrister.com/ | Apply | Not started | | No | | First partner target — see barrister-global-services/ |
| Bailiwick | https://www.gobailiwick.com/ | Apply | Not started | | No | | |
| Buchanan Technologies | https://www.buchanan.com/services/field-services/ | Apply | Not started | | No | | Regional field partner |
| Diebold Nixdorf (supplier info) | https://www.dieboldnixdorf.com/en-us/support/supplier-information/ | Apply | Not started | | No | | Oracle supplier onboarding |
| Diebold Nixdorf Oracle portal | https://eeug.login.us6.oraclecloud.com/ | — | Not started | | N/A | | Portal after supplier approval |
| Diebold Nixdorf partner program | https://www.dieboldnixdorf.com/en-us/partner-program/sign-up/ | Apply | Not started | | No | | Banking/retail terminal deployments |

---

## 5. Retail IT & POS rollout partners

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| Level 10 | https://www.level10.com/ | Apply | Not started | | No | | POS, RFID, retail rollouts |
| ServicePoint | https://servicepoint.com/services/retail-it-deployments/ | Apply | Not started | | No | | Multi-site retail deployments |
| HTG Inc. | https://www.htginc.com/retail-it-services/ | Apply | Not started | | No | | Retail IT lifecycle |
| Zones (rollouts) | https://www.zones.com/site/statics/static_page.html?name=it-lifecycle-services/it-rollout-services | Apply | Not started | | No | | White-glove rollouts |
| POSZEO | https://www.poszeo.com/service/deployment/ | Apply | Not started | | No | | POS hardware deployment |
| POSDATA | https://www.posdata.com/payments2/services/ | Apply | Not started | | No | | Staging, key injection, site install |
| NCR Voyix | https://www.ncrvoyix.com/ | Apply | Not started | | No | | Retail / POS partner network |

---

## 6. Government & education

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| Team Georgia Marketplace | https://fscm.teamworks.georgia.gov/psc/supp/SUPPLIER/ERP/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL | Self-serve | Not started | | No | | State supplier registration (NIGP codes) |
| Georgia DOAS supplier guide | https://www.doas.ga.gov/state-purchasing/supplier-registration-bid-notices | Self-serve | Not started | | No | | Registration instructions |
| SAM.gov | https://sam.gov/ | Self-serve | Not started | | No | | Required for federal entity registration |
| GSA MAS (eOffer) | https://eoffer.gsa.gov/ | Self-serve | Not started | | No | | Apply for GSA Multiple Award Schedule |
| GSA MAS roadmap | https://www.gsa.gov/sell-to-government/step-1-learn-about-government-contracting/how-to-access-contract-opportunities/help-with-mas-contracts-to-sell-to-government/roadmap-to-get-a-mas-contract | Self-serve | Not started | | No | | Process guide |
| GSA eLibrary | https://www.gsaelibrary.gsa.gov/ElibMain/home.do | Prime path | Not started | | N/A | | Find prime contractors to subcontract |
| Sourcewell vendor portal | https://proportal.sourcewell-mn.gov/ | Self-serve | Not started | | No | | Cooperative purchasing RFPs |
| Sourcewell vendor info | https://www.sourcewell-mn.gov/sourcewell-for-vendors | Self-serve | Not started | | No | | Vendor process overview |
| City of Atlanta (ATLSuppliers) | https://www.atlsuppliers.com/ | Self-serve | Not started | | No | | Municipal vendor registration |
| Hall County purchasing | https://www.hallcounty.org/403/Purchasing-Division | Apply | Not started | | No | | Bidder application for vendor list |
| Gainesville, GA bids | https://www.gainesville.org/194/Purchasing-Bid-Opportunities | Apply | Not started | | No | | Vendor packet (W-9) |
| University System of Georgia | https://www.usg.edu/procurement/ | Apply | Not started | | No | | Per-university procurement portals |
| USAC / E-Rate | https://www.usac.org/sl/ | Apply | Not started | | No | | K-12 infrastructure funding context |
| SAM.gov contract search | https://sam.gov/search/ | Prime path | Not started | | N/A | | Find DoD/VA primes for subcontracting |

---

## 7. Smart lockers & asset management

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| Luxer One Certified Partner | https://www.luxerone.com/luxer-one-certified-partner/ | Apply | Not started | | No | | Get Certified |
| Luxer One partner network | https://www.luxerone.com/about-our-team/partner-network/ | Apply | Not started | | No | | |
| Parcel Pending (Quadient) | https://www.parcelpending.com/ | Apply | Not started | | No | | Installer/partner inquiry |
| Modern Office Systems | https://modernofficesystems.com/lockers-nyc/ | Apply | Not started | | No | | Smart locker installs |
| Elite Storage Products | https://www.elitestorageproducts.com/about | Apply | Not started | | No | | National locker rollouts |
| TechLink (smart lockers) | https://techlinkservices.com/nationwide-smart-locker-installation/ | Apply | Not started | | No | | |

---

## 8. Commercial telematics & fleet GPS

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| Samsara Partner Program | https://www.partners-samsara.com/s/login/SelfRegister?language=en_US | Self-serve | Not started | | No | | Installation partner registration |
| Samsara partner resources | https://www.samsara.com/resources/partner-programs | Apply | Not started | | No | | |
| Samsara developer/integration | https://developers.samsara.com/me/docs/application-process | Apply | Not started | | No | | API integration partner |
| Radius Telematics | https://www.radius.com/en-us/partnerships/ | Apply | Not started | | No | | |
| Verizon Connect partner | https://www.verizonconnect.com/services/become-a-partner/ | Apply | Not started | | No | | |
| GPS Insight partner | https://www.gpsinsight.com/resources/become-a-partner/ | Apply | Not started | | No | | |
| Netradyne installation partners | https://www.netradyne.com/installation-partners/gps-tech | Apply | Not started | | No | | |

---

## 9. EV charging infrastructure

| Platform | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|----------|------------------|------|--------|--------------|--------------|-------|-------|
| Qmerit installer network | https://qmerit.com/ev-charging-stations-installer-network/ | Apply | Not started | | No | | Licensed electrician network |
| Qmerit contractors | https://qmerit.com/contractors/ | Apply | Not started | | No | | |
| Blink Charging installers | https://blinkcharging.com/resources/blink-installers | Apply | Not started | | No | | Installer resources |
| Blink commissioning | https://blinkcharging.com/resources/commissioning | Apply | Not started | | No | | Post-install commissioning form |
| Blink host/installer support | https://blinkcharging.com/getintouch/host-support | Apply | Not started | | No | | Contact for installer onboarding |

---

## 10. Georgia regional MSPs (subcontract / overflow)

| Company | Registration URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|---------|------------------|------|--------|--------------|--------------|-------|-------|
| Leapfrog Services | https://leapfrogservices.com/ | Apply | Not started | | No | | Atlanta MSP — smart hands pitch |
| MIS Solutions | https://www.mis-solutions.com/ | Apply | Not started | | No | | Metro Atlanta |
| VTC Tech | https://vtct.com/georgia/gainesville/ | Apply | Not started | | No | | Gainesville / Hall County |
| Navious Technologies | https://www.navious.com/ | Apply | Not started | | No | | Marietta / North GA |
| The 20 MSP (Atlanta) | https://www.the20msp.com/atlanta-managed-it-services/ | Apply | Not started | | No | | |
| Abel Solutions | https://www.abelsolutions.com/ | Apply | Not started | | No | | Alpharetta |
| AdvanTech Services | https://www.advantechservices.net/ | Apply | Not started | | No | | Middle Georgia |
| Integris | https://integrisit.com/ | Apply | Not started | | No | | |
| Granite Telecommunications | https://www.granitenet.com/ | Apply | Not started | | No | | |

---

## 11. Industry networking (demand channels, not portals)

| Event / channel | URL | Type | Status | Date applied | COI uploaded | Owner | Notes |
|-----------------|-----|------|--------|--------------|--------------|-------|-------|
| Channel Partners Conference | https://channelpartnersconference.com/ | — | Not started | | N/A | | Annual Las Vegas — MSP/networking |
| MSP Summit | https://channelpartnersconference.com/msp-summit/ | — | Not started | | N/A | | Co-located with Channel Partners |

---

## Registration summary (update as you go)

| Status | Count |
|--------|-------|
| Not started | — |
| In progress | — |
| Applied | — |
| Approved / Active | — |

*Last updated: 2026-06-16 — Field Nation profile created*
