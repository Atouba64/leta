# Microservices foundation

To systematically bypass the catastrophic limitations that plague legacy platforms, Leta must be constructed upon a fundamentally superior digital foundation.

## Monolith vs. microservices

Legacy field service management systems inherently suffer from **monolithic architectures**. In a monolithic system, all operational logic—from dispatch route calculation to invoice generation—is tightly coupled into a single codebase. Any feature change requires a risky, lockstep deployment across the entire application.

The Leta platform abandons the monolith in favor of a **microservices architecture**: independently deployable services organized around business capabilities:

- Geospatial routing
- Technician credential verification
- Inventory validation
- Bidirectional API synchronization (partner PSAs)
- Automated payment processing

## Benefits

- **Resilience:** Regional surge (e.g. storm-driven break-fix) scales only the routing service.
- **Team velocity:** Services deploy on independent cadences.

## Distributed data patterns

Because each service maintains its own datastore, traditional ACID transactions across services are not available. Leta implements:

- **Saga pattern** — multi-step transactions with compensating rollbacks (e.g. parts denied after dispatch → auto-unassign tech).
- **CQRS** — separate read/write paths so heavy SLA reporting does not starve real-time ticket ingestion.

## Implementation reference

Shorter AWS-oriented stack notes: [`../../02-app-documentation/system-architecture.md`](../../02-app-documentation/system-architecture.md).
