# Tech Onboarding Integration Architecture

This document describes how the technician onboarding pipeline routes data from the public-facing website into the Leta backend and extracts emails for the mailing list.

## Overview

The initial screening form located at `website/tech-onboarding.html` allows prospective technicians to submit their qualifications and interest without providing highly sensitive PII upfront. Instead of relying on Netlify Forms, this data is now routed directly into the Firebase backend.

## Data Flow

1. **Frontend Submission:**
   When a user submits the form, `website/tech-onboarding-form.js` intercepts the event. It converts the `FormData` into a JSON object. The submission is sent via a `POST` request to the Cloud Function API endpoint `/api/tech/onboard`.
   
   *Note: The frontend builds the API URL dynamically based on `window.LETA_CONTACT.firebaseProjectId` or `aiChatApiUrl` defined in `contact-config.js`.*

2. **Backend Processing:**
   The `POST /tech/onboard` route (defined in `functions/index.js`) processes the request.
   - It validates that an `email` is present.
   - It creates a unique document in the `technician_applications` collection, containing the entire JSON payload submitted by the tech.
   - It isolates the `email`, `first_name`, and `last_name` and performs an upsert into the `mailing_list` collection (using the email address as the document ID to prevent duplicates).
   - This database operation is wrapped in a Firestore Transaction to ensure both records are saved atomically.

3. **Database Collections:**
   - **`technician_applications`**: Stores the raw application data (skills, location, availability, short answers).
   - **`mailing_list`**: Stores basic contact info (`email`, `firstName`, `lastName`, `source`).

## Security

Client-side reading and writing to these collections are strictly locked down.

In `firestore.rules`, we ensure that only users with the `admin` role can access or modify these records:
```javascript
match /technician_applications/{applicationId} {
  allow read, write: if isAdmin();
}
match /mailing_list/{email} {
  allow read, write: if isAdmin();
}
```
The Cloud Function uses the Firebase Admin SDK, which inherently bypasses these security rules to perform the initial save.

## Future Extensibility

- **Mailing List Exports:** Since the mailing list lives natively in Firestore, it can be exported as a CSV, or a new Cloud Function trigger can be attached to `onCreate`/`onUpdate` events in the `mailing_list` collection to automatically sync these addresses with a third-party CRM like Mailchimp or HubSpot.
- **Background Checks & Vetting:** Once an application is approved by an admin, the system can be extended to dispatch magic links to the candidate (e.g., Checkr, Stripe Identity) directly from Firebase.
