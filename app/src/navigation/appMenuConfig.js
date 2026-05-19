import { ROLES } from '../contexts/AuthContext';

/** @typedef {{ id: string, label: string, icon: string, type?: 'action' }} MenuItem */

/** @type {MenuItem[]} */
const AUTH_MENU = [
  { id: 'role_selection', label: 'Choose your role', icon: 'people-outline' },
  { id: 'login', label: 'Sign in', icon: 'log-in-outline' },
  { id: 'signup', label: 'Create account', icon: 'person-add-outline' },
  { id: 'help', label: 'Help & support', icon: 'help-circle-outline' },
];

/** @type {MenuItem[]} */
const CUSTOMER_MENU = [
  { id: 'customer_home', label: 'Home', icon: 'home-outline' },
  { id: 'create_ticket', label: 'Request service', icon: 'add-circle-outline' },
  { id: 'service_history', label: 'Service history', icon: 'time-outline' },
  { id: 'payment', label: 'Billing & payment', icon: 'card-outline' },
  { id: 'customer_profile', label: 'Profile', icon: 'person-outline' },
  { id: 'help', label: 'Help & support', icon: 'help-circle-outline' },
  { id: 'sign_out', label: 'Sign out', icon: 'log-out-outline', type: 'action' },
];

/** @type {MenuItem[]} */
const FIELD_MENU = [
  { id: 'tech_onboarding', label: 'Onboarding & questions', icon: 'document-text-outline' },
  { id: 'tech_dispatch', label: 'Dispatch board', icon: 'map-outline' },
  { id: 'tech_active', label: 'Active job', icon: 'construct-outline' },
  { id: 'tech_earnings', label: 'Earnings', icon: 'wallet-outline' },
  { id: 'tech_profile', label: 'Profile', icon: 'person-outline' },
  { id: 'help', label: 'Help & support', icon: 'help-circle-outline' },
  { id: 'sign_out', label: 'Sign out', icon: 'log-out-outline', type: 'action' },
];

/** @type {MenuItem[]} */
const REMOTE_MENU = [
  { id: 'remote_queue', label: 'Overwatch queue', icon: 'headset-outline' },
  { id: 'remote_profile', label: 'Profile', icon: 'person-outline' },
  { id: 'help', label: 'Help & support', icon: 'help-circle-outline' },
  { id: 'sign_out', label: 'Sign out', icon: 'log-out-outline', type: 'action' },
];

const PARTNER_MENU = [
  { id: 'partner_home', label: 'Work orders', icon: 'briefcase-outline' },
  { id: 'partner_create', label: 'Create work order', icon: 'add-circle-outline' },
  { id: 'partner_profile', label: 'Profile', icon: 'person-outline' },
  { id: 'help', label: 'Help & support', icon: 'help-circle-outline' },
  { id: 'sign_out', label: 'Sign out', icon: 'log-out-outline', type: 'action' },
];

export function getMenuItems({ role, isAuthenticated }) {
  if (!isAuthenticated) return AUTH_MENU;
  if (role === ROLES.FIELD_TECH) return FIELD_MENU;
  if (role === ROLES.REMOTE_TECH) return REMOTE_MENU;
  if (role === ROLES.PARTNER_DISPATCHER) return PARTNER_MENU;
  return CUSTOMER_MENU;
}
