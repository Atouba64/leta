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
| App documentation | [`02-app-documentation/`](./02-app-documentation/) *(includes [`partner-portal/`](./02-app-documentation/partner-portal/user-stories.md))* |
| Research & ideas | [`03-research-and-ideas/`](./03-research-and-ideas/) |
| Legal & compliance | [`04-legal-and-compliance/`](./04-legal-and-compliance/) *(outline only—engage counsel before use)* |
| Marketing & sales | [`05-marketing-and-sales/`](./05-marketing-and-sales/) *(partner win-win + website messaging)* |

## Engineering (when code lands)

Application source, infrastructure-as-code, and CI will live alongside this documentation as the implementation phase starts (for example `apps/`, `services/`, or `packages/`). Until then, treat this tree as the **single source of truth** for product and operations intent.

## Contributing

Issues and PRs are welcome. For large doc restructures or new legal language, use PRs so changes stay reviewable.

## Maintainer

[@Atouba64](https://github.com/Atouba64)

## License

No `LICENSE` file is committed yet. Add one before redistributing code or inviting contributions you intend to treat as open source.
