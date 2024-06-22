// api/services/tokenManager.ts
import { jwtDecode } from 'jwt-decode';
import { refreshTokenApi } from './refreshTokenApi';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface JwtPayload {
  exp: number;
}

const truncateToken = (token: string | null): string => {
  if (!token) return ''; // Handle null or undefined case
  return `${token.slice(0, 10)}...`;
};
export const isTokenExpired = (token: string): boolean => {
  try {
    console.log('Decoding token to check if expired:', truncateToken(token));
    const { exp } = jwtDecode<JwtPayload>(token);

    if (!exp) return true;

    const expired = Date.now() >= exp * 1000;
    console.log('Token expiration check:', expired ? 'expired' : 'valid');

    return expired;
  } catch (error) {
    console.error('Invalid token', error);
    return true;
  }
};

export const willExpireSoon = (token: string, threshold: number = 5 * 60 * 1000): boolean => {
  try {
    console.log('Decoding token to check if will expire soon:', truncateToken(token));
    const { exp } = jwtDecode<JwtPayload>(token);

    if (!exp) return true;

    const willExpire = Date.now() >= exp * 1000 - threshold;
    console.log('Token will expire soon check:', willExpire ? 'will expire soon' : 'valid for now');

    return willExpire;
  } catch (error) {
    console.error('Invalid token', error);
    return true;
  }
};

export const getToken = async (): Promise<string | null> => {
  console.log('Retrieving session and refresh token from storage');
  
  const session = await getStorageItem('session');
  const refreshToken = await getStorageItem('refreshToken');

  console.log('Session token:', truncateToken(session));
  console.log('Refresh token:', truncateToken(refreshToken));

  if (!session || isTokenExpired(session)) {
    console.log('Session token is expired or not available');
    
    if (refreshToken) {
      console.log('Attempting to refresh token using refresh token');

      try {
        const response = await refreshTokenApi(refreshToken);
        console.log('Token refreshed successfully:', truncateToken(response.token));
        
        await setStorageItem('session', response.token);
        await setStorageItem('refreshToken', response.refreshToken);

        return response.token;
      } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
      }
    }

    console.log('No refresh token available, returning null');
    return null;
  }

  if (willExpireSoon(session)) {
    console.log('Session token will expire soon');

    try {
      const response = await refreshTokenApi(refreshToken!);
      console.log('Token refreshed successfully:', truncateToken(response.token));
      
      await setStorageItem('session', response.token);
      await setStorageItem('refreshToken', response.refreshToken);

      return response.token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }

  console.log('Session token is valid, returning session token');
  return session;
};
