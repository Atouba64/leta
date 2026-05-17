# Offline-first edge synchronization

The single greatest technological failure of legacy field service applications is absolute reliance on continuous, high-speed connectivity. Technicians operate in subterranean data centers, shielded plants, and rural retail sites where connectivity is restricted or absent. Traditional FSM apps **self-destruct** offline: mapping fails, inventory checks halt, signatures block.

## Leta approach

The Leta mobile client treats **local device storage as authoritative** for active work orders.

- **Optimistic UI** — scan, photo, diagnostic input queues instantly as "pending sync."
- **FIFO encrypted queue** — progress through long checklists without cloud round-trips.
- **Delta sync** — on reconnect, transmit only changed fields, not entire multi-megabyte forms.
- **Exponential backoff** — mid-transfer drops retry silently without blocking the technician.

## Conflict resolution

When offline field edits collide with remote PM updates, Leta uses **CRDTs** and **authority-based last-write-wins** (e.g. edge device wins for on-site deliverables; partner PSA wins for billing phase).

## Product tie-in

Directly counters Bailiwick-style administrative paralysis in signal-dead environments. See field app stories: [`../../02-app-documentation/field-tech-app/user-stories.md`](../../02-app-documentation/field-tech-app/user-stories.md).
