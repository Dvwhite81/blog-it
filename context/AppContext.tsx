'use client';

import { createContext, useContext, useState } from 'react';
import { authenticateUser } from '@/app/lib/data';
import {
  AppContextType,
  ChildrenProps,
  UserCredentials,
  UserType,
} from '@/utils/types';

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: ChildrenProps) => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

  const login = async (credentials: UserCredentials) => {
    const result = await authenticateUser(credentials);
    console.log('RESULT:', result);
    if (!result || !result.success || !result.user) return;

    const { user } = result;
    setLoggedInUser(user);
  };

  const logout = () => setLoggedInUser(null);

  const value = { loggedInUser, login, logout };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};
