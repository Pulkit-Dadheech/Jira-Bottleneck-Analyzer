import React, { useState, useEffect } from 'react';

const PathsPage = () => {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/common_paths')
      .then(res => res.json())
      .then(data => setPaths(data || []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-indigo-400">Top Common Paths</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-indigo-200">
              <th className="px-2 py-1 text-left">Path</th>
              <th className="px-2 py-1 text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            {paths.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="px-2 py-1">{row.path}</td>
                <td className="px-2 py-1">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PathsPage;
