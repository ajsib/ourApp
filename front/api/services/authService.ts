// api/services/authService.js
import { API_URL } from '../config';
import { ENDPOINTS } from '../endpoints';
import { User } from '@/components/Landing/types';

interface RegisterUserResponse {
  error?: string;
  user?: User;
}

interface LoginUserResponse {
  error?: string;
  token?: string;
}

export const registerUser = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  birthday: string,
  profilePicture: string | null
): Promise<RegisterUserResponse> => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('password', password);
  formData.append('birthday', birthday);
  formData.append('role', 'user');
  if (profilePicture) {
    formData.append('profilePicture', {
      uri: profilePicture,
      type: 'image/jpeg',
      name: 'profilePicture.jpg',
    } as any);
  }

  const response = await fetch(`${API_URL}${ENDPOINTS.REGISTER}`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
};


export const loginUser = async (
  email: string,
  password: string
): Promise<LoginUserResponse> => {
  const response = await fetch(`${API_URL}${ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};