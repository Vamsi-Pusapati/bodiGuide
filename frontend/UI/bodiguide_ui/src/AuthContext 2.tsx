// AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
type AuthContextType = {
  user: { uniqueCode: number; type: 'doctor' | 'patient' } | null;
  login: (uniqueCode: number, userType: 'doctor' | 'patient') => void;
  logout: () => void;
};

// Create the context with a default undefined value, since it will always be provided by the AuthProvider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

// Create a provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ uniqueCode: number; type: 'doctor' | 'patient' } | null>(null);

  const login = (uniqueCode: number, userType: 'doctor' | 'patient') => {
    setUser({ uniqueCode, type: userType });
  };

  const logout = () => {
    setUser(null);
  };

  // The value prop of the provider will contain the user state, login, and logout functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
