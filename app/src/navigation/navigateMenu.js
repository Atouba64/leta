import { goHome } from './goHome';
import { navigationRef } from './navigationRef';

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function jumpToTab(rootName, screenName) {
  navigate(rootName, { screen: screenName });
}

/**
 * Navigate to a menu destination. Works from any nested screen via navigationRef.
 */
export function navigateMenuItem(itemId, auth) {
  const { role, isAuthenticated, logOut } = auth;

  if (itemId === 'sign_out') {
    logOut?.();
    return;
  }

  if (itemId === 'home' || itemId === 'customer_home' || itemId === 'tech_dispatch' || itemId === 'remote_queue') {
    if (itemId === 'home') {
      goHome({ role, isAuthenticated });
      return;
    }
    if (itemId === 'customer_home') {
      jumpToTab('CustomerTabs', 'Home');
      return;
    }
    if (itemId === 'tech_dispatch') {
      jumpToTab('TechnicianTabs', 'Dispatch');
      return;
    }
    if (itemId === 'remote_queue') {
      jumpToTab('RemoteTabs', 'Queue');
      return;
    }
  }

  switch (itemId) {
    case 'role_selection':
      navigate('Home', { screen: 'RoleSelection' });
      break;
    case 'login':
      navigate('Home', { screen: 'Login' });
      break;
    case 'signup':
      navigate('Home', { screen: 'SignUp' });
      break;
    case 'create_ticket':
      navigate('CreateTicket');
      break;
    case 'service_history':
      navigate('ServiceHistory');
      break;
    case 'payment':
      navigate('Payment', {
        ticketId: 'tkt-1001',
        amountCents: 20000,
        title: 'POS terminal offline',
      });
      break;
    case 'customer_profile':
      jumpToTab('CustomerTabs', 'Profile');
      break;
    case 'tech_active':
      jumpToTab('TechnicianTabs', 'Active');
      break;
    case 'tech_earnings':
      jumpToTab('TechnicianTabs', 'Earnings');
      break;
    case 'tech_profile':
      jumpToTab('TechnicianTabs', 'Profile');
      break;
    case 'remote_profile':
      jumpToTab('RemoteTabs', 'Profile');
      break;
    case 'help':
      if (isAuthenticated) {
        navigate('Help');
      } else {
        navigate('Home', { screen: 'Help' });
      }
      break;
    default:
      break;
  }
}
