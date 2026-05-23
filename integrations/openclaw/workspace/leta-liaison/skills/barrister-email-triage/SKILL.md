---
name: barrister-email-triage
description: Extract Barrister dispatch email fields for Leta ticket creation (liaison copy-paste).
---

# Barrister email triage

## When to use

User pastes a **Barrister or partner dispatch email** (redacted is fine). You return structured data for a Leta liaison to create or update a ticket.

## Output format (JSON only, no prose wrapper)

```json
{
  "partnerId": "barrister-global-services",
  "partnerChannel": "barrister",
  "partnerWorkOrderId": "",
  "title": "",
  "site": "",
  "address": { "formatted": "", "state": "GA" },
  "sla": "",
  "urgent": false,
  "contactPolicy": "poc_only",
  "scopeNotes": "",
  "poc": { "name": "", "role": "", "phone": "" },
  "dispatch": { "name": "Barrister dispatch", "phone": "" },
  "missingFields": [],
  "confidence": "high|medium|low"
}
```

## Extraction rules

- **partnerWorkOrderId:** Look for BAM-, WO, work order, ticket # patterns.
- **contactPolicy:** Default `poc_only` for retail/grocery unless email says otherwise.
- **poc.phone:** Only from explicit POC lines — never the store main number labeled as main line.
- **urgent:** true if NBD/4hr/same-day language or caps URGENT.
- **missingFields:** list any required empty strings.

## After output

Add one line: `Liaison: review JSON, then paste into Leta ticket. Do not auto-send to Barrister.`
