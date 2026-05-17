# Field tech mobile app — UI/UX & user stories

> Leta Advantage: [`../../docs/leta-advantage.md`](../../docs/leta-advantage.md)

## Overview

The mobile app is the lifeblood of the field technician. It must operate in **low-bandwidth** environments (grocery backrooms, concrete bunkers) and strip administrative friction.

## Core screens & workflows

### 1. Dispatch board (home)

- **UI:** Localized map + list of available work orders.  
- **Card:** Distance, ETA to complete, tools required ("Tall ladder"), **exact payout**.  
- **Action:** One-tap **Accept job**.

### 2. Active mission ("on-site")

- **Section A — Logistics & access:** POC name, phone, physical access notes ("See Brad for roof keys").  
- **Section B — Security & codes:** Tap-to-reveal lockbox / rack PINs (GPS-gated when enforced).  
- **Section C — Technical briefing:** PDFs / quick-reference for ticket hardware.

### 3. Leta Live (native video)

- **Trigger:** Floating **Request Remote Expert**.  
- **Behavior:** WebRTC via rear camera; routes to Tier 2 desk for **this ticket**—no Teams/Zoom handoff.  
- **UX:** Speakerphone / Bluetooth default for hands-free rack work.

### 4. Close-out & payment

- **Digital sign-off** pad for on-site POC.  
- **Proof of work:** Required completion photos.  
- **Payout UX:** "Funds released" after approval—**24-hour** target.

## Offline behavior

Queue actions locally; delta sync on reconnect—[`../../docs/technical_architecture/offline_first_edge_synchronization.md`](../../docs/technical_architecture/offline_first_edge_synchronization.md).

## Escalation policy

Escalate via Leta Live before abandoning site when SLA/policy requires—protects first-time fix and partner SLA.
