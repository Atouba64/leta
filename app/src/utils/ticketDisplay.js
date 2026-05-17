import { TICKET_STATUS } from '../services/mockData';

const TERMINAL = new Set([TICKET_STATUS.COMPLETED, TICKET_STATUS.CANCELLED]);

const TRACKING_STEPS = [
  { key: TICKET_STATUS.PENDING, label: 'Submitted' },
  { key: TICKET_STATUS.ASSIGNED, label: 'Assigned' },
  { key: TICKET_STATUS.EN_ROUTE, label: 'En route' },
  { key: TICKET_STATUS.ON_SITE, label: 'On site' },
  { key: TICKET_STATUS.COMPLETED, label: 'Completed' },
];

const STATUS_ORDER = [
  TICKET_STATUS.PENDING,
  TICKET_STATUS.ASSIGNED,
  TICKET_STATUS.EN_ROUTE,
  TICKET_STATUS.ON_SITE,
  TICKET_STATUS.IN_PROGRESS,
  TICKET_STATUS.ESCALATED,
  TICKET_STATUS.COMPLETED,
  TICKET_STATUS.CANCELLED,
];

export function getTicketLocation(ticket) {
  if (!ticket) return null;
  if (ticket.address?.formatted || ticket.address?.lat) return ticket.address;
  if (ticket.site) return { formatted: ticket.site };
  return null;
}

export function formatTicketId(ticketId) {
  if (!ticketId) return '';
  return ticketId.length > 12 ? `${ticketId.slice(0, 8)}…` : ticketId;
}

export function formatEstimate(ticket) {
  if (!ticket) return null;
  if (ticket.estimate) return ticket.estimate;
  const p = ticket.pricing;
  if (!p) return null;
  const min = p.estimateMin ?? p.min;
  const max = p.estimateMax ?? p.max;
  if (min != null && max != null) return `$${min}–$${max}`;
  if (max != null) return `~$${max}`;
  return null;
}

export function formatCompletedDate(ticket) {
  const raw = ticket?.completedAt || ticket?.updatedAt;
  if (!raw) return null;
  if (typeof raw === 'string') return raw;
  if (raw?.toDate) {
    return raw.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return null;
}

export function getAssignedTechLabel(ticket) {
  if (!ticket) return null;
  if (ticket.techName) return ticket.techName;
  if (ticket.assignedTechId) return 'Technician assigned';
  if (TERMINAL.has(ticket.status)) return null;
  return 'Awaiting assignment';
}

export function getTicketListSubtitle(ticket) {
  const loc = getTicketLocation(ticket);
  const parts = [loc?.formatted || loc?.site];
  const tech = getAssignedTechLabel(ticket);
  if (tech) parts.push(tech);
  const est = formatEstimate(ticket);
  if (est) parts.push(est);
  return parts.filter(Boolean).join(' · ');
}

export function getProgressSteps(ticket) {
  const status = ticket?.status || TICKET_STATUS.PENDING;
  if (status === TICKET_STATUS.CANCELLED) {
    return [
      { label: 'Submitted', state: 'done' },
      { label: 'Cancelled', state: 'current' },
    ];
  }

  const idx = Math.max(
    0,
    TRACKING_STEPS.findIndex((s) => s.key === status),
  );
  const activeIdx =
    status === TICKET_STATUS.IN_PROGRESS || status === TICKET_STATUS.ESCALATED
      ? TRACKING_STEPS.findIndex((s) => s.key === TICKET_STATUS.ON_SITE)
      : idx;

  return TRACKING_STEPS.map((step, i) => {
    if (status === TICKET_STATUS.COMPLETED) {
      return { label: step.label, state: 'done' };
    }
    if (i < activeIdx) return { label: step.label, state: 'done' };
    if (i === activeIdx) return { label: step.label, state: 'current' };
    return { label: step.label, state: 'upcoming' };
  });
}

export function isLiveTrackingAvailable(ticket) {
  if (!ticket) return false;
  const live = new Set([
    TICKET_STATUS.ASSIGNED,
    TICKET_STATUS.EN_ROUTE,
    TICKET_STATUS.ON_SITE,
    TICKET_STATUS.IN_PROGRESS,
    TICKET_STATUS.ESCALATED,
  ]);
  return live.has(ticket.status);
}

export function getStatusSortIndex(status) {
  return STATUS_ORDER.indexOf(status);
}
