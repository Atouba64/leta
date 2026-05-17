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
  /** E.164 without + — used for tel: links */
  phone: "4702526681",
  phoneDisplay: "(470) 252-6681",
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
  /**
   * WhatsApp Business number (E.164 digits, no +). Used for “Click to WhatsApp” recruit intake.
   * Set up quick replies in WhatsApp Business → Tools → Quick replies (see recruit/whatsapp-flow.md).
   */
  whatsappPhone: "4702526681",
  /** Pre-filled message when someone taps “Join on WhatsApp” */
  whatsappRecruitMessage:
    "Hey Leta — I want to join the Tech crew 🛠️\n\nMy name:\nMy city + county (GA):\nI have a smartphone + car (yes/no):",
  /** Shown on referral tiles — update when program goes live */
  referralBonusDisplay: "$50",
  referralJobsRequired: "5",
  /** Primary launch metros for recruit copy */
  recruitMetros: "Metro Atlanta · Athens · Augusta · Columbus · Macon · Savannah",
  /** Statewide recruiting — shown on technicians.html */
  recruitRegions:
    "Every corner of Georgia — metro Atlanta, college towns, Central & East GA, the coast, South GA, and North GA mountains. We dispatch by your radius, not just downtown ATL.",
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
};
