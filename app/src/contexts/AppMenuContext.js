import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import AppMenuModal from '../components/AppMenuModal';
import { getMenuItems } from '../navigation/appMenuConfig';
import { navigateMenuItem } from '../navigation/navigateMenu';
import { registerAppMenuHandler, unregisterAppMenuHandler } from '../navigation/appMenuBridge';

const AppMenuContext = createContext(null);

export function AppMenuProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const auth = useAuth();
  const items = useMemo(
    () => getMenuItems({ role: auth.role, isAuthenticated: auth.isAuthenticated }),
    [auth.role, auth.isAuthenticated],
  );

  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);

  useEffect(() => {
    registerAppMenuHandler(openMenu);
    return () => unregisterAppMenuHandler();
  }, [openMenu]);

  const onSelect = useCallback(
    (item) => {
      setVisible(false);
      navigateMenuItem(item.id, auth);
    },
    [auth],
  );

  const value = useMemo(() => ({ openMenu }), [openMenu]);

  return (
    <AppMenuContext.Provider value={value}>
      {children}
      <AppMenuModal visible={visible} items={items} onClose={closeMenu} onSelect={onSelect} />
    </AppMenuContext.Provider>
  );
}

export function useAppMenu() {
  const ctx = useContext(AppMenuContext);
  if (!ctx) {
    throw new Error('useAppMenu must be used within AppMenuProvider');
  }
  return ctx;
}
