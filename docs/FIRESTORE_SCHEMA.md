# Firestore schema — Leta

Logical model aligned with [`../02-app-documentation/system-architecture.md`](../02-app-documentation/system-architecture.md).

## `users/{uid}`

| Field | Type | Notes |
|-------|------|--------|
| `email` | string | |
| `displayName` | string | |
| `role` | string | `customer` \| `field_tech` \| `remote_tech` \| `partner_dispatcher` \| `admin` |
| `phone` | string? | |
| `skills` | string[] | Field tech tags (denormalized from profile) |
| `techProfile` | map? | Marketplace profile — see below |
| `location` | map | `{ lat, lng, updatedAt }` for dispatch |
| `isActive` | boolean | Field tech online toggle |
| `rating` | number | |
| `tenantId` | string? | Partner B2B scope |
| `stripeConnectAccountId` | string? | Payouts (future) |
| `createdAt` | timestamp | |
| `updatedAt` | timestamp | |

### `techProfile` (field tech)

| Field | Type | Notes |
|-------|------|--------|
| `headline` | string | One-line title for partners |
| `bio` | string | Pitch / overview |
| `skillEntries` | array | `{ id, label, proficiency: learning \| comfortable \| expert }` |
| `highlightSkillIds` | string[] | Up to 5 featured skills |
| `travelRadiusMi` | number | Default max distance for offers |
| `minPayout` | number | USD floor for dispatch filters |
| `workPreferences` | string[] | e.g. break-fix, partner dispatch |
| `tier` | string | `Tier 1: Junior Tech` \| `Tier 2: Field Tech` \| `Tier 3: Senior Specialist` |

Auth **custom claims** mirror `role` and `tenantId` (Cloud Function `syncUserRoleClaims`).

## `tickets/{ticketId}`

| Field | Type | Notes |
|-------|------|--------|
| `customerId` | string | |
| `assignedTechId` | string? | |
| `remoteTechId` | string? | Overwatch |
| `partnerId` | string? | Fulfillment partner (`tenantId` on dispatcher) |
| `sourceSystem` | string? | e.g. `servicechannel`, `fieldglass`, `corrigo`, `fieldnation` |
| `partnerDispatcherId` | string? | Who created the WO |
| `partnerWorkOrderId` | string? | Partner’s upstream ticket id |
| `contactPolicy` | string? | e.g. `poc_only` |
| `poc` | map? | `{ name, phone }` — not shown to other parties in v1 |
| `channelLocked` | boolean? | Prefer on-platform comms |
| `status` | string | See `TICKET_STATUS` in app |
| `title` | string | |
| `description` | string | |
| `issueType` | string | |
| `address` | map | `{ formatted, lat, lng }` |
| `urgency` | string | `asap` \| `scheduled` |
| `pricing` | map | `{ estimateMin, estimateMax, currency }` |
| `payment` | map | `{ intentId, status, paidAt }` |
| `photos` | string[] | Storage URLs |
| `signatureUrl` | string? | |
| `activeSessionId` | string? | Leta Live |
| `createdAt` | timestamp | |
| `updatedAt` | timestamp | |

### Subcollection `tickets/{id}/events/{eventId}`

Append-only audit log: `type`, `actorId`, `payload`, `createdAt`.

### Subcollection `tickets/{id}/messages/{messageId}`

Partner ↔ tech thread (and system lines). Fields: `senderId`, `senderRole`, `senderLabel`, `body`, `type` (`text` \| `system` \| `call_invite`), `sessionId?`, `createdAt`.

## `offers/{offerId}`

| Field | Type | Notes |
|-------|------|--------|
| `ticketId` | string | |
| `techId` | string | |
| `status` | string | `pending` \| `accepted` \| … |
| `payout` | number | Cents or dollars (document in code: dollars) |
| `distanceMi` | number | |
| `expiresAt` | timestamp | |
| `createdAt` | timestamp | |

## `escalations/{id}`

Queue row when field tech requests overwatch.

## `live_sessions/{id}`

WebRTC signaling room; subcollection `signals` for SDP/ICE relay. `purpose`: `overwatch` \| `partner_voice`. Partner voice sessions set `partnerId`, `partnerDispatcherId`, `fieldTechId`.
