import { getPartnerChannelConfig, PARTNER_CHANNEL } from '../constants/partnerChannels';

export function isPartnerChannelOffer(offer) {
  return Boolean(getPartnerChannelConfig(offer));
}

export function isBarristerChannel(offerOrTicket) {
  const cfg = getPartnerChannelConfig(offerOrTicket);
  return cfg?.id === PARTNER_CHANNEL.BARRISTER;
}

export function formatPartnerSla(offer) {
  if (!offer?.sla) return 'Per partner SLA';
  return offer.sla;
}

export function getPocDisplay(offerOrTicket) {
  const poc = offerOrTicket?.poc || {};
  const name = poc.name || offerOrTicket?.contact || 'Site POC';
  const phone = poc.phone || offerOrTicket?.phone || '';
  const role = poc.role || '';
  return { name, phone, role };
}
