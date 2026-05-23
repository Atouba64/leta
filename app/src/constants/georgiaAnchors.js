/**
 * Georgia service anchors — keep aligned with data/georgia-coverage.json
 * Used for labels, filters, and future home-base selection in the app.
 */

export const GEORGIA_CORRIDORS = [
  { id: 'i-75', name: 'I-75' },
  { id: 'i-16', name: 'I-16' },
  { id: 'i-85', name: 'I-85' },
  { id: 'i-985', name: 'I-985' },
  { id: 'i-20', name: 'I-20' },
];

export const GEORGIA_ANCHORS = [
  { id: 'metro-atlanta', name: 'Metro Atlanta', region: 'core-density', phase: 0 },
  { id: 'dalton', name: 'Dalton', region: 'extremes-corners', phase: 2 },
  { id: 'bainbridge-albany', name: 'Bainbridge / Albany', region: 'extremes-corners', phase: 3 },
  { id: 'savannah-brunswick', name: 'Savannah / Brunswick', region: 'extremes-corners', phase: 1 },
  { id: 'augusta', name: 'Augusta', region: 'extremes-corners', phase: 1 },
  { id: 'columbus', name: 'Columbus', region: 'extremes-corners', phase: 1 },
  { id: 'macon-warner-robins', name: 'Macon / Warner Robins', region: 'central-heart', phase: 1, centralHub: true },
  { id: 'valdosta', name: 'Valdosta', region: 'deep-south-i75', phase: 2 },
  { id: 'tifton', name: 'Tifton', region: 'deep-south-i75', phase: 2 },
  { id: 'gainesville', name: 'Gainesville', region: 'north-northeast', phase: 1 },
  { id: 'athens', name: 'Athens', region: 'north-northeast', phase: 1 },
  { id: 'rome', name: 'Rome', region: 'north-northeast', phase: 2 },
  { id: 'lagrange-newnan', name: 'LaGrange / Newnan', region: 'western-i85', phase: 2 },
  { id: 'statesboro', name: 'Statesboro', region: 'eastern-inland', phase: 2 },
];

export function getCentralHub() {
  return GEORGIA_ANCHORS.find((a) => a.centralHub);
}

export function anchorLabelById(id) {
  return GEORGIA_ANCHORS.find((a) => a.id === id)?.name || id;
}
