/** Field-tech skill catalog — aligned with web onboarding & partner routing */

export const PROFICIENCY = {
  LEARNING: 'learning',
  COMFORTABLE: 'comfortable',
  EXPERT: 'expert',
};

export const PROFICIENCY_LABELS = {
  [PROFICIENCY.LEARNING]: 'Learning',
  [PROFICIENCY.COMFORTABLE]: 'Comfortable',
  [PROFICIENCY.EXPERT]: 'Expert',
};

export const SKILL_CATALOG = [
  { id: 'pc_mac', label: 'PC / Mac repair' },
  { id: 'networking', label: 'Networking / Wi-Fi' },
  { id: 'printers', label: 'Printers & peripherals' },
  { id: 'pos', label: 'POS / retail systems' },
  { id: 'av', label: 'AV / displays' },
  { id: 'cabling', label: 'Cable / rack / patch' },
  { id: 'iot', label: 'Smart home / IoT' },
  { id: 'low_voltage', label: 'Low voltage / access' },
  { id: 'cradlepoint', label: 'Cradlepoint / LTE' },
  { id: 'cisco', label: 'Cisco / enterprise switch' },
  { id: 'windows_server', label: 'Windows server basics' },
  { id: 'other', label: 'Other / custom' },
];

export const DEFAULT_TECH_PROFILE = {
  headline: '',
  bio: '',
  skillEntries: [],
  travelRadiusMi: 30,
  minPayout: 0,
  highlightSkillIds: [],
  workPreferences: [],
};

export const WORK_PREFERENCE_OPTIONS = [
  'Quick break-fix',
  'Multi-hour projects',
  'Retail hours only',
  'Partner dispatch',
  'Premium travel (60+ mi)',
];

export const SORT_OFFERS = {
  NEAREST: 'nearest',
  PAYOUT: 'payout',
  SLA: 'sla',
};
