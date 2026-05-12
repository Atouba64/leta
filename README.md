# Leta

**Leta** is a centralized, geo-aware mobile and web platform for the full lifecycle of IT service work—from ticket intake and dispatch through field execution, remote escalation, and payout. The product is designed to replace the gray areas of traditional break/fix IT: poor visibility for customers, brittle dispatch tools for field technicians, and weak handoff between people on-site and remote experts.

**Repository:** [github.com/Atouba64/leta](https://github.com/Atouba64/leta)

> **Note:** All product and documentation naming in this repository use **Leta** (a prior working title has been fully retired).

## Problem (why Leta exists)

- **Customers** rarely get reliable ETAs or live status; they live in phone trees and email threads.
- **Field technicians** juggle outdated dispatch portals, unclear scope, and slow payment cycles.
- **Remote technicians** lack a clean path to join a live job when the field tech needs “overwatch” support.

## Solution (what Leta delivers)

One platform that connects:

| Audience | Value |
|----------|--------|
| **Customers (B2B & B2C)** | Modern ticket flow, estimated cost up front, and **live GPS-style tracking** of the assigned field tech (similar to consumer delivery apps). |
| **Field techs** | Mobile-first workflow: go **Active**, receive **push** jobs near their location (initial focus: **Georgia**), capture signatures and job artifacts, and **faster automated payouts**. |
| **Remote techs (“Overwatch”)** | Web portal with **Escalate** → built-in **video/audio** session to raise first-time fix rate on complex work. |
| **Investors / operators** | **Asset-light** model: 1099 field network + cloud infrastructure; **Georgia-first** rollout for QA and density before Southeast expansion. |

## Documentation map (start here)

This repo is organized like an internal company handbook plus product specs. Work in batches; recommended order is **business plan first** (north star), then **app documentation** (software behavior).

| Area | Path |
|------|------|
| Business plan | [`01-business-plan/`](./01-business-plan/) |
| App documentation | [`02-app-documentation/`](./02-app-documentation/) |
| Research & ideas | [`03-research-and-ideas/`](./03-research-and-ideas/) |
| Legal & compliance | [`04-legal-and-compliance/`](./04-legal-and-compliance/) *(outline only—engage counsel before use)* |
| Marketing & sales | [`05-marketing-and-sales/`](./05-marketing-and-sales/) |

## Engineering (when code lands)

Application source, infrastructure-as-code, and CI will live alongside this documentation as the implementation phase starts (for example `apps/`, `services/`, or `packages/`). Until then, treat this tree as the **single source of truth** for product and operations intent.

## Contributing

Issues and PRs are welcome. For large doc restructures or new legal language, use PRs so changes stay reviewable.

## Maintainer

[@Atouba64](https://github.com/Atouba64)

## License

No `LICENSE` file is committed yet. Add one before redistributing code or inviting contributions you intend to treat as open source.
