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

Create empty tabs (or let the script create them): **Platforms**, **Partners**, **Pipeline**, **Active_Queue**, **Kanban**.

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
| **See action queue** | **Active_Queue** tab |
| **Partner Kanban** | **Kanban** tab (metrics + pipeline columns) |
| **Move partner stage** | Kanban quick-edit table → **Apply Kanban edits → Entries** |
| **Publish** | **Save & push to GitHub** → PIN `1998` |
| **Pull from repo** | **Reload from GitHub** |
| **Fix linked tabs** | **Refresh linked tabs** |
| **Browse / pivot summaries** | **Pivot_Dashboard** tab |
| **Rebuild pivots only** | **Rebuild pivot dashboard** |

Edits on **Entries** (or Kanban quick-edit) → **Refresh linked tabs** → **Save & push** for live site.

---

## Browse data (one tab or many)

### Single tab with lots of rows

| Goal | How |
|------|-----|
| **Filter one tab** | Open **Entries**, **Partners**, or **Pivot_Partners** → select header row → **Data → Create a filter** → use ▼ on columns |
| **Find text** | **Ctrl+F** / **Cmd+F** (e.g. search `Barrister`, `Mabele`, `in_progress`) |
| **Sort** | Click column header **pathPriority** or **name** → **Data → Sort sheet** |
| **Pre-filtered lists** | Use **Platforms**, **Partners**, **Active_Queue**, **Filter_Production**, **Filter_Blocked** instead of full **Entries** |

### Multiple tabs at once

| Goal | How |
|------|-----|
| **Summary across all data** | Open **Pivot_Dashboard** — five pivots (partners, platforms, combined) |
| **Partner pipeline** | **Kanban** tab (visual) or pivot ①② on **Pivot_Dashboard** |
| **Raw data for pivots** | **Pivot_Source** (all rows), **Pivot_Partners**, **Pivot_Platforms** |
| **Jump between views** | **Kanban** metrics row has links to **Partners**, **Active_Queue**, etc. |

### Pivot tables (recommended)

1. **Leta Tracker → Refresh linked tabs** (updates pivot source sheets + rebuilds **Pivot_Dashboard**)
2. Open **Pivot_Dashboard**
3. Click **▼** on any pivot row/column to filter (e.g. only `research` stage, only owner `Jeremy`)
4. To see underlying rows: open **Pivot_Partners** or **Entries** and use **Data → Create a filter** matching your pivot selection

**Custom pivot:** **Insert → Pivot table** → **Use existing data** → range **`Pivot_Partners!A:I`** (partners) or **`Pivot_Platforms!A:G`** (platforms) or **`Pivot_Source!A:AG`** (everything).

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
| **Platforms** | No | **55 platforms** — name, status, URL, next step (from Entries) |
| **Partners** | No | **27 partners** — CRM fields, call order (from Entries) |
| **Pipeline** | No | Same as Partners (partner CRM view) |
| **Active_Queue** | No | Partners in progress or with a next step |
| **Kanban** | Quick-edit table | Partner pipeline board + metrics (source: **Entries**) |
| **Filter_Production** | No | Partners with `outreachStage` = production (Won) |
| **Filter_Blocked** | No | Partners with blockers listed |
| **Pivot_Source** | No | All entries — flat copy for pivot tables |
| **Pivot_Partners** | No | Partners only — pivot-friendly columns |
| **Pivot_Platforms** | No | Platforms only — pivot-friendly columns |
| **Pivot_Dashboard** | No | **5 built-in pivot tables** — browse & filter summaries |

**If Platforms or Partners are empty:** open **Entries** and confirm rows exist, then run **Leta Tracker → Refresh linked tabs**.

### Kanban workflow

1. **Refresh linked tabs** — builds Kanban columns + metrics from **Entries**
2. Move a partner — change **outreachStage** in the Kanban quick-edit table (bottom) or on **Entries**
3. **Apply Kanban edits → Entries** — syncs quick-edit table to **Entries**
4. **Refresh linked tabs** again — updates board + **Save & push** for live site

**Metrics** (top of Kanban tab): clickable links open **Partners**, **Filter_Production**, **Active_Queue**, **Filter_Blocked**, or **Entries**. Success rate = Production / total partners (Closed Won / Total).

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
| Filter tabs empty | Confirm **Entries** has data → **Refresh linked tabs** |
| Push fails | **Set up GitHub token** + **Test GitHub connection** |
| Dropdown missing | **Refresh linked tabs** after editing Status/Category/Outreach defs |
| Pivot dashboard empty | **Refresh linked tabs** or **Rebuild pivot dashboard** |
| Live site stale | Wait ~1 min; hard-refresh ops-tracker |

---

## Sharing with a collaborator

**Share** the Google Sheet with their email as **Editor**. They edit **Entries**; anyone with access can **Save & push** (uses the GitHub token saved in Apps Script).

GitHub repo access is separate (`Atouba64/leta` collaborator).
