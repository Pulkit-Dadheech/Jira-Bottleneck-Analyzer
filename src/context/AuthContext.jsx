import React, { createContext, useContext, useState } from 'react';

const AuthModalContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <AuthModalContext.Provider value={{ showAuthModal, setShowAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
