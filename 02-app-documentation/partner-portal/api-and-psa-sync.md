# Partner portal — PSA & API sync (v2 spec)

## v1 (pilot)

- Manual **partner WO #** field on create
- Email `partners@leta.repair` with JSON template for ops entry

## v2 targets

| PSA | Direction | Notes |
|-----|-----------|-------|
| ConnectWise Manage | Inbound create WO; outbound status | Common for MSPs |
| Autotask | Same | |
| ServiceNow | Inbound incident → Leta ticket | Enterprise |
| Zendesk | Optional | ITSM light |

## Idempotency

`POST /v1/work-orders` with header `Idempotency-Key: {partnerWorkOrderId}`.

## Status sync back

| Leta status | PSA status (example) |
|-------------|---------------------|
| `assigned` | Dispatched |
| `on_site` | In Progress |
| `completed` | Completed pending sign-off |
| `approved` | Closed |

## Webhook security

HMAC signature, rotate secret in SET-01.

## Reference

[`../../docs/stakeholder_ecosystem/customer_and_partner_integration.md`](../../docs/stakeholder_ecosystem/customer_and_partner_integration.md)
