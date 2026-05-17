import { navigateMenuItem } from './navigateMenu';

/** Navigate from a profile menu row (reuses app menu routes + profile-only screens). */
export function navigateProfileItem(item, auth) {
  const target = item.navigateId || item.id;
  navigateMenuItem(target, auth);
}
