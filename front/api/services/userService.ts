// api/services/userService.ts
import { API_URL } from '../config';
import { ENDPOINTS } from '../endpoints';
import authFetch from './authFetch';

export type CheckPartnershipStatusResponse = {
  status: 'connected' | 'not connected' | 'pending';
  partner?: {
    id: string;
  };
  partnershipId?: string;
};

export const checkPartnershipStatus = async (token: string): Promise<CheckPartnershipStatusResponse> => {
  try {
    const response = await authFetch(`${API_URL}${ENDPOINTS.CHECK_PARTNERSHIP_STATUS}`, {
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

    if (data.status === 'not connected') {
      return { status: 'not connected' };
    } else if (data.status === 'connected' && data.partnerId) {
      return {
        status: 'connected',
        partner: {
          id: data.partnerId,
        },
        partnershipId: data.partnershipId,
      };
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Error checking partnership status:', error);
    throw error;
  }
};

interface GenerateCodeResponse {
  code: string;
}

export const generateCode = async (token: string): Promise<GenerateCodeResponse> => {
  try {
    const response = await authFetch(`${API_URL}${ENDPOINTS.GENERATE_CODE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to generate code');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};

export interface ProfileInfo {
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
}

export interface PartnerResponse {
  yourProfile: ProfileInfo;
  partnerProfile: ProfileInfo;
}

export const enterCode = async (token: string, code: string): Promise<PartnerResponse> => {
  try {
    const response = await authFetch(`${API_URL}${ENDPOINTS.ENTER_CODE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to enter code');
    }

    const yourProfileHeader = JSON.parse(response.headers.get('x-your-profile')!);
    const partnerProfileHeader = JSON.parse(response.headers.get('x-partner-profile')!);

    const yourProfile = {
      firstName: yourProfileHeader.firstName,
      lastName: yourProfileHeader.lastName,
      profilePictureUrl: `data:image/jpeg;base64,${yourProfileHeader.profilePicture}`
    };

    const partnerProfile = {
      firstName: partnerProfileHeader.firstName,
      lastName: partnerProfileHeader.lastName,
      profilePictureUrl: `data:image/jpeg;base64,${partnerProfileHeader.profilePicture}`
    };

    const data = await response.json();

    return {
      yourProfile,
      partnerProfile
    };
  } catch (error) {
    console.error('Error entering code:', error);
    throw error;
  }
};