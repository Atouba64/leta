# Tech recruitment & skill-tier matching

How Leta builds the bench partners rely on — and how partners get **economy** or **specialist** techs per ticket.

## Partner value prop

| Need | Leta approach |
|------|----------------|
| **Lower cost / volume break-fix** | Marketplace surfaces motivated generalists, students, and side-hustle techs with transparent pay floors and distance filters |
| **Specialist on a scoped WO** | Tag `skillsRequired` on the ticket; techs who **broadcast** Cradlepoint, POS, Cisco, etc. on their profile rise in routing |
| **Less ops relay** | Techs and partners coordinate on-platform; profiles + filters reduce “send anyone” black holes |

We recruit with **modern channels** (short-form video, text/call, campus QR, gig boards) and a **freelancer-grade application** — not legacy PDF portals.

## Tech experience (mirrors Upwork / Field Nation)

1. **Apply** — [`website/tech-onboarding.html`](../website/tech-onboarding.html) (6 steps: contact, readiness, skills, marketplace profile, 1099, motivation)
2. **Profile** — Leta Tech app → Marketplace profile (headline, bio, skills + proficiency, highlights, travel radius, min payout)
3. **Dispatch** — Filter/sort offers by distance, pay, “my skills”; accept only what fits

## Data model

`users/{uid}.techProfile` — see [`../docs/FIRESTORE_SCHEMA.md`](../docs/FIRESTORE_SCHEMA.md)

## Routing (v1 → v2)

- **v1 (now):** Human dispatch + partner tags skills on WO; tech filters in app
- **v2:** Auto-rank offers by skill overlap, distance, rating, partner preferred pool

## Related

- [`platform-comms-and-incentives.md`](./platform-comms-and-incentives.md)
- [`../website/partners.html`](../website/partners.html)
- [`../website/technicians.html`](../website/technicians.html)
