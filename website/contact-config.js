/**
 * Leta contact settings — edit here after you create inboxes, Tawk, and Cal.com.
 * Setup walkthrough: CONTACT-SETUP.md
 */
window.LETA_CONTACT = {
  companyName: "Leta",
  generalEmail: "hello@leta.repair",
  supportEmail: "support@leta.repair",
  partnersEmail: "partners@leta.repair",
  techniciansEmail: "techs@leta.repair",
  /** E.164 without + — business line; used for tel: and sms: links */
  phone: "4702526681",
  phoneDisplay: "(470) 252-6681",
  /**
   * Operator inbox URL (internal — do not link on public pages).
   * Sign in with the account linked to the number above.
   */
  googleVoiceUrl: "https://voice.google.com/",
  /** Pre-filled SMS when someone taps “Text to join” (recruit / tech pages) */
  recruitSmsMessage:
    "Hey Leta — I want to join the Tech crew. My name:  My city + county (GA):  I have a smartphone + car (yes/no):",
  /** General SMS from Contact page (optional starter) */
  contactSmsMessage: "Hi Leta — ",
  /**
   * Public booking page (pick date/time). Recommended: Cal.com free tier.
   * After signup, paste your link, e.g. https://cal.com/yourname/15min
   * Sign up: https://cal.com/signup
   */
  bookingUrl: "https://cal.com/mabele-liango-zjkn1b/30min",
  /** Alias for bookingUrl (legacy name) */
  calendlyUrl: "https://cal.com/mabele-liango-zjkn1b/30min",
  /**
   * Live chat: Tawk dashboard → Administration → Chat Widget → embed URL
   * embed.tawk.to/YOUR_PROPERTY_ID/default — paste YOUR_PROPERTY_ID below.
   */
  tawkPropertyId: "6a098152e57a6a1c342a511e",
  tawkWidgetId: "1joqi2asv",
  responseTime: "within 1–2 business days",
  formName: "contact",
  techOnboardingFormName: "tech-onboarding",
  /** Shown on the live-chat button (replaces Tawk’s default “We are here!”) */
  chatLabel: "Chat with Leta",
  /**
   * When true, also show Tawk’s round floating bubble. Leave false — use only the branded
   * “Chat with Leta” launcher and in-page live-chat links (Contact, homepage).
   */
  showTawkBubble: false,
  /** Chat panel header (fixes truncated “customer suppor” from Tawk dashboard) */
  chatHeaderTitle: "Leta support",
  chatHeaderSubtitle: "Onsite IT help · we reply quickly",
  /** Shown on referral tiles — update when program goes live */
  referralBonusDisplay: "$50",
  referralJobsRequired: "5",
  /**
   * Primary anchors for recruit copy (subset — full list on coverage.html).
   * Canonical data: data/georgia-coverage.json
   */
  recruitMetros:
    "Metro Atlanta · Macon · Savannah · Augusta · Columbus · Athens · Gainesville · Valdosta · Dalton · Albany",
  /** Statewide recruiting — shown on technicians.html */
  recruitRegions:
    "Eighteen anchor markets across Georgia — from Dalton on I-75 at Tennessee to Brunswick on the coast, Macon at the geographic center (I-75 × I-16), and Bainbridge/Albany in the southwest corner. We dispatch by your radius and corridor, not just downtown ATL.",
  coveragePagePath: "coverage.html",
  coverageAnchorCount: 18,
  /** Link in bio for TikTok / Instagram / YouTube — same on all recruit social profiles */
  recruitLinkInBio: "https://leta.repair/technicians.html#join",
  /**
   * Paste profile URLs after you create accounts (see recruit/social-profiles-setup.md).
   * Leave "" to hide that link on the site until live.
   */
  socialTikTok: "",
  socialInstagram: "",
  socialFacebook: "",
  socialYouTube: "",
  /** Suggested handles when registering (update URLs above once claimed) */
  socialHandleSuggested: "@letatechga",

  /**
   * OpenClaw (optional, not wired to the public site yet).
   * Operator setup: ../openclaw/README.md
   * Placeholders: OPENCLAW_URL, OPENCLAW_GATEWAY_TOKEN in openclaw/.env
   */
  openclawEnabled: false,
  openclawOpsWebhookUrl: "YOUR_OPENCLAW_WEBHOOK_URL_OR_LEAVE_EMPTY",
};
