/** Firestore collection & field constants — see also ../../docs/FIRESTORE_SCHEMA.md */

export const COLLECTIONS = {
  USERS: 'users',
  TICKETS: 'tickets',
  OFFERS: 'offers',
  ESCALATIONS: 'escalations',
  LIVE_SESSIONS: 'live_sessions',
  TICKET_EVENTS: 'events',
  SIGNALS: 'signals',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  FIELD_TECH: 'field_tech',
  REMOTE_TECH: 'remote_tech',
  ADMIN: 'admin',
  PARTNER_DISPATCHER: 'partner_dispatcher',
};

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

export const OFFER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  EXPIRED: 'expired',
};

export const LIVE_SESSION_STATUS = {
  WAITING: 'waiting',
  ACTIVE: 'active',
  ENDED: 'ended',
};
