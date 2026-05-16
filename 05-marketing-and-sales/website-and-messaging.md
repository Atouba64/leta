# Public website — strategy & messaging (Leta)

Leta will ship a **simple, credible marketing site** that speaks clearly to **two primary audiences**: **B2B fulfillment partners** and **B2B/B2C customers** who need on-site IT. The **mobile apps** remain the operational product; the website’s job is **trust, clarity, and routing** (contact, partner inquiry, customer “get a tech” CTA linking to app store listings when live).

## Positioning line (working)

**“Leta — IT service on demand. Georgia first.”**

Elevator: *DoorDash-style clarity for ordering and tracking **professional field IT**—with a partner channel so established service companies can fulfill more of their own work orders.*

## Site map (MVP)

| Page / section | Audience | Goal |
|----------------|----------|------|
| **Home** | All | Explain Leta in 10 seconds; three-way win; Georgia focus. |
| **Partners** | Dispatch companies, MSPs, national/regional IT service orgs | Fulfillment capacity, transparency app, coopetition narrative; “Request a partnership conversation.” |
| **Customers** | SMBs, enterprises with branch IT, prosumers | On-demand onsite IT, speed, qualified techs; link to app / waitlist. |
| **Technicians** | 1099 field pros | Income opportunity, how offers work, payouts, Georgia coverage; link to apply / app. |
| **Contact / About** | All | Founder story (field experience), compliance note, contact. |

Single-page layout with anchor navigation is acceptable for v1 (see [`../website/`](../website/) static implementation).

## Hosting (GitHub Pages — leta.repair)

Production is **GitHub Pages** only: push to `main` runs [`.github/workflows/deploy-website.yml`](../.github/workflows/deploy-website.yml), which publishes the [`website/`](../website/) folder. **Do not connect this repo to Netlify**—that causes duplicate deploys and can incur Netlify usage charges.

Operational details, DNS, and how to turn off Netlify: [`../website/HOSTING.md`](../website/HOSTING.md).

## Copy pillars

1. **Fulfillment, not rivalry** — We help partners **complete** work they already won.  
2. **Transparency** — Partners and customers see what they need to see (within contract).  
3. **Liquidity** — Combined partner + direct demand improves **tech utilization**.  
4. **Georgia depth** — Statewide network story (cities and radius-based coverage).

## Trust & compliance (surface on site)

- Insurance and vetting are part of the program (details in app/onboarding; see [`../04-legal-and-compliance/`](../04-legal-and-compliance/)).  
- No exaggerated guarantees; use “we’re building toward” language until metrics are public.

## Analytics (when live)

- Separate CTAs for **Partner lead** vs **Customer app install** vs **Tech apply** for conversion tracking.

## Related

- [`partner-channel-win-win.md`](./partner-channel-win-win.md)
