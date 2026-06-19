# Google Sheets — Leta ops tracker

**This is the only editor you need.** Edit in Google Sheets → **Save & push** → live [ops-tracker.html](https://leta.repair/ops-tracker.html) updates in ~1 minute.

**Cost: $0.** No Firebase, no database, no Blaze billing. Flow:

```
Google Sheet → GitHub commit → Netlify deploy → leta.repair/ops-tracker.html
```

---

## Your spreadsheet (create once)

1. Go to [Google Sheets](https://sheets.google.com) → **Blank spreadsheet**
2. Name it: **Leta Ops Tracker**
3. **Bookmark the URL** — share with collaborators as **Editor**

---

## One-time setup (~10 minutes)

### Step 1 — Import current data

From the **leta repo root**:

```bash
cd /Users/mabele/Documents/Projects/GitHub/leta
npm run sheets:export
```

Import each CSV from `scripts/google-sheets/export/`:

| CSV | Tab name |
|-----|----------|
| `Settings.csv` | **Settings** |
| `Entries.csv` | **Entries** |
| `Status_Defs.csv` | **Status_Defs** |
| `Category_Defs.csv` | **Category_Defs** |
| `Outreach_Stages.csv` | **Outreach_Stages** |
| `Goal_Defs.csv` | **Goal_Defs** |

For each: select tab → **File → Import → Upload** → CSV → **Replace current sheet**.

Create empty tabs (or let the script create them): **Platforms**, **Partners**, **Pipeline**, **Active_Queue**.

### Step 2 — Install Apps Script

1. **Extensions → Apps Script** → paste all of [`scripts/google-sheets/LetaOpsTracker.gs`](../../scripts/google-sheets/LetaOpsTracker.gs) → **Save**
2. Reload spreadsheet → menu **Leta Tracker** appears
3. **Leta Tracker → Reload from GitHub** (installs linked tabs + dropdowns)

### Step 3 — GitHub token (one time)

1. Fine-grained PAT: **Contents read/write** on `Atouba64/leta`
2. **Leta Tracker → Set up GitHub token** → paste token
3. **Test GitHub connection** → should pass

---

## Daily use

| Action | How |
|--------|-----|
| **Edit** | **Entries** tab (source of truth) |
| **See platforms** | **Platforms** tab (auto-updates from Entries) |
| **See partners** | **Partners** or **Pipeline** tab |
| **See action queue** | **Active_Queue** (in-progress + next steps) |
| **Publish** | **Save & push to GitHub** → PIN `1998` |
| **Pull from repo** | **Reload from GitHub** |
| **Fix linked tabs** | **Refresh linked tabs** |

Edits on **Entries** automatically flow to filtered tabs (Google Sheets `FILTER` formulas).

---

## Tabs

| Tab | Edit? | Purpose |
|-----|-------|---------|
| **Entries** | Yes | All platforms & partners — edit here |
| **Settings** | Yes | PIN, page copy |
| **Status_Defs** | Yes | Registration status labels (dropdown on Entries) |
| **Category_Defs** | Yes | Category labels (dropdown) |
| **Outreach_Stages** | Yes | Partner pipeline stage (dropdown) |
| **Goal_Defs** | Yes | Relationship goal types (dropdown) |
| **Platforms** | No | Live filter: `kind=platform` |
| **Partners** | No | Live filter: `kind=partner` |
| **Pipeline** | No | All partners (CRM view) |
| **Active_Queue** | No | Partners with `in_progress` status or a **nextStep** |

---

## CRM columns on Entries (partners & platforms)

| Column | Use |
|--------|-----|
| `owner` | Mabele / Jeremy |
| `outreachStage` | research → outreach → conversation → pilot → production |
| `primaryContact`, `contactEmail`, `contactPhone` | Who to call |
| `relationshipGoal` | coopetition, overflow_subcontract, msp_smart_hands, etc. |
| `painHypothesis` | Why they need Leta |
| `geographies` | Georgia regions |
| `lastTouchDate`, `nextStepDate` | CRM dates |
| `pathPriority` | HP-adjacent call/register order (1 = first) |
| `enterpriseChain` | Who sits above Leta (e.g. HP → Barrister → Leta GA) |
| `nextStep` | Concrete next action |
| `blockers` | What is stuck |
| `futurePlan` | Where this relationship should land |

---

## What gets committed

- `data/partner-platform-tracker.json`
- `website/ops-tracker-data.json`

Netlify rebuilds on every push to `main`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Filter tabs empty | **Refresh linked tabs** or **Reload from GitHub** |
| Push fails | **Set up GitHub token** + **Test GitHub connection** |
| Dropdown missing | **Refresh linked tabs** after editing Status/Category/Outreach defs |
| Live site stale | Wait ~1 min; hard-refresh ops-tracker |

---

## Sharing with a collaborator

**Share** the Google Sheet with their email as **Editor**. They edit **Entries**; anyone with access can **Save & push** (uses the GitHub token saved in Apps Script).

GitHub repo access is separate (`Atouba64/leta` collaborator).
