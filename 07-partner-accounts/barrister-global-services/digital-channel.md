# Barrister digital channel (Leta)

## Public web

| Page | URL path |
|------|----------|
| Overview | `website/partners/barrister/index.html` |
| For field techs | `website/partners/barrister/for-techs.html` |
| Liaison model | `website/partners/barrister/liaison.html` |

Linked from `website/partners.html` → Partner channels.

## Leta Tech app

| Area | Code |
|------|------|
| Channel config | `app/src/constants/partnerChannels.js` |
| Demo offers / active job | `app/src/services/mockData.js` (`DEMO_BARRISTER_OFFERS`) |
| Dispatch filter + cards | `app/src/screens/technician/TechDispatch.js` |
| Offer detail | `app/src/screens/technician/TechPartnerOfferDetail.js` |
| Active (phone-first) | `app/src/screens/technician/TechPartnerActiveJob.js` |

**Demo flow:** Dispatch → toggle Partner dispatch → open Barrister offer → Accept → Active tab.

## OpenClaw (Ubuntu only)

Portable pack: `integrations/openclaw/` — install on Ubuntu, not Mac. See `integrations/openclaw/README.md`.

**Cursor handoff (caveats + context):** `docs/cursor-handoff/2026-05-23-barrister-openclaw-caveats.md`

## Operating principle

**Phase 1:** Accommodate email + phone. **Phase 3:** Platform-native WOs. Leta is liaison throughout.
