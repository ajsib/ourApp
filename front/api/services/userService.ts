// api/userService.ts
import { API_URL } from '../config';
import { ENDPOINTS } from '../endpoints';

interface CheckPartnershipStatusResponse {
  status: 'pending' | 'connected';
  partner?: {
    id: string;
  };
}

export const checkPartnershipStatus = async (token: string): Promise<CheckPartnershipStatusResponse> => {
  try {
    const response = await fetch(`${API_URL}${ENDPOINTS.CHECK_PARTNERSHIP_STATUS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }); 

    if (!response.ok) {
      throw new Error('Failed to fetch partnership status');
    }

    const data = await response.json();

    if (!data.isConnected) {
      return { status: 'pending' };
    } else if (data.isConnected && data.partnerId) {
      return {
        status: 'connected',
        partner: {
          id: data.partnerId,
        },
      };
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Error checking partnership status:', error);
    throw error;
  }
};
