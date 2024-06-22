// components/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { checkPartnershipStatus } from '@/api/services/userService';
import { STORAGE_KEYS, getSecureStoreItem, setSecureStoreItem, removeSecureStoreItem } from '@/hooks/useStorageState';

type AuthContextType = {
  signIn: (token: string, refreshToken: string, userId: string) => void;
  signOut: () => void;
  session?: string | null;
  refreshToken?: string | null;
  userId?: string | null;
  isLoading: boolean;
  partnerInfo?: { partnerId: string; partnershipId: string } | null;
  checkUserPartnershipStatus: () => Promise<void>;
  setPartnerInfo: (info: { partnerId: string; partnershipId: string } | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  refreshToken: null,
  userId: null,
  isLoading: false,
  partnerInfo: null,
  checkUserPartnershipStatus: async () => {},
  setPartnerInfo: () => {},
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
  const [session, setSession] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [partnerInfo, setPartnerInfo] = useState<{ partnerId: string; partnershipId: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => {
    const initializeAuthState = async () => {
      const storedSession = await getSecureStoreItem(STORAGE_KEYS.SESSION);
      const storedRefreshToken = await getSecureStoreItem(STORAGE_KEYS.REFRESH_TOKEN);
      const storedUserId = await getSecureStoreItem(STORAGE_KEYS.USER_ID);
      const storedPartnerInfo = await getSecureStoreItem(STORAGE_KEYS.PARTNER_INFO);

      if (storedSession) setSession(storedSession);
      if (storedRefreshToken) setRefreshToken(storedRefreshToken);
      if (storedUserId) setUserId(storedUserId);
      if (storedPartnerInfo) setPartnerInfo(JSON.parse(storedPartnerInfo));

      setIsLoading(false);
    };

    initializeAuthState();
  }, []);

  const signIn = async (token: string, refreshToken: string, userId: string) => {
    setSession(token);
    setRefreshToken(refreshToken);
    setUserId(userId);
    await setSecureStoreItem(STORAGE_KEYS.SESSION, token);
    await setSecureStoreItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    await setSecureStoreItem(STORAGE_KEYS.USER_ID, userId);
    console.log('SignIn: Checking user partnership status...');
    await checkUserPartnershipStatus();
    navigation.navigate('(auth)');
  };

  const signOut = () => {
    console.log('SignOut: Clearing session and partnership info...');
    setSession(null);
    setRefreshToken(null);
    setUserId(null);
    setPartnerInfo(null);
    removeSecureStoreItem(STORAGE_KEYS.SESSION);
    removeSecureStoreItem(STORAGE_KEYS.REFRESH_TOKEN);
    removeSecureStoreItem(STORAGE_KEYS.USER_ID);
    removeSecureStoreItem(STORAGE_KEYS.PARTNER_INFO);
  };

  const checkUserPartnershipStatus = async () => {
    const storedPartnerInfo = await getSecureStoreItem(STORAGE_KEYS.PARTNER_INFO);
    if (storedPartnerInfo) {
      console.log('CheckUserPartnershipStatus: Partner info already stored locally:', storedPartnerInfo);
      setPartnerInfo(JSON.parse(storedPartnerInfo));
      return;
    }
    try {
      console.log('CheckUserPartnershipStatus: Fetching partnership status from API...');
      const response = await checkPartnershipStatus(session!);
      if (response.status === 'connected') {
        const info = { partnerId: response.partner.id, partnershipId: response.partnershipId };
        console.log('CheckUserPartnershipStatus: Partnership found. Storing info...');
        setPartnerInfo(info);
        await setSecureStoreItem(STORAGE_KEYS.PARTNER_INFO, JSON.stringify(info));
      } else {
        console.log('CheckUserPartnershipStatus: No partnership found.');
        setPartnerInfo(null);
        await setSecureStoreItem(STORAGE_KEYS.PARTNER_INFO, null);
      }
    } catch (error) {
      console.error('Error fetching partnership status:', error);
      setPartnerInfo(null);
      await setSecureStoreItem(STORAGE_KEYS.PARTNER_INFO, null);
    }
  };

  const setPartnerInfoManually = (info: { partnerId: string; partnershipId: string } | null) => {
    console.log('SetPartnerInfo: Manually setting partner info...');
    setPartnerInfo(info);
    setSecureStoreItem(STORAGE_KEYS.PARTNER_INFO, info ? JSON.stringify(info) : null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, refreshToken, userId, isLoading, partnerInfo, checkUserPartnershipStatus, setPartnerInfo: setPartnerInfoManually }}>
      {children}
    </AuthContext.Provider>
  );
};
