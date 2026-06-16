/** Partner channel skins — how field techs see partner-sourced work on Leta. */

export const PARTNER_CHANNEL = {
  DIRECT: 'direct',
  BARRISTER: 'barrister',
  SERVICE_CHANNEL: 'service_channel',
  FIELD_NATION: 'field_nation',
  TECHLINK: 'techlink',
  SAMSARA: 'samsara',
  QMERIT: 'qmerit',
  GOV_GEORGIA: 'gov_georgia',
};

export const BARRISTER_PARTNER_ID = 'barrister-global-services';

export const GENERIC_ENTERPRISE_CHANNEL = {
  id: 'enterprise_cmms',
  displayName: 'Enterprise CMMS',
  shortLabel: 'Enterprise',
  workOrderLabel: 'CMMS Ticket #',
  liaisonNote: 'Leta syncs this ticket with the enterprise facility management system.',
  contactRules: [
    'Check in via the app geo-fence to register arrival.',
    'Capture required photos of the rack/equipment before and after.',
    'Do not discuss billing or Leta operations with the site manager.',
  ],
  preDepartureChecklist: [
    { id: 'review_scope', label: 'Review enterprise scope of work', required: true },
    { id: 'confirm_parts', label: 'Confirm parts tracking / tracking #', required: true },
  ],
};

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
  const source = offerOrTicket.sourceSystem;
  
  if (channel === PARTNER_CHANNEL.BARRISTER || partnerId === BARRISTER_PARTNER_ID) {
    return BARRISTER_CHANNEL;
  }
  
  if (source === 'servicechannel' || source === 'corrigo' || source === 'fmpilot') {
    return { ...GENERIC_ENTERPRISE_CHANNEL, displayName: source === 'servicechannel' ? 'ServiceChannel' : source === 'corrigo' ? 'Corrigo' : 'Facility Management' };
  }
  
  if (source === 'samsara' || source === 'radius') {
    return { ...GENERIC_ENTERPRISE_CHANNEL, displayName: 'Telematics / Fleet GPS', workOrderLabel: 'Asset ID' };
  }

  if (source === 'qmerit' || source === 'blink') {
    return { ...GENERIC_ENTERPRISE_CHANNEL, displayName: 'EV Charging Infrastructure', workOrderLabel: 'Installation ID' };
  }

  if (source === 'luxer' || source === 'parcel_pending') {
    return { ...GENERIC_ENTERPRISE_CHANNEL, displayName: 'Smart Locker Deployment', workOrderLabel: 'Site ID' };
  }

  if (source === 'fieldnation' || source === 'workmarket') {
     return { ...GENERIC_ENTERPRISE_CHANNEL, displayName: source === 'fieldnation' ? 'Field Nation Route' : 'WorkMarket Route' };
  }

  if (source === 'gov_georgia' || source === 'sourcewell') {
     return { ...GENERIC_ENTERPRISE_CHANNEL, displayName: 'State / Gov Contract', workOrderLabel: 'PO / Contract #' };
  }
  
  return null;
}
