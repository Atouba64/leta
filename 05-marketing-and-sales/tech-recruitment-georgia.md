# Tech recruitment — Georgia statewide

**North star:** A deep, reliable 1099 bench in **every corner of Georgia**, not only metro Atlanta.

## Who we recruit (four personas)

| Persona | Where | Channel emphasis |
|---------|-------|------------------|
| Campus & side-hustle | College towns + ATL | TikTok, campus QR |
| Gig & field veteran | Metros, Macon, Augusta, Columbus | Facebook gig groups |
| Rural & small-town | South/North GA | County Facebook, barber QR |
| Career switcher | Statewide | Low-budget FB/Indeed → web apply |

Detail: [`website/recruit/tech-personas.md`](../website/recruit/tech-personas.md)

## Affordable channel mix (pilot)

1. **Google Voice** — 30-second intro (free, highest trust)
2. **Organic TikTok/Reels** — phone-shot POV (time only)
3. **Facebook local + gig groups** — long posts with text or call link
4. **Hyper-local Meta ads** — $5–15/day per cluster when organic wins
5. **Referrals** — after ~20 active techs (`referralBonusDisplay` in `contact-config.js`)

Full calendar, geo clusters, and metrics: [`website/recruit/social-media-strategy.md`](../website/recruit/social-media-strategy.md)

## Funnel (implemented)

```
Social / flyer / app
  → technicians.html#join OR tech-onboarding.html
      → text intro (optional speed) + full web form (required for dispatch in app)
          → Human screen (1–2 business days)
              → Active in app
```

Operator scripts: [`website/recruit/RECRUIT-PLAYBOOK.md`](../website/recruit/RECRUIT-PLAYBOOK.md)

## Config to maintain

- `website/contact-config.js` — `phone`, `recruitSmsMessage`, `recruitMetros`, `recruitRegions`
- Netlify form → `techs@leta.repair`
- Bio links → `https://leta.repair/technicians.html#join`

## Related

- [`tech-onboarding-funnel.md`](./tech-onboarding-funnel.md) — Vetting & retention after signup
- [`../website/recruit/`](../website/recruit/) — Captions, video scripts, phone templates
