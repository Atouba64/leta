/** Partner channel skins — how field techs see partner-sourced work on Leta. */

export const PARTNER_CHANNEL = {
  DIRECT: 'direct',
  BARRISTER: 'barrister',
};

export const BARRISTER_PARTNER_ID = 'barrister-global-services';

export const BARRISTER_CHANNEL = {
  id: PARTNER_CHANNEL.BARRISTER,
  partnerId: BARRISTER_PARTNER_ID,
  displayName: 'Barrister dispatch',
  shortLabel: 'Barrister',
  /** Tech sees partner WO # prominently (BAM-style). */
  workOrderLabel: 'Partner WO #',
  liaisonNote:
    'Leta is your liaison — calls and messages stay on this ticket. Barrister dispatch sees the same timeline.',
  contactRules: [
    'Contact POC by name only — do not call the store main line unless dispatch approves.',
    'Confirm work order is still open before you leave (tap below).',
    'Use in-app voice to reach dispatch — your personal number stays private.',
  ],
  preDepartureChecklist: [
    { id: 'wo_open', label: 'Confirm WO still open with dispatch', required: true },
    { id: 'scope', label: 'Read scope & access notes', required: true },
    { id: 'tools', label: 'Tools / parts noted', required: false },
  ],
};

export function getPartnerChannelConfig(offerOrTicket) {
  if (!offerOrTicket) return null;
  const channel = offerOrTicket.partnerChannel;
  const partnerId = offerOrTicket.partnerId;
  if (channel === PARTNER_CHANNEL.BARRISTER || partnerId === BARRISTER_PARTNER_ID) {
    return BARRISTER_CHANNEL;
  }
  return null;
}
