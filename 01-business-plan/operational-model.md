# Operational Model: Day-to-Day Logistics

This document outlines how Leta operates in the real world, ensuring high quality, safety, and dispute resolution.

## 1. The Dispatching Logic (The Algorithm)

Leta does not rely on human dispatchers frantically making phone calls. The system is automated based on four pillars:

- **Geo-Fencing:** When a ticket is created in Gainesville, the app pushes notifications only to active techs within a 30-mile radius.
- **Skill Matching:** Tickets require specific tags (e.g., `Networking`, `Hardware Repair`, `POS Systems`). Only techs who have verified these skills in their profile receive the ping.
- **Rating Hierarchy:** Techs with a 4.8+ star rating get a 5-minute head start to accept premium tickets before they are broadcasted to the wider network.
- **The "Uber" Acceptance:** The first qualified tech to tap "Accept" claims the ticket.

## 2. The Remote Tech Integration (Quality Assurance)

The biggest risk in break/fix IT is a tech arriving on-site and not knowing how to fix the problem, resulting in a wasted trip and an angry customer.

- **The Safety Net:** Field Techs are required to hit the "Escalate" button in the app before leaving a site unresolved.
- **Live Connection:** This instantly video-calls a vetted Leta Remote Tech. The Remote Tech views the hardware through the Field Tech's phone camera and walks them through the solution step-by-step.

## 3. Tech Onboarding & Vetting

To maintain a premium reputation, Leta cannot let just anyone onto the platform.

- **Background Checks:** Mandatory criminal background check via Checkr API.
- **Skill Verification:** Techs must upload certifications (CompTIA, Cisco, etc.) or pass a brief, in-app technical quiz during onboarding.
- **Remote Tech Elite:** Remote Techs are highly vetted, often requiring 5+ years of Tier 3 support experience.

## 4. Dispute Resolution & Protection

When things go wrong, the app protects all parties.

- **Photographic Proof:** Field Techs must take "Before" and "After" photos within the app to close a ticket. This prevents customers from falsely claiming a job wasn't completed.
- **Escrow System:** Customer funds are captured when the tech is en route but held in escrow. If a dispute arises, Leta Admin reviews the GPS logs, chat history, and photos to make a binding decision within 24 hours.
- **Insurance:** Leta maintains a blanket liability policy, though 1099 Field Techs are required to carry their own basic liability insurance to be activated on the platform.

## Next Steps

The **01-business-plan** folder is the foundational blueprint for Leta. Whenever you are ready, continue with **02-app-documentation**, where you outline the exact features, buttons, and user flows for the Customer App, the Field Tech App, and the Remote Tech Portal.
