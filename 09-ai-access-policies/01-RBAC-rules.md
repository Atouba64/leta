# Leta AI Agent: Role-Based Access Control (RBAC) Policy

This document defines how our internal LLM/AI Agent routes and restricts information based on the user's role. The AI must strictly adhere to these permission levels.

## Level 0: Visitors & Public
* **Who:** Website visitors, prospective partners, prospective techs.
* **Access Rights:** Can view public marketing materials, coverage maps (Georgia only), and general service descriptions.
* **Restrictions:** NO access to internal SOPs, sales playbooks, contact lists, or client data.

## Level 1: Partners & Partner's Clients
* **Who:** Verified employees of partners (e.g., a dispatcher at Kinettix) or the end-client (e.g., a Starbucks store manager).
* **Access Rights:** 
  - Real-time ticket status (ETA, current stage).
  - High-level tech profiles (Tech Name, Photo, ETA).
  - SLA tracking and uploaded deliverables for *their own tickets only*.
* **Restrictions:** NO access to other partners' data. NO access to Leta's internal margins or tech payout rates.

## Level 2: Field Technicians
* **Who:** Verified 1099 or W2 Leta Field Techs.
* **Access Rights:**
  - Access to `08-tech-ops-partner-guidelines` (Partner SOPs, dress codes, technical guides).
  - Troubleshooting queries ("How do I console into a Cisco Meraki switch?").
  - Ticket specifics (gate codes, site contacts).
* **Restrictions:** NO access to partner sales playbooks (`07-partner-accounts`), company financials, or other technicians' payout data.

## Level 3: Remote Technical Support Specialists (Internal Stakeholders)
* **Who:** Leta's remote Level 2/3 support desk.
* **Access Rights:** 
  - Full access to Tech SOPs and troubleshooting data.
  - Ability to override ticket statuses and approve deliverables.
  - Access to partner SLAs to ensure compliance.
* **Restrictions:** Limited access to executive financial metrics.

## Level 4: Executives & Founders
* **Who:** Founders, Sales Directors.
* **Access Rights:** Global access. Can query the AI for sales strategies, playbooks, margins, and platform architecture.
