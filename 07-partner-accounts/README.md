# Partner accounts — Leta

Dedicated workspace for **named fulfillment partners**: outreach, pilots, stakeholders, and account-specific playbooks.

**Not** the same as [`../06-partner-operations/`](../06-partner-operations/) (generic ops handbook) or [`../02-app-documentation/partner-portal/`](../02-app-documentation/partner-portal/) (product specs).

## Structure

| Resource | Purpose |
|----------|---------|
| [`00-LETA-PARTNER-ACQUISITION-PLAYBOOK.md`](./00-LETA-PARTNER-ACQUISITION-PLAYBOOK.md) | Master sales and partner-type playbook |
| [`01-PLATFORM-AND-CHANNEL-TARGETS.md`](./01-PLATFORM-AND-CHANNEL-TARGETS.md) | Strategic list of CMMS, VMS, MSP, and gov channels |
| [`02-REGISTRATION-URLS.md`](./02-REGISTRATION-URLS.md) | Platform registration **URLs** (markdown mirror) |
| [`03-WORK-ORDER-SOURCES-GEORGIA.md`](./03-WORK-ORDER-SOURCES-GEORGIA.md) | **All WO sources** — bid sites, gov, MSPs + Leta service fit |
| [`04-PARTNER-REACH-MASTER-LIST.md`](./04-PARTNER-REACH-MASTER-LIST.md) | **Partner outreach list** — export to Google Sheets/Docs |
| [`05-TRACKER-HOW-TO-UPDATE.md`](./05-TRACKER-HOW-TO-UPDATE.md) | How to update the canonical tracker |
| [`../data/partner-platform-tracker.json`](../data/partner-platform-tracker.json) | **Canonical tracker** (platforms + partners) |
| [leta.repair/ops-tracker.html](https://leta.repair/ops-tracker.html) | **Live viewer** (updates on push to `main`) |
| [`partners-reach/`](./partners-reach/) | Cross-partner **outreach strategy**, templates, cadence |
| [`barrister-global-services/`](./barrister-global-services/) | **First partner target** — Barrister Global Services Network |

## Add the next partner

```text
07-partner-accounts/
  <partner-slug>/
    README.md
    account-profile.md
    stakeholder-map.md
    call-script-*.md
    ...
```

Copy the Barrister folder as a template.

## Related repo docs

- Research: [`../03-research-and-ideas/field-service-networks-comparison.md`](../03-research-and-ideas/field-service-networks-comparison.md)
- Barrister forensics: [`../docs/market_analysis/competitor_forensics_barrister.md`](../docs/market_analysis/competitor_forensics_barrister.md)
- Pitch: [`../05-marketing-and-sales/partner-channel-win-win.md`](../05-marketing-and-sales/partner-channel-win-win.md)
- Ops: [`../06-partner-operations/`](../06-partner-operations/)
