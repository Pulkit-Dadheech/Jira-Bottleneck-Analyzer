import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onGoSignIn, modalMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      setSuccess(true);
      // After signup, switch to sign-in view in modal, or navigate normally
      if (onGoSignIn) onGoSignIn();
      else navigate('/signin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={modalMode ? '' : 'min-h-screen flex items-center justify-center'}>
      <form onSubmit={handleSubmit} className="bg-black p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Create Your Account</h2>
        {/* Email */}
        <label className="block text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {/* Password */}
        <label className="block text-gray-300 mb-2">Password</label>
        <input
          type="password"
          placeholder="Choose a strong password"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {/* Confirm Password */}
        <label className="block text-gray-300 mb-2">Confirm Password</label>
        <input
          type="password"
          placeholder="Re-enter your password"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-400 mb-4 text-center">Account created successfully!</div>}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition mb-4 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-400">Already have an account? </span>
          {onGoSignIn ? (
            <button type="button" className="text-indigo-400 hover:underline" onClick={onGoSignIn}>Sign In</button>
          ) : (
            <a href="#" className="text-indigo-400 hover:underline">Sign In</a>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
