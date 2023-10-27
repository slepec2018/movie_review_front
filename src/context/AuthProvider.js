import React, { createContext, useState, useEffect } from 'react';
import { signInUser, getIsAuth } from '../api/auth';
import { useNotification } from '../hooks';

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: ''
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });

  const { updateNotofication } = useNotification();
  
  const handleLogin = async (email, password) => { 
    setAuthInfo({ ...defaultAuthInfo, isPending: true });

    const { error, user } = await signInUser({ email, password });

    if (error) {
      updateNotofication({ type: 'error', message: error });
      return setAuthInfo({ ...defaultAuthInfo, isPending: false, error });
    }

    setAuthInfo({ profile: { ...user }, isLoggedIn: true, isPending: false, error: '' });

    localStorage.setItem('auth-token', user.token);
  };

  const isAuth = async () => { 
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return;
    }

    setAuthInfo({ ...defaultAuthInfo, isPending: true });

    const { error, user } = await getIsAuth(token);
    
    if (error) {
      updateNotofication({ type: 'error', message: error });
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({ profile: { ...user }, isLoggedIn: true, isPending: false, error: '' });
  };

  const handleLogout = () => { 
    localStorage.removeItem('auth-token');
    setAuthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => { 
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={{authInfo, handleLogin, handleLogout, isAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
