# Leta platform — system architecture

> Conceptual north star (this file) · Long-form: [`../docs/technical_architecture/`](../docs/technical_architecture/)

## Overview

Cloud-native, serverless-first application for high availability, real-time geolocation, secure multi-tenant access, and native video escalation. Initial implementation targets **AWS**; principles are portable.

## Architectural principles

1. **Single source of truth** for tickets, users, payouts, session metadata.  
2. **Real-time** for offers, tracking, Leta Live—**async** for reporting and invoicing.  
3. **Least privilege** for partner integrations and video sessions.  
4. **Auditability:** append-only ticket event log.  
5. **Offline-first** field client—see [`../docs/technical_architecture/offline_first_edge_synchronization.md`](../docs/technical_architecture/offline_first_edge_synchronization.md).

## Core technology stack (target)

| Layer | Choice |
|-------|--------|
| Partner / customer portal | React (Amplify or static host) |
| Field tech app | React Native (iOS & Android) |
| API | Node.js on AWS Lambda + API Gateway |
| Leta Live (WebRTC) | Amazon Chime SDK (or equivalent WebRTC SFU) |
| Relational data | Amazon RDS (PostgreSQL)—profiles, WOs, ledgers |
| Live geo / status | Amazon DynamoDB—high-throughput location + state |
| Auth | AWS Cognito user pools |
| Notifications | Amazon SNS (push) |
| Orchestration | AWS Step Functions (dispatch pipeline) |

## Security & IAM (differentiator)

- **Zero-trust** mindset; encryption at rest (KMS) and in transit (TLS 1.3).  
- **Tenant isolation:** Tier 2 partners query only their `tenant_id`.  
- **RBAC roles:** Field tech (active WOs only) · Partner dispatcher (create, map, video join) · Leta admin (disputes, platform).

## Real-time dispatch engine (summary)

On work order creation, Step Function pipeline:

1. Query DynamoDB for techs within radius (e.g. 50 mi of Gainesville, GA).  
2. Filter by skill tags and availability.  
3. SNS push to top N matches; premium window before broad broadcast.

Full algorithm spec: [`../docs/operations/autonomous_algorithmic_dispatch.md`](../docs/operations/autonomous_algorithmic_dispatch.md).

## Microservices roadmap

Production services decompose over time per [`../docs/technical_architecture/microservices_foundation.md`](../docs/technical_architecture/microservices_foundation.md) (Saga, CQRS).

## Major components (logical)

```
 Customer web/app ──┐
 Field mobile     ──┼──► API gateway ──► Core services (tickets, match, pay, notify)
 Remote portal    ──┘         │              │
 Partner portal   ────────────┘              ├──► Postgres / DynamoDB
                                             ├──► Object storage (media)
                                             └──► Chime / video sessions
```

## Partner integration

Bidirectional PSA gateway—field ownership table in [`../docs/stakeholder_ecosystem/customer_and_partner_integration.md`](../docs/stakeholder_ecosystem/customer_and_partner_integration.md).
