import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const STORAGE_KEYS = {
  SESSION: 'session',
  REFRESH_TOKEN: 'refreshToken',
  USER_ID: 'userId',
  PARTNER_INFO: 'partnerInfo',
};

export async function getSecureStoreItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Local storage is unavailable:', e);
      return null;
    }
  } else {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error(`Error getting item ${key} from SecureStore`, e);
      return null;
    }
  }
}

export async function setSecureStoreItem(key: string, value: string | null): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    try {
      if (value === null) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (e) {
      console.error(`Error setting item ${key} to SecureStore`, e);
    }
  }
}

export async function removeSecureStoreItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error(`Error removing item ${key} from SecureStore`, e);
    }
  }
}
