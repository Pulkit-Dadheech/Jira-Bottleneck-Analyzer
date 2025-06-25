import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const ForgotPassword = () => {
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
      window.location.href = `/reset-password?token=${token}`;
    } else {
      setError('Invalid OTP. Please check your email and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={showOtp ? handleVerifyOtp : handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-300 mb-6 text-center">Forgot Password</h2>
        {!showOtp ? (
          <>
            <label className="block text-blue-200 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 text-white mb-4"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
          </>
        ) : (
          <>
            <div className="mb-4 text-green-400">Enter the OTP sent to your email</div>
            <label className="block text-blue-200 mb-2">OTP</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white mb-4"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              Verify OTP
            </button>
          </>
        )}
        {sent && !error && !showOtp && (
          <div className="text-green-400 mt-4">Reset email sent! Check your inbox.</div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
