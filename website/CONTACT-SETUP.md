# Contact form setup (Netlify — free)

The site uses **Netlify Forms** on the Contact page. No paid form SaaS required on the Starter plan.

## After deploy

1. Open [Netlify → leta-tech → Forms](https://app.netlify.com/projects/leta-tech/forms).
2. Confirm a form named **`contact`** appears (submit a test message once if needed).
3. **Form notifications → Add notification → Email** — route submissions to your team inbox (e.g. `hello@leta.repair`).

## Placeholder emails

Edit [`contact-config.js`](./contact-config.js):

- `generalEmail` — default inbox
- `partnersEmail` — partner / MSP threads
- `techniciansEmail` — field tech onboarding (used in copy as needed)
- `calendlyUrl` — optional; when set, a “Book a call” card appears on Contact

Point DNS/email at your registrar so `@leta.repair` mailboxes exist (Google Workspace, Zoho free tier, Cloudflare Email Routing, etc.).

## Leta Guide (automated assistant)

[`leta-assistant.js`](./leta-assistant.js) is a **rule-based** bot (no API keys, no monthly AI bill). It answers FAQs and links to the contact form. Loaded on every page.

## Optional upgrades (still free tiers)

| Tool | Use |
|------|-----|
| [Calendly](https://calendly.com) | 15-min intro calls — set `calendlyUrl` in config |
| [Tawk.to](https://www.tawk.to) | Live chat if you later want humans online — not included by default |

## GitHub

The repo remains public documentation—not the customer contact channel. Footer links say **Company docs on GitHub**.
