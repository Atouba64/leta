# Leta brand assets

## Logo concept: “Signal at the edge”

The mark is an **engineered map pin** (onsite field presence) with a **bridge** to a **satellite node** (remote expert / partner visibility on the same ticket). It reads at favicon size and supports light/dark via CSS `mask` + `var(--accent)`.

## Files

| File | Use |
|------|-----|
| `logo-icon.svg` | Header mark (black shapes for `mask-image`) |
| `favicon.svg` | Browser tab (blue tile, white mark) |

**Print, apparel, flags:** [`../brand/`](../brand/) — full-color SVG + PNG up to 4096px.

**Contact & forms:** [`CONTACT-SETUP.md`](./CONTACT-SETUP.md) — Netlify Forms + Leta Guide assistant.

## Header usage

```html
<span class="logo-icon" aria-hidden="true"></span>
<span class="logo-mark">Leta<span class="dot">.</span></span>
```

Styles: `.logo-icon` in `styles.css` (accent-colored mask).

## Color

- Primary: `#2563eb` (`--accent`)
- Wordmark period uses `.dot` → `var(--accent)`
