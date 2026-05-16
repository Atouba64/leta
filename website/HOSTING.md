# Hosting — leta.repair (GitHub Pages only)

The live marketing site is served from **`website/`** via **GitHub Pages**. There is **no Netlify** configuration in this repository.

## Your workflow (local → live)

1. Edit HTML/CSS/JS under [`website/`](./).
2. Preview locally: open `index.html` in a browser (or use a simple static server).
3. Commit and push to **`main`** on [github.com/Atouba64/leta](https://github.com/Atouba64/leta).
4. GitHub Actions workflow **Deploy website** runs automatically and updates the live site (usually within a few minutes).

Check deploy status: **GitHub repo → Actions → Deploy website**.

## One-time GitHub setup

If Pages is not enabled yet:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Under **Custom domain**, enter **`leta.repair`** and save (GitHub will verify DNS).
4. Enable **Enforce HTTPS** when the certificate is ready.

## DNS (point leta.repair at GitHub, not Netlify)

At your domain registrar, **remove** Netlify DNS records (e.g. `NETLIFY` or Netlify-assigned targets).

For **apex** `leta.repair`, use GitHub’s documented **A** records (see [GitHub: Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)):

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

For **`www`**, use a **CNAME** to `Atouba64.github.io` (or redirect `www` → apex at the registrar).

The file [`CNAME`](./CNAME) in this folder tells GitHub Pages which hostname to serve.

## Stop Netlify charges (required)

Netlify bills when a site stays connected and receives traffic/builds—even for small static sites.

1. Log in at [app.netlify.com](https://app.netlify.com).
2. Open the **leta.repair** (or linked) site.
3. **Site configuration → Build & deploy → Continuous deployment → Stop builds** (optional first step).
4. **Site configuration → General → Delete site** (recommended so nothing deploys or meters usage).

Also disconnect the GitHub repo under **Project configuration → Build & deploy** if it still lists `Atouba64/leta`.

After deletion, only GitHub Pages serves the site once DNS points to GitHub.

## Why credits were used on Netlify

Common causes for a static repo like this:

- **Connected Git deploys** on every push (build minutes).
- **Bandwidth** over the free tier if the site gets traffic.
- **Team / Pro** plan or add-ons (Forms, Analytics, Identity).
- A **second** host (Netlify + GitHub) both building the same repo.

This repo now deploys **only** through GitHub Actions → GitHub Pages.
