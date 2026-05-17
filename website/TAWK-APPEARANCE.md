# Tawk — Leta-only colors (blue & white)

Use **only** these colors in the Tawk dashboard so the chat matches [leta.repair](https://leta.repair). Do not use Tawk’s default green, orange, or custom hex outside this list.

The site also applies the same palette via `leta-tawk-theme.js` when the chat iframe allows it.

## Steps

1. [dashboard.tawk.to](https://dashboard.tawk.to) → **Administration** → **Chat Widget**
2. **Widget Appearance** → **Advanced**
3. Set **every** color field to a value below (header, body, agent, visitor, buttons, pre-chat cards).
4. **Widget Content** → for Online / Away / Offline cards: use **Heading** + **Text** only; set card backgrounds to white or `#eef3f9`, not green.
5. **Widget Behavior** → **Hide widget on load** (desktop + mobile).
6. **Save** / publish.

## Allowed palette (light — primary)

| Role | Hex | Use for |
|------|-----|---------|
| Page background | `#eef3f9` | Chat body, away/offline card backgrounds |
| Surface | `#ffffff` | Visitor bubbles, input area, cards |
| Text | `#0f172a` | Message text, labels |
| Muted text | `#475569` | Secondary labels |
| Accent / header | `#2563eb` | Header bar, send button, links, badges |
| Accent gradient end | `#1d4ed8` | Header gradient (with `#3b82f6`) |
| Accent light | `#3b82f6` | Header gradient start |
| Agent bubble | `#eff6ff` | Operator/agent messages |
| Border | `#bfdbfe` | Inputs, agent bubble border |
| Soft border | `#e2e8f0` | Visitor bubble border |
| On accent | `#ffffff` | Header text, button labels |

**Do not use:** Tawk green (`#03A84E`), orange status chips, or any color not in this table.

## Dark mode (if enabled in Tawk)

| Role | Hex |
|------|-----|
| Background | `#0b1020` |
| Surface | `#121a2e` |
| Text | `#f1f5f9` |
| Accent | `#60a5fa` / `#2563eb` buttons |
| Agent bubble | `rgba(37, 99, 235, 0.22)` |

## “Powered by tawk”

The site hides this with CSS/JS when possible (`leta-tawk-theme.js`). If it still appears, Tawk may be blocking iframe styling — the official option is the [Remove Branding add-on](https://help.tawk.to/article/purchasing-the-remove-branding-and-white-label-add-on) (~$29/mo billed annually).

## Quick checklist

- [ ] Header background → `#2563eb` (or gradient with `#3b82f6` / `#1d4ed8`)
- [ ] Header text → `#ffffff`
- [ ] Chat background → `#eef3f9`
- [ ] Agent message → bg `#eff6ff`, text `#0f172a`
- [ ] Visitor message → bg `#ffffff`, text `#0f172a`
- [ ] Send button → `#2563eb`, text `#ffffff`
- [ ] No green/orange anywhere in Appearance or Content cards
