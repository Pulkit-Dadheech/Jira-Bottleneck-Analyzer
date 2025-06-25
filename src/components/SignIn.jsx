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
      window.dispatchEvent(new Event('login')); // dispatch login for refetch
      navigate('/dashboard'); // redirect to dashboard
      if (onClose) onClose(); // close modal if in modal mode
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-black from-gray-800 to-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Welcome Back</h2>
        <label className="block text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label className="block text-gray-300 mb-2">Password</label>
        <input
          type="password"
          placeholder="********"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition mb-4 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="text-center mt-2">
          {onGoForgot ? (
            <button type="button" className="text-indigo-400 hover:underline" onClick={onGoForgot}>Forgot password?</button>
          ) : (
            <a href="#" className="text-indigo-400 hover:underline">Forgot password?</a>
          )}
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-400">New here? </span>
          {onGoSignUp ? (
            <button type="button" className="text-indigo-400 hover:underline" onClick={onGoSignUp}>Create account</button>
          ) : (
            <a href="#" className="text-indigo-400 hover:underline">Create account</a>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
