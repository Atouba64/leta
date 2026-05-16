# Hosting — leta.repair (Netlify Free)

Production is **Netlify** on the **Starter (free)** plan. The repo root [`netlify.toml`](../netlify.toml) sets `publish = "website"` so `/` serves `website/index.html`.

## Local → live workflow

1. Edit files under [`website/`](./).
2. Preview: open `index.html` in a browser.
3. Commit and push to **`main`** on GitHub.
4. Netlify auto-deploys from the connected repo (usually 1–2 minutes).

Check deploys: [app.netlify.com](https://app.netlify.com) → your site → **Deploys**.

## Fix “Page not found” (Netlify 404)

That page means Netlify is live but **not publishing the `website/` folder**. Align settings:

| Setting | Correct value |
|---------|----------------|
| **Build command** | *(empty)* |
| **Publish directory** | `website` |
| **Base directory** | *(empty — not `website`)* |

Then: **Deploys → Trigger deploy → Deploy site** (or push any commit to `main`).

`netlify.toml` in the repo should match the table; after a Git deploy, UI overrides are merged—if 404 persists, set **Publish directory** to `website` in the UI and redeploy.

## Stay on the free plan (avoid surprise usage)

- **Plan:** Starter — “Build and deploy free forever” for static sites.
- **No build command** — HTML/CSS only; saves build minutes.
- **Do not enable** paid add-ons: Netlify Analytics, Pro features, Identity, Large Media, etc.
- **Bandwidth:** 100 GB/month included on Starter; a marketing site rarely exceeds this.
- **Build minutes:** 300/month included; empty build uses almost none per deploy.
- **One host:** use Netlify only for `leta.repair` (do not also deploy the same domain from GitHub Pages).

If you see billing, open **Team settings → Billing** and confirm you are on **Starter**, not Pro, and remove unused sites.

## GitHub’s role

GitHub stores the code and triggers Netlify via the repo link. You do **not** need GitHub Pages for this site.

## Custom domain

Configure **leta.repair** under Netlify → **Domain management**. DNS should point to Netlify (their load balancer or `CNAME` to your `*.netlify.app` subdomain), not GitHub Pages.
