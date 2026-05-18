# Partner portal — RBAC & tenancy

## Tenant model

| Field | Location | Meaning |
|-------|----------|---------|
| `tenantId` | `users`, `tickets` | Isolation boundary (one partner org) |
| `partnerId` | `tickets` | Alias / legacy; same as tenant for v1 |
| `role` | Auth custom claim | `partner_dispatcher`, `partner_admin`, `leta_admin` |

## Roles

| Role | Permissions |
|------|-------------|
| `partner_dispatcher` | CRUD tickets own tenant; view map; export reports |
| `partner_admin` | + manage users, billing settings |
| `leta_admin` | All tenants (Leta ops only) |
| `field_tech` | No portal access |
| `remote_tech` | Join Leta Live on assigned tickets only |

## Firestore rules (target)

```
match /tickets/{id} {
  allow read: if request.auth.token.tenantId == resource.data.tenantId
    || request.auth.token.role == 'leta_admin';
  allow create: if request.auth.token.role in ['partner_dispatcher','partner_admin']
    && request.resource.data.tenantId == request.auth.token.tenantId;
}
```

Implement in [`../../firestore.rules`](../../firestore.rules) when portal ships.

## PII firewall

- Partner sees POC + site — not end-customer payment data
- Tech sees scope + POC per ticket — not partner rate card margins (optional hide)
