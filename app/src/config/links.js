import { getTicketLocation } from '../utils/ticketDisplay';

/** Public web URLs (static site on Netlify). */
export const WEB_BASE_URL = 'https://leta.repair';

/** Technician onboarding form on the marketing site (multi-step application). */
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
