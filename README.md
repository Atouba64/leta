# Leta

**Leta** is a centralized, geo-aware mobile and web platform for the full lifecycle of IT field service—from partner and customer demand through dispatch, onsite execution, remote escalation when needed, and payout. Think **on-demand logistics for professional IT**, **Georgia first**, with a deliberate **fulfillment partner** channel so established service companies can cover more work orders without hiring a W-2 bench in every market.

**Repository:** [github.com/Atouba64/leta](https://github.com/Atouba64/leta)

> **Note:** All product and documentation naming in this repository use **Leta** (a prior working title has been fully retired).

## Problem (why Leta exists)

- **Customers** rarely get reliable ETAs or live status; they live in phone trees and email threads.
- **Field technicians** need more consistent work and better tools; legacy dispatch flows and slow payouts hurt retention.
- **Fulfillment partners** (national/regional field IT and dispatch orgs) often have **large client databases** but **not enough onsite techs** in every Georgia radius to meet SLAs.
- **Remote technicians** lack a clean path to join a live job when the field tech needs “overwatch” support.

## Solution (what Leta delivers)

One platform that connects:

| Audience | Value |
|----------|--------|
| **Fulfillment partners** (e.g. Barrister-class networks) | **Capacity + transparency**: help fulfill **their** work orders in Georgia with geo-aware matching and a partner-visible execution layer—**co-strengthening**, not channel warfare ([`05-marketing-and-sales/partner-channel-win-win.md`](./05-marketing-and-sales/partner-channel-win-win.md)). |
| **Customers (B2B & B2C)** | Order onsite IT like modern on-demand services: **clear status**, professional close-out, and fair economics as the network matures. |
| **Field techs** | **Active** workflow, combined **partner + direct** demand for more offers, **faster payouts**, and escalation to remote experts when jobs get hard. |
| **Remote techs (“Overwatch”)** | Web portal with **Escalate** → live **video/audio** to lift first-time fix rate. |
| **Investors / operators** | **Asset-light** model: 1099 field network + cloud software; **Georgia-first** rollout for QA before scaling geography. |

## Public website

Static marketing pages live in [`website/`](./website/). Edit locally, preview `website/index.html`, then **push to `main`**—**Netlify** (Starter / free plan) deploys automatically via [`netlify.toml`](./netlify.toml) (`publish = "website"`).

**Live site:** [leta.repair](https://leta.repair). Deploy settings and avoiding paid usage: [`website/HOSTING.md`](./website/HOSTING.md).

## Documentation map (start here)

This repo is organized like an internal company handbook plus product specs. Work in batches; recommended order is **business plan first** (north star), then **app documentation** (software behavior).

| Area | Path |
|------|------|
| Business plan | [`01-business-plan/`](./01-business-plan/) |
| App documentation | [`02-app-documentation/`](./02-app-documentation/) *(includes [`partner-portal/`](./02-app-documentation/partner-portal/))* |
| Research & ideas | [`03-research-and-ideas/`](./03-research-and-ideas/) |
| Legal & compliance | [`04-legal-and-compliance/`](./04-legal-and-compliance/) *(outline only—engage counsel before use)* |
| Marketing & sales | [`05-marketing-and-sales/`](./05-marketing-and-sales/) *(partner win-win + website messaging)* |
| Partner operations | [`06-partner-operations/`](./06-partner-operations/) *(onboarding, GUS tickets, billing, comms)* |
| Partner accounts (Barrister, etc.) | [`07-partner-accounts/`](./07-partner-accounts/) *(outreach, call scripts, pilots)* |
| Brand assets (print / merch) | [`brand/`](./brand/) *(logo SVG + PNG for shirts, flags, signage)* |
| Strategic architecture (long-form) | [`docs/`](./docs/) *(competitor forensics, microservices, dispatch, Leta Advantage)* |

## Mobile app

**React Native + Expo** in [`app/`](./app/README.md) — Firestore (`users`, `tickets`, `offers`), Auth custom claims, Maps, Storage, Stripe, and **Leta Live** (WebRTC + signaling).

```bash
npm run install:app
npm start                 # from repo root — runs Expo dev client in app/
# or: cd app && npm run start:dev
```

## Backend (Firebase)

| Piece | Location |
|-------|----------|
| Firestore rules & indexes | [`firestore.rules`](./firestore.rules), [`firestore.indexes.json`](./firestore.indexes.json) |
| Storage rules | [`storage.rules`](./storage.rules) |
| Cloud Functions | [`functions/`](./functions/README.md) — Stripe, offers, live sessions, role claims |
| Schema reference | [`docs/FIRESTORE_SCHEMA.md`](./docs/FIRESTORE_SCHEMA.md) |

```bash
firebase deploy --only firestore,storage,functions
```

## Engineering (next)

Partner web portal, production WebRTC (Chime/Twilio SFU), and offline-first sync per **docs/technical_architecture/**.

## Contributing

Issues and PRs are welcome. For large doc restructures or new legal language, use PRs so changes stay reviewable.

## Maintainer

[@Atouba64](https://github.com/Atouba64)

## License

No `LICENSE` file is committed yet. Add one before redistributing code or inviting contributions you intend to treat as open source.
