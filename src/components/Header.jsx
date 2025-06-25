import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthModal } from '../context/AuthContext';
import 'boxicons/css/boxicons.min.css'

const Header = ({ onShowAuth }) => {
  const navigate = useNavigate();
  const { setShowAuthModal } = useAuthModal();
  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
    } else {
      mobileMenu.classList.toggle('hidden');
    }
  };
  // Check auth by token
  const isLoggedIn = !!localStorage.getItem('token');
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <header className='flex justify-between items-center py-4 px-4 lg:px-20 border-b-[0.1px] border-gray-600'>
      <div className="flex items-center gap-2">
        <i className='bx bx-analyse text-2xl'></i>
        <h1 className='text-2xl md:text-2xl lg:text-3xl font-light m-0'>ANALYZER</h1>
      </div>
      <div className="hidden md:flex items-center gap-4 z-50">
        {!isLoggedIn ? (
          <button
            className='bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium hover:bg-white transition'
            onClick={() => setShowAuthModal(true)}
          >
            <i className='bx bx-log-in'></i> SIGN IN
          </button>
        ) : (
          <>
            <button
              className='bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium hover:bg-white transition'
              onClick={handleSignOut}
            >
              <i className='bx bx-log-out'></i> SIGN OUT
            </button>
          </>
        )}
      </div>
      <button onClick={toggleMobileMenu} className='md:hidden text-3xl p-2 z-50' >
        <i className='bx bx-menu'></i>
      </button>
      <div id='mobileMenu' className='hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop:blur-md'>
        <nav className='flex flex-col gap-6 items-center'>
          {!isLoggedIn ? (
            <button
              className='bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium hover:bg-white transition'
              onClick={() => { toggleMobileMenu(); setShowAuthModal(true); }}
            >
              <i className='bx bx-log-in'></i> SIGN IN
            </button>
          ) : (
            <button
              className='bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium hover:bg-white transition'
              onClick={() => { toggleMobileMenu(); handleSignOut(); }}
            >
              <i className='bx bx-log-out'></i> SIGN OUT
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
