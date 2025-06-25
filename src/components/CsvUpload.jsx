import React, { useRef, useState } from 'react';

const CSV_KEY = 'uploaded_csv';

export default function CsvUpload({ onUploadSuccess }) {
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const res = await fetch('http://localhost:3000/upload/upload_csv', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      setLoading(false);
      onUploadSuccess();
    } catch (err) {
      setLoading(false);
      setError('Failed to upload CSV.');
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
