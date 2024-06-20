// components/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { useNavigation } from '@react-navigation/native';
import { checkPartnershipStatus } from '@/api/services/userService';

type AuthContextType = {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  isPartnerConnected?: boolean;
  partner?: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [isPartnerConnected, setIsPartnerConnected] = useState<boolean | undefined>(undefined);
  const [partner, setPartner] = useState<{
    id: string;
    firstName: string;
    lastName: string;
  } | undefined>(undefined);
  const navigation = useNavigation();

  const signIn = async (token: string) => {
    try {
      const response = await checkPartnershipStatus(token);
      if (response.status === 'connected') {
        setIsPartnerConnected(true);
        setPartner(response.partner);
      } else {
        setIsPartnerConnected(false);
        setPartner(undefined);
      }
    } catch (error) {
      console.error('Error fetching partnership status:', error);
      setIsPartnerConnected(false);
      setPartner(undefined);
    }
    console.log("Partner", isPartnerConnected);
    navigation.navigate('(auth)');
    setSession(token);
  };

  const signOut = () => {
    setSession(null);
    setIsPartnerConnected(undefined);
    setPartner(undefined);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading, isPartnerConnected, partner }}>
      {children}
    </AuthContext.Provider>
  );
};
