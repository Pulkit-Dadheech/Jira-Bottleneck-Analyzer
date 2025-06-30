import React, { useRef, useState, useEffect } from 'react';
import { useUserData } from '../context/UserDataContext';

const CSV_KEY = 'uploaded_csv';

export default function CsvUpload({ onUploadSuccess }) {
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { refresh, userData } = useUserData();

  const statusMessages = [
    "Uploading your file…",
    "Running analytics…",
    "Generating recommendations…",
    "Almost done!"
  ];
  const tips = [
    "Tip: Use the Path Tree to spot unusual workflows!",
    "Did you know? Bottlenecks are often hidden in plain sight.",
    "Pro tip: Check the Recommendations page for instant process wins!",
    "Fun fact: The dashboard is personalized just for you."
  ];
  const [statusIdx, setStatusIdx] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Helper to poll for new analytics
  const pollForAnalytics = (prevUpdatedAt, prevRecLen, cb, maxTries = 20) => {
    let tries = 0;
    const poll = async () => {
      await refresh();
      tries++;
      // Get the latest userData after refresh
      const latest = JSON.parse(JSON.stringify(window.__latestUserData || {}));
      const newUpdatedAt = latest?.updatedAt;
      const newRecLen = Array.isArray(latest?.recommendations) ? latest.recommendations.length : 0;
      if ((newUpdatedAt && newUpdatedAt !== prevUpdatedAt) || newRecLen !== prevRecLen) {
        cb();
      } else if (tries < maxTries) {
        setTimeout(poll, 200);
      } else {
        cb(); // fallback: stop loading after max tries
      }
    };
    poll();
  };

  // Keep window.__latestUserData in sync with context
  React.useEffect(() => {
    window.__latestUserData = userData;
  }, [userData]);

  useEffect(() => {
    let interval;
    if (loading) {
      setStatusIdx(0);
      setShowSuccess(false);
      interval = setInterval(() => {
        setStatusIdx(idx => {
          if (idx < statusMessages.length - 1) return idx + 1;
          return idx; // Stay at last message
        });
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Show checkmark animation on upload success
  const handleUploadSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onUploadSuccess();
    }, 1200);
  };

  const handleFileChange = async (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    // Save CSV file name to sessionStorage (or file content if needed)
    sessionStorage.setItem(CSV_KEY, file.name);
    const formData = new FormData();
    formData.append('csvfile', file);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/upload/upload_csv', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Upload failed');
      }
      // Poll for analytics update
      const prevUpdatedAt = userData?.updatedAt;
      const prevRecLen = Array.isArray(userData?.recommendations) ? userData.recommendations.length : 0;
      pollForAnalytics(prevUpdatedAt, prevRecLen, () => {
        setLoading(false);
        handleUploadSuccess();
      });
    } catch (err) {
      setLoading(false);
      // Reset stored CSV key so upload UI remains
      sessionStorage.removeItem(CSV_KEY);
      console.error('CSV upload error:', err.message);
      setError(err.message || 'Failed to upload CSV.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-black text-white border-gray-700 shadow-lg border-[0.1px]">
      <div className="p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Upload Your CSV File</h2>
        {loading && (
          <div className="flex flex-col items-center mb-6">
            <svg className="animate-spin h-10 w-10 text-indigo-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            {/* Progress bar */}
            <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-indigo-400 to-fuchsia-500 animate-pulse" style={{ width: '100%' }}></div>
            </div>
            <p className="text-indigo-300 text-lg animate-pulse" aria-live="polite">{statusMessages[statusIdx]}</p>
            <p className="text-gray-400 text-sm mt-2">{tips[statusIdx % tips.length]}</p>
          </div>
        )}
        {showSuccess && (
          <div className="flex flex-col items-center mb-6 animate-fade-in">
            <svg className="h-12 w-12 text-green-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-300 text-lg font-semibold">Upload Complete!</p>
          </div>
        )}
        <input
          id="csvfile"
          type="file"
          accept=".csv"
          ref={fileInput}
          onChange={handleFileChange}
          className="hidden"
          disabled={loading || showSuccess}
        />
        <label
          htmlFor="csvfile"
          className={`w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded transition ${loading || showSuccess ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <i className="bx bx-upload text-xl"></i>
          {loading ? 'Uploading...' : 'Choose a CSV File'}
        </label>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
