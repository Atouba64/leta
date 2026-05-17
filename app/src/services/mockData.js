/** Demo tickets & offers until Firestore is wired */

export const TICKET_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  EN_ROUTE: 'en_route',
  ON_SITE: 'on_site',
  IN_PROGRESS: 'in_progress',
  ESCALATED: 'escalated',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const DEMO_CUSTOMER_TICKETS = [
  {
    id: 'tkt-1001',
    title: 'POS terminal offline',
    site: '124 Peachtree St, Atlanta, GA',
    address: { formatted: '124 Peachtree St, Atlanta, GA', lat: 33.749, lng: -84.388 },
    status: TICKET_STATUS.EN_ROUTE,
    estimate: '$185–$240',
    techName: 'Jordan M.',
    etaMinutes: 18,
    skillTags: ['POS Systems', 'Networking'],
    description: 'Registers 3–5 show offline after power blip. Store open until 9pm.',
  },
  {
    id: 'tkt-1002',
    title: 'Printer queue stuck',
    site: '88 Main St, Gainesville, GA',
    address: { formatted: '88 Main St, Gainesville, GA', lat: 34.2979, lng: -83.8247 },
    status: TICKET_STATUS.COMPLETED,
    estimate: '$95',
    techName: 'Alex R.',
    completedAt: 'May 10, 2026',
    skillTags: ['Printers'],
  },
];

export const DEMO_TECH_OFFERS = [
  {
    id: 'offer-501',
    title: 'Network drop — new register',
    distanceMi: 4.2,
    payout: '$142',
    sla: '4 hr',
    skills: ['Networking'],
    urgent: false,
  },
  {
    id: 'offer-502',
    title: 'Server rack cable trace',
    distanceMi: 11.8,
    payout: '$210',
    sla: 'NBD',
    skills: ['Hardware', 'Networking'],
    urgent: true,
  },
];

export const DEMO_ACTIVE_JOB = {
  id: 'job-501',
  title: 'Network drop — new register',
  customer: 'Peachtree Retail Co.',
  contact: 'Brad — Store Mgr',
  phone: '(404) 555-0142',
  accessNotes: 'Ask for Brad at loading dock. Roof keys at service desk.',
  status: TICKET_STATUS.ON_SITE,
  checklist: [
    { id: 'c1', label: 'Verify scope with POC', done: true },
    { id: 'c2', label: 'Before photos', done: true },
    { id: 'c3', label: 'Complete repair', done: false },
    { id: 'c4', label: 'Customer signature', done: false },
  ],
};

export const DEMO_REMOTE_QUEUE = [
  {
    id: 'esc-301',
    sessionId: 'live-demo-301',
    ticketId: 'tkt-8842',
    title: 'Cisco switch stack — uplink flapping',
    techName: 'Jordan M.',
    site: 'Savannah, GA',
    waitSeconds: 42,
    priority: 'high',
  },
  {
    id: 'esc-302',
    sessionId: 'live-demo-302',
    ticketId: 'tkt-8849',
    title: 'Windows imaging failure',
    techName: 'Sam K.',
    site: 'Macon, GA',
    waitSeconds: 180,
    priority: 'normal',
  },
];
