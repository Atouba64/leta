import { SORT_OFFERS } from '../constants/techSkills';

function parsePayout(payout) {
  if (typeof payout === 'number') return payout;
  if (!payout) return 0;
  const n = parseFloat(String(payout).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function offerSkillIds(offer) {
  const raw = offer.skills || offer.skillTags || [];
  return raw.map((s) => String(s).toLowerCase());
}

function techSkillLabels(techSkills = []) {
  return techSkills.map((s) => {
    if (typeof s === 'string') return s.toLowerCase();
    return (s.label || s.id || '').toLowerCase();
  });
}

function skillsOverlap(offer, techSkills) {
  if (!techSkills?.length) return true;
  const tech = techSkillLabels(techSkills);
  const offerSkills = offerSkillIds(offer);
  if (!offerSkills.length) return true;
  return offerSkills.some((o) => tech.some((t) => t.includes(o) || o.includes(t)));
}

/**
 * Filter and sort dispatch offers for the active tech.
 */
export function filterAndSortOffers(offers, options = {}) {
  const {
    maxDistanceMi = null,
    minPayout = 0,
    skillMatchOnly = false,
    techSkills = [],
    sortBy = SORT_OFFERS.NEAREST,
  } = options;

  let list = [...(offers || [])];

  if (maxDistanceMi != null && maxDistanceMi > 0) {
    list = list.filter((o) => (o.distanceMi ?? 999) <= maxDistanceMi);
  }

  if (minPayout > 0) {
    list = list.filter((o) => parsePayout(o.payout) >= minPayout);
  }

  if (skillMatchOnly) {
    list = list.filter((o) => skillsOverlap(o, techSkills));
  }

  list.sort((a, b) => {
    if (sortBy === SORT_OFFERS.PAYOUT) {
      return parsePayout(b.payout) - parsePayout(a.payout);
    }
    if (sortBy === SORT_OFFERS.SLA) {
      return String(a.sla || '').localeCompare(String(b.sla || ''));
    }
    return (a.distanceMi ?? 999) - (b.distanceMi ?? 999);
  });

  return list;
}
