// components/Landing/LoginContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { loginUser } from '@/api/services/authService';
import { useAuth } from '@/components/AuthContext';

interface LoginContextType {
  email: string;
  password: string;
  error: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setError: (error: string) => void;
  login: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const login = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');

    try {
      const response = await loginUser(email, password);
      if (response.error) {
        setError(response.error);
      } else {
        signIn(response.token);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <LoginContext.Provider
      value={{
        email,
        password,
        error,
        setEmail,
        setPassword,
        setError,
        login,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
