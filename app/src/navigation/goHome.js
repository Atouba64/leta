import { CommonActions } from '@react-navigation/native';
import { ROLES } from '../contexts/AuthContext';
import { navigationRef } from './navigationRef';

const ROLE_HOME = {
  [ROLES.CUSTOMER]: { root: 'CustomerTabs', screen: 'Home' },
  [ROLES.FIELD_TECH]: { root: 'TechnicianTabs', screen: 'Dispatch' },
  [ROLES.REMOTE_TECH]: { root: 'RemoteTabs', screen: 'Queue' },
  [ROLES.PARTNER_DISPATCHER]: { root: 'PartnerTabs', screen: 'WorkOrders' },
};

/**
 * Reset navigation to the role home tab, or RoleSelection when signed out.
 */
export function goHome({ navigation, role, isAuthenticated }) {
  const nav = navigation || navigationRef;

  if (!isAuthenticated || !role || !ROLE_HOME[role]) {
    if (nav?.navigate) {
      nav.navigate('Home', { screen: 'RoleSelection' });
    }
    return;
  }

  const home = ROLE_HOME[role];
  const action = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: home.root,
        state: {
          index: 0,
          routes: [{ name: home.screen }],
        },
      },
    ],
  });

  if (nav?.dispatch) {
    nav.dispatch(action);
  }
}
