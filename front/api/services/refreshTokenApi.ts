// api/services/refreshTokenAPI.ts
import { API_URL } from '../config';
import { ENDPOINTS } from '../endpoints';

export const refreshTokenApi = async (
  refreshToken: string
): Promise<{ token: string; refreshToken: string }> => {
  const response = await fetch(`${API_URL}${ENDPOINTS.REFRESH_TOKEN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
};
