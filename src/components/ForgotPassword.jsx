import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const ForgotPassword = ({ onGoSignIn, modalMode, onGoReset }) => {
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
  }, []);

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1. Request reset token (OTP) from backend
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No account found with that email');

      // 2. Send OTP email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email: email,              // matches {{email}} in template
          passcode: data.token,      // matches {{passcode}} in template
          time: new Date().toLocaleString() // matches {{time}} in template
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      setToken(data.token);
      setShowOtp(true);
      setSent(true);
    } catch (err) {
      console.error('Forgot password error:', err);
      if (err.status === 422) {
        setError('Failed to send email: check EmailJS template parameters');
      } else {
        setError(err.message || 'Failed to send reset email');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');
    if (otp === token) {
      // switch to reset password view in modal with token
      if (onGoReset) onGoReset(token);
    } else {
      setError('Invalid OTP. Please check your email and try again.');
    }
  };

  return (
    <div className={modalMode ? '' : 'min-h-screen flex items-center justify-centent'}>
      <form onSubmit={showOtp ? handleVerifyOtp : handleSubmit} className="bg-black p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Forgot Password</h2>
        {!showOtp ? (
          <>
            <label className="block text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition mb-4 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
            <div className="text-center mt-2">
              {onGoSignIn ? (
                <button type="button" className="text-indigo-400 hover:underline" onClick={onGoSignIn}>Back to Sign In</button>
              ) : (
                <a href="/signin" className="text-indigo-400 hover:underline">Back to Sign In</a>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 text-green-400 text-center">Enter the OTP sent to your email</div>
            <label className="block text-gray-300 mb-2">OTP</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition mb-4 disabled:opacity-50"
              disabled={loading}
            >
              Verify OTP
            </button>
            <div className="text-center mt-2">
              {onGoSignIn ? (
                <button type="button" className="text-indigo-400 hover:underline" onClick={onGoSignIn}>Back to Sign In</button>
              ) : (
                <a href="/signin" className="text-indigo-400 hover:underline">Back to Sign In</a>
              )}
            </div>
          </>
        )}
        {sent && !error && !showOtp && (
          <div className="text-green-400 mt-4 text-center">Reset email sent! Check your inbox.</div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
