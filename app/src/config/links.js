import { getTicketLocation } from '../utils/ticketDisplay';

/** Public web URLs (static site on Netlify). */
export const WEB_BASE_URL = 'https://leta.repair';

/** Leta business line (E.164 digits, no +) — matches website/contact-config.js */
export const VOICE_PHONE = '4702526681';

/** Starter SMS for recruit intake */
export const RECRUIT_SMS_MESSAGE =
  'Hey Leta — I want to join the Tech crew. My name:  My city + county (GA):  I have a smartphone + car (yes/no):';

/** Opens device messaging app with pre-filled crew intro */
export function getRecruitSmsUrl() {
  return `sms:+1${VOICE_PHONE}?body=${encodeURIComponent(RECRUIT_SMS_MESSAGE)}`;
}

/** Call the Leta business line */
export function getRecruitCallUrl() {
  return `tel:+1${VOICE_PHONE}`;
}

/** Operator inbox (internal — not shown in public app copy) */
export function getGoogleVoiceUrl() {
  return 'https://voice.google.com/';
}

/** @deprecated Use getRecruitSmsUrl */
export function getWhatsAppRecruitUrl() {
  return getRecruitSmsUrl();
}

export function getTechniciansRecruitUrl() {
  return `${WEB_BASE_URL}/technicians.html#join`;
}

export function getVoiceContactUrl() {
  return `${WEB_BASE_URL}/voice.html`;
}

export function getTechOnboardingUrl({ email, uid, displayName } = {}) {
  const params = new URLSearchParams();
  if (email) params.set('email', email.trim());
  if (uid) params.set('uid', uid);
  if (displayName) params.set('name', displayName.trim());
  params.set('source', 'app');
  const qs = params.toString();
  return `${WEB_BASE_URL}/tech-onboarding.html${qs ? `?${qs}` : ''}`;
}

export function getTicketTrackingUrl(ticketId) {
  return `${WEB_BASE_URL}/track.html?id=${encodeURIComponent(ticketId)}`;
}

export function getMapsDirectionsUrl(ticket) {
  const loc = getTicketLocation(ticket);
  if (loc?.lat && loc?.lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
  }
  const q = encodeURIComponent(loc?.formatted || ticket?.site || '');
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
