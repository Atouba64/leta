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

## Allowed palette (light — primary) — readability first

Use **dark text on light backgrounds** everywhere except the blue header and send button.

| Role | Hex | Use for |
|------|-----|---------|
| Page background | `#eef3f9` | Chat body |
| Surface | `#ffffff` | Visitor bubbles, input field |
| **Message text** | **`#0f172a`** | **All chat messages (required)** |
| Muted / placeholder | `#475569` | Timestamps, placeholders |
| Header background | `#2563eb` | Top bar only |
| Header text | `#ffffff` | Top bar only (not message area) |
| Send button | `#2563eb` | Button bg · `#ffffff` label |
| Agent bubble | `#eff6ff` | Operator messages · text still `#0f172a` |
| Border | `#bfdbfe` | Inputs, agent bubble |

**Do not use:** light gray text on white, white text outside the header, or Tawk green (`#03A84E`).

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
