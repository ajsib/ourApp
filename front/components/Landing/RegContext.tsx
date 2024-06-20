import React, { createContext, useState, useContext } from 'react';
import { registerUser } from '@/api/services/authService';
import { User } from '@/components/Landing/types';

interface RegContextType {
  step: number;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  birthday: string;
  profileImage: string | null;
  error: string;
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setBirthday: (birthday: string) => void;
  setProfileImage: (profileImage: string | null) => void;
  setError: (error: string) => void;
  register: () => void;
}

const RegContext = createContext<RegContextType | undefined>(undefined);

export const RegProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const register = async () => {
    if (!firstName || !lastName || !birthday) {
      setError('All fields must be filled');
      return;
    }

    setError('');

    try {
      const response = await registerUser(email, firstName, lastName, password, birthday, profileImage);
      if (response.error) {
        setError(response.error);
      } else {
        setStep(4); 
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <RegContext.Provider
      value={{
        step,
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        birthday,
        profileImage,
        error,
        setStep,
        setEmail,
        setPassword,
        setConfirmPassword,
        setFirstName,
        setLastName,
        setBirthday,
        setProfileImage,
        setError,
        register,
      }}
    >
      {children}
    </RegContext.Provider>
  );
};

export const useRegContext = (): RegContextType => {
  const context = useContext(RegContext);
  if (!context) {
    throw new Error('useRegContext must be used within a RegProvider');
  }
  return context;
};
