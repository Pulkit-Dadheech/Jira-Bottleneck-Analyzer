import React, { useRef, useState } from 'react';
import { useUserData } from '../context/UserDataContext';

const CSV_KEY = 'uploaded_csv';

export default function CsvUpload({ onUploadSuccess }) {
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { refresh, userData } = useUserData();

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
        onUploadSuccess();
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
        <input
          id="csvfile"
          type="file"
          accept=".csv"
          ref={fileInput}
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
        <label
          htmlFor="csvfile"
          className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded transition"
        >
          <i className="bx bx-upload text-xl"></i>
          {loading ? 'Uploading...' : 'Choose a CSV File'}
        </label>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
