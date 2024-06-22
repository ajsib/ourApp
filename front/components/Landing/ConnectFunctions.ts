// @/components/Landing/ConnectFunctions.ts
import { generateCode, enterCode } from '@/api/services/userService';

export interface ProfileInfo {
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
}

export interface PartnerResponse {
  yourProfile: ProfileInfo;
  partnerProfile: ProfileInfo;
}


interface GenerateCodeResponse {
  code: string;
}

export const handleEnterCode = async (token: string, code: string): Promise<PartnerResponse> => {
  try {
    const partnerInfo = await enterCode(token, code);
    return partnerInfo;
  } catch (error) {
    throw new Error(`Error entering code: ${error.message}`);
  }
};

export const handleGenerateCode = async (token: string): Promise<GenerateCodeResponse> => {
  try {
    const response = await generateCode(token);
    return response;
  } catch (error) {
    throw new Error(`Error generating code: ${error.message}`);
  }
};
