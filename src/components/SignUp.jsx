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
    <div className={modalMode ? '' : 'min-h-screen flex items-center justify-center bg-gray-900'}>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-300 mb-6 text-center">Sign Up</h2>
        <label className="block text-blue-200 mb-2">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label className="block text-blue-200 mb-2">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label className="block text-blue-200 mb-2">Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {error && <div className="text-red-400 mb-2">{error}</div>}
        {success && <div className="text-green-400 mb-2">Account created! You can now sign in.</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-400">Already have an account? </span>
          {onGoSignIn ? (
            <button type="button" className="text-blue-400 hover:underline" onClick={onGoSignIn}>Sign In</button>
          ) : (
            <a href="/signin" className="text-blue-400 hover:underline">Sign In</a>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
