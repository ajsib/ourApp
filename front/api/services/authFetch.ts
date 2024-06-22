// api/services/authFetch.ts
import { getToken } from './tokenManager';

const authFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  const token = await getToken();
  
  if (!token) {
    throw new Error('No valid token found. Please log in again.');
  }

  const authInit = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(input, authInit);
};

export default authFetch;