import React, { useState, useEffect } from 'react';
import { useSidebar } from '../context/SidebarContext';

const DelaysPage = () => {
  useSidebar('delays');
  const [userDelays, setUserDelays] = useState({ user_stats: [], slowest_user: null });

  useEffect(() => {
    fetch('http://localhost:3000/api/user_delays')
      .then(res => res.json())
      .then(data => setUserDelays(data || { user_stats: [], slowest_user: null }))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-indigo-400">User Delays</h2>
      {userDelays.slowest_user && (
        <div className="mb-2 text-green-400">Slowest User: {userDelays.slowest_user.user} ({userDelays.slowest_user.average_minutes} min avg)</div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-indigo-200">
              <th className="px-2 py-1 text-left">User</th>
              <th className="px-2 py-1 text-left">Role</th>
              <th className="px-2 py-1 text-left">Activity</th>
              <th className="px-2 py-1 text-left">Avg Min</th>
              <th className="px-2 py-1 text-left">Avg SP</th>
              <th className="px-2 py-1 text-left">Occurrences</th>
            </tr>
          </thead>
          <tbody>
            {userDelays.user_stats.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="px-2 py-1">{row.user}</td>
                <td className="px-2 py-1">{row.role}</td>
                <td className="px-2 py-1">{row.activity}</td>
                <td className="px-2 py-1">{row.average_minutes}</td>
                <td className="px-2 py-1">{row.average_story_points}</td>
                <td className="px-2 py-1">{row.occurrences}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DelaysPage;
