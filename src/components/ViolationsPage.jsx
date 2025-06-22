import React, { useState, useEffect } from 'react';
import { useSidebar } from '../context/SidebarContext';

const ViolationsPage = () => {
  useSidebar('violations');
  const [slaViolations, setSlaViolations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/sla_violations')
      .then(res => res.json())
      .then(data => setSlaViolations(data || []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg max-h-64 overflow-auto">
      <h2 className="text-xl font-semibold mb-4 text-indigo-400">SLA Violations</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-indigo-200">
            <th className="px-2 py-1 text-left">Case ID</th>
            <th className="px-2 py-1 text-left">Activity</th>
            <th className="px-2 py-1 text-left">User</th>
            <th className="px-2 py-1 text-left">Role</th>
            <th className="px-2 py-1 text-left">Duration (min)</th>
            <th className="px-2 py-1 text-left">SLA Limit</th>
            <th className="px-2 py-1 text-left">Story Points</th>
          </tr>
        </thead>
        <tbody>
          {slaViolations.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-700">
              <td className="px-2 py-1">{row.case_id}</td>
              <td className="px-2 py-1">{row.activity}</td>
              <td className="px-2 py-1">{row.user}</td>
              <td className="px-2 py-1">{row.role}</td>
              <td className="px-2 py-1">{row.duration_minutes}</td>
              <td className="px-2 py-1">{row.sla_limit}</td>
              <td className="px-2 py-1">{row.story_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViolationsPage;
