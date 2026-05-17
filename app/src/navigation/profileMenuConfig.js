import { ROLES } from '../contexts/AuthContext';

/**
 * Profile tab menu rows. `navigateId` is handled by navigateProfileItem (maps to screens/tabs).
 * @typedef {{ id: string, navigateId: string, label: string, subtitle?: string, icon: string, type?: 'action' }} ProfileMenuItem
 */

/** @type {ProfileMenuItem[]} */
const CUSTOMER_PROFILE = [
  {
    id: 'account',
    navigateId: 'account_details',
    label: 'Account details',
    subtitle: 'Name, email, and role',
    icon: 'person-circle-outline',
  },
  {
    id: 'history',
    navigateId: 'service_history',
    label: 'Service history',
    subtitle: 'Past and active tickets',
    icon: 'time-outline',
  },
  {
    id: 'request',
    navigateId: 'create_ticket',
    label: 'Request service',
    subtitle: 'New onsite IT visit',
    icon: 'add-circle-outline',
  },
  {
    id: 'billing',
    navigateId: 'payment',
    label: 'Billing & payment',
    subtitle: 'Pay for completed work',
    icon: 'card-outline',
  },
  {
    id: 'help',
    navigateId: 'help',
    label: 'Help & support',
    subtitle: 'Tips and contact',
    icon: 'help-circle-outline',
  },
  {
    id: 'sign_out',
    navigateId: 'sign_out',
    label: 'Sign out',
    icon: 'log-out-outline',
    type: 'action',
  },
];

/** @type {ProfileMenuItem[]} */
const FIELD_PROFILE = [
  {
    id: 'onboarding',
    navigateId: 'tech_onboarding',
    label: 'Onboarding & questions',
    subtitle: 'Required · complete on web',
    icon: 'document-text-outline',
  },
  {
    id: 'account',
    navigateId: 'account_details',
    label: 'Account details',
    subtitle: 'Contact and contractor status',
    icon: 'person-circle-outline',
  },
  {
    id: 'credentials',
    navigateId: 'tech_credentials',
    label: 'Skills & credentials',
    subtitle: 'Tags, insurance, activation',
    icon: 'ribbon-outline',
  },
  {
    id: 'dispatch',
    navigateId: 'tech_dispatch',
    label: 'Dispatch board',
    subtitle: 'Offers and go active',
    icon: 'map-outline',
  },
  {
    id: 'earnings',
    navigateId: 'tech_earnings',
    label: 'Earnings',
    subtitle: 'Payouts and completed jobs',
    icon: 'wallet-outline',
  },
  {
    id: 'help',
    navigateId: 'help',
    label: 'Help & support',
    icon: 'help-circle-outline',
  },
  {
    id: 'sign_out',
    navigateId: 'sign_out',
    label: 'Sign out',
    icon: 'log-out-outline',
    type: 'action',
  },
];

/** @type {ProfileMenuItem[]} */
const REMOTE_PROFILE = [
  {
    id: 'account',
    navigateId: 'account_details',
    label: 'Account details',
    subtitle: 'Contact and expert role',
    icon: 'person-circle-outline',
  },
  {
    id: 'expert',
    navigateId: 'remote_expert_details',
    label: 'Expert profile',
    subtitle: 'Experience and overwatch scope',
    icon: 'videocam-outline',
  },
  {
    id: 'queue',
    navigateId: 'remote_queue',
    label: 'Overwatch queue',
    subtitle: 'Live assist sessions',
    icon: 'headset-outline',
  },
  {
    id: 'help',
    navigateId: 'help',
    label: 'Help & support',
    icon: 'help-circle-outline',
  },
  {
    id: 'sign_out',
    navigateId: 'sign_out',
    label: 'Sign out',
    icon: 'log-out-outline',
    type: 'action',
  },
];

export function getProfileMenuItems(role) {
  if (role === ROLES.FIELD_TECH) return FIELD_PROFILE;
  if (role === ROLES.REMOTE_TECH) return REMOTE_PROFILE;
  return CUSTOMER_PROFILE;
}

export function getRoleLabel(role) {
  if (role === ROLES.FIELD_TECH) return 'Field technician';
  if (role === ROLES.REMOTE_TECH) return 'Remote expert';
  return 'Customer';
}
