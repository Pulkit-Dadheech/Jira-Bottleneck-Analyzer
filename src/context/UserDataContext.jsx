import React, { createContext, useContext, useState, useEffect } from 'react';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user data
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/recommendation/userdata', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch user data');
      const data = await res.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Initial fetch on mount
  useEffect(() => { fetchData(); }, []);
  // Listen for login/logout events to refresh or clear data
  useEffect(() => {
    const handleLogin = () => { fetchData(); };
    const handleLogout = () => { setUserData(null); setError(null); setLoading(false); };
    window.addEventListener('login', handleLogin);
    window.addEventListener('logout', handleLogout);
    return () => {
      window.removeEventListener('login', handleLogin);
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, loading, error, refresh: fetchData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
