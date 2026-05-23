import { DEMO_ACTIVE_JOB, DEMO_BARRISTER_ACTIVE_JOB, offerToActiveJob } from './mockData';

let demoActiveJob = null;

/** Demo-only: which ticket shows on Active after accept. */
export function getDemoActiveJob() {
  return demoActiveJob || DEMO_ACTIVE_JOB;
}

export function setDemoActiveJobFromOffer(offer) {
  demoActiveJob = offerToActiveJob(offer) || DEMO_BARRISTER_ACTIVE_JOB;
}

export function resetDemoActiveJob() {
  demoActiveJob = null;
}
