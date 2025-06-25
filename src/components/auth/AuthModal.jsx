import React, { useState } from 'react';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';

const AuthModal = ({ onClose }) => {
  const [view, setView] = useState('signin'); // 'signin' | 'signup' | 'forgot' | 'reset'
  const [resetToken, setResetToken] = useState('');

  // Handlers to switch views
  const goToSignIn = () => setView('signin');
  const goToSignUp = () => setView('signup');
  const goToForgot = () => setView('forgot');
  // Accept token for reset
  const goToReset = (token) => { setResetToken(token); setView('reset'); };

  // Render the correct form
  let content;
  if (view === 'signin') {
    content = <SignIn onGoSignUp={goToSignUp} onGoForgot={goToForgot} modalMode onClose={onClose} />;
  } else if (view === 'signup') {
    content = <SignUp onGoSignIn={goToSignIn} modalMode />;
  } else if (view === 'forgot') {
    content = <ForgotPassword onGoSignIn={goToSignIn} modalMode onGoReset={goToReset} />;
  } else if (view === 'reset') {
    content = <ResetPassword onGoSignIn={goToSignIn} modalMode token={resetToken} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-full max-w-md mx-auto">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl z-10"
          onClick={onClose}
        >
          <i className="bx bx-x"></i>
        </button>
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 animate-fadeIn">
          {content}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
