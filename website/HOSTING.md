# Hosting — leta.repair (Netlify Free)

**Public URL only:** [https://leta.repair](https://leta.repair)

**Netlify project:** `leta-tech` (linked to this GitHub repo). Admin: [app.netlify.com/projects/leta-tech](https://app.netlify.com/projects/leta-tech)

Do **not** add a second Netlify site for Leta (random `*.netlify.app` URLs are unnecessary and can cause duplicate deploys). If you use the CLI locally: `netlify link --name leta-tech`.

Production uses the **Starter (free)** plan. [`netlify.toml`](../netlify.toml) sets `publish = "website"` so `/` serves `website/index.html`.

## Local → live workflow

1. Edit files under [`website/`](./).
2. Preview: open `index.html` in a browser.
3. Commit and push to **`main`** on GitHub.
4. Netlify auto-deploys from the connected repo (usually 1–2 minutes).

Check deploys: [leta-tech → Deploys](https://app.netlify.com/projects/leta-tech/deploys).

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

**leta.repair** is the primary domain on `leta-tech`. DNS should point to Netlify per their domain setup UI—not GitHub Pages.
