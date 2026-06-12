# Leta brand assets (print & merchandise)

High-resolution vectors for **t-shirts, flags, banners, stickers, and pitch decks**. Concept: **“Signal at the edge”** — field pin with gear (operations), house (onsite), and circuit motifs (connected field + remote support).

Website runtime files stay in [`../website/`](../website/) (`logo-icon.svg`, `favicon.svg`). Use this folder for anything physical or large-format.

## Files

| File | Use |
|------|-----|
| [`logo-mark-color.svg`](./logo-mark-color.svg) | Primary mark, brand blue `#2563eb` on light backgrounds |
| [`logo-mark-white.svg`](./logo-mark-white.svg) | Mark on navy/dark fabric or flags |
| [`logo-mark-black.svg`](./logo-mark-black.svg) | Single-color embroidery, vinyl, laser cut |
| [`logo-lockup-horizontal-color.svg`](./logo-lockup-horizontal-color.svg) | Mark + **Leta.** for chest prints, signage |
| [`logo-lockup-horizontal-white.svg`](./logo-lockup-horizontal-white.svg) | Lockup on dark backgrounds |
| [`png/logo-mark-color-4096.png`](./png/logo-mark-color-4096.png) | Mark, blue — **4096 px** (large flags, back prints) |
| [`png/logo-mark-color-2048.png`](./png/logo-mark-color-2048.png) | Mark, blue — 2048 px |
| [`png/logo-mark-color-1024.png`](./png/logo-mark-color-1024.png) | Mark, blue — 1024 px |
| [`png/logo-mark-white-2048.png`](./png/logo-mark-white-2048.png) | Mark, white — dark fabric / flags |
| [`png/logo-mark-black-1024.png`](./png/logo-mark-black-1024.png) | Mark, black — single-color print |
| [`png/logo-lockup-horizontal-color-4096.png`](./png/logo-lockup-horizontal-color-4096.png) | Lockup — wide banners |
| [`png/logo-lockup-horizontal-white-2048.png`](./png/logo-lockup-horizontal-white-2048.png) | Lockup — on dark backgrounds |

## Colors

| Name | Hex | Use |
|------|-----|-----|
| Leta blue | `#2563eb` | Mark, period |
| Ink | `#0f172a` | Wordmark on light |
| White | `#ffffff` | Mark/wordmark on dark |

## Print tips

- **Vector first:** Send `.svg` to the printer when possible; default artboard hint is **512×512** (mark) or **3600×800** (lockup)—SVG scales to any size.
- **Convert text to outlines** in Illustrator/Inkscape before final print if the vendor does not bundle Plus Jakarta Sans.
- **Clear space:** Keep padding ≥ height of the mark on all sides.
- **Minimum size:** Mark legible at **≥ 12 mm** wide on apparel.

## Regenerating PNGs

```bash
rsvg-convert -w 2048 brand/logo-mark-color.svg -o brand/png/logo-mark-color-2048.png
rsvg-convert -w 4096 brand/logo-mark-color.svg -o brand/png/logo-mark-color-4096.png
```

See also [`../website/BRAND.md`](../website/BRAND.md).
