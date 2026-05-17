# Partner portal — UI/UX & user stories

## Overview

Web dashboard for Tier 2 MSPs, OEMs, and enterprise clients. Replaces legacy phone trees with a transparent control center.

## Core screens & workflows

### 1. Ticket generation & smart dispatch

- **Form:** Location, SLA priority, skills, instructions, partner internal ticket ID (GUS / API link-back).  
- **Submit:** Triggers Leta auto-dispatch—no open bidding war.

### 2. Live overwatch dashboard

- **Map:** Active tech icon en route.  
- **Timeline:** Dispatched → On-site → Diagnostics → Remote support active → Completed.  
- **No-call guarantee:** Status visible without dialing dispatch or interrupting field tech.

### 3. Video support bridge

- When tech taps **Request Remote Expert**, partner dashboard alerts Tier 3.  
- **Join Leta Live** → view through tech camera for resets / cabling guidance.

### 4. Reporting & compliance

- Downloadable PDFs: signed WOs, photo packages.  
- CSV export for billing reconciliation.

## Multi-tenant rules

Partner sees only assigned tenant work orders; RBAC per [`../system-architecture.md`](../system-architecture.md).

## Integration

PSA sync—[`../../docs/stakeholder_ecosystem/customer_and_partner_integration.md`](../../docs/stakeholder_ecosystem/customer_and_partner_integration.md).
