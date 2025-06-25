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
    <div className={modalMode ? '' : 'min-h-screen flex items-center justify-center bg-gray-900'}>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-300 mb-6 text-center">Reset Password</h2>
        {/* Reset form */}
        <>
          <label className="block text-blue-200 mb-2">New Password</label>
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
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          <div className="text-center mt-4">
            {onGoSignIn ? (
              <button type="button" className="text-blue-400 hover:underline" onClick={onGoSignIn}>Back to Sign In</button>
            ) : (
              <>{modalMode ? null : <a href="/signin" className="text-blue-400 hover:underline">Back to Sign In</a>}</>
            )}
          </div>
        </>
      </form>
    </div>
  );
};

export default ResetPassword;
