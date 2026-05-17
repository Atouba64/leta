/**
 * Demo ticket payloads for track.html (keep in sync with app mockData).
 * Production: replace with a read-only API or Firestore public lookup by ticket id.
 */
window.LETA_TRACK_TICKETS = {
  'tkt-1001': {
    id: 'tkt-1001',
    title: 'POS terminal offline',
    status: 'en_route',
    statusLabel: 'En route',
    site: '124 Peachtree St, Atlanta, GA',
    lat: 33.749,
    lng: -84.388,
    techName: 'Jordan M.',
    etaMinutes: 18,
    estimate: '$185–$240',
    skillTags: ['POS Systems', 'Networking'],
    description: 'Registers 3–5 show offline after power blip. Store open until 9pm.',
    steps: ['Submitted', 'Assigned', 'En route', 'On site', 'Completed'],
    currentStep: 2,
  },
  'tkt-1002': {
    id: 'tkt-1002',
    title: 'Printer queue stuck',
    status: 'completed',
    statusLabel: 'Completed',
    site: '88 Main St, Gainesville, GA',
    lat: 34.2979,
    lng: -83.8247,
    techName: 'Alex R.',
    estimate: '$95',
    completedAt: 'May 10, 2026',
    skillTags: ['Printers'],
    steps: ['Submitted', 'Assigned', 'En route', 'On site', 'Completed'],
    currentStep: 4,
  },
};
