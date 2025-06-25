import React, { useState } from 'react';

const ResetPassword = ({ onGoSignIn, onClose, modalMode, token }) => {
   const [password, setPassword] = useState('');
   const [confirm, setConfirm] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
     e.preventDefault();
     setError('');
     // setSuccess(false) not needed
     if (password !== confirm) {
       setError('Passwords do not match');
       return;
     }
     setLoading(true);
     try {
       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ token, password })
       });
       const data = await res.json();
       if (!res.ok) throw new Error(data.error || 'Reset failed');
      // On successful reset, go back to sign-in in modal
      if (onGoSignIn) onGoSignIn();
      else if (onClose) onClose();
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className={modalMode ? '' : 'min-h-screen flex items-center justify-center'}>
      <form onSubmit={handleSubmit} className="bg-black p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Reset Password</h2>
        <label className="block text-gray-300 mb-2">New Password</label>
        <input
          type="password"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label className="block text-gray-300 mb-2">Confirm Password</label>
        <input
          type="password"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition mb-4 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        <div className="text-center mt-2">
          {onGoSignIn ? (
            <button type="button" className="text-indigo-400 hover:underline" onClick={onGoSignIn}>Back to Sign In</button>
          ) : (
            <>{modalMode ? null : <a href="/signin" className="text-indigo-400 hover:underline">Back to Sign In</a>}</>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
