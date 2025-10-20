import { useState, useEffect } from 'react';

interface UserData {
  id: string;
  email: string;
  userType: 'student' | 'school';
  name: string;
  loginTime: string;
  profileComplete?: boolean;
}

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const loginStatus = localStorage.getItem('isLoggedIn');
        const userDataString = localStorage.getItem('userData');

        if (loginStatus === 'true' && userDataString) {
          const parsedUserData = JSON.parse(userDataString);
          setIsLoggedIn(true);
          setUserData(parsedUserData);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error('Erro ao verificar status de autenticação:', error);
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    // Listener para mudanças no localStorage
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserData(null);
  };

  return {
    isLoggedIn,
    userData,
    loading,
    logout
  };
};
