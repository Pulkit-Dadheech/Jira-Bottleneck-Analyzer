import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onGoSignUp, onGoForgot, modalMode, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signin failed');
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); // redirect to dashboard
      if (onClose) onClose(); // close modal if in modal mode
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={modalMode ? '' : 'min-h-screen flex items-center justify-center bg-gray-900'}>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-300 mb-6 text-center">Sign In</h2>
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
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="text-center mt-2">
          {onGoForgot ? (
            <button type="button" className="text-blue-400 hover:underline" onClick={onGoForgot}>Forgot password?</button>
          ) : (
            <a href="/forgot-password" className="text-blue-400 hover:underline">Forgot password?</a>
          )}
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-400">Don't have an account? </span>
          {onGoSignUp ? (
            <button type="button" className="text-blue-400 hover:underline" onClick={onGoSignUp}>Sign Up</button>
          ) : (
            <a href="/signup" className="text-blue-400 hover:underline">Sign Up</a>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
