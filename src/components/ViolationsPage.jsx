import React, { useMemo } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { useUserData } from '../context/UserDataContext';

const ViolationsPage = () => {
  useSidebar('violations');
  const { userData, loading, error } = useUserData();
  if (loading) return <div>Loading violations...</div>;
  if (error) return <div>Error loading violations: {error}</div>;
  const slaViolations = userData?.slaViolations || [];

  const { totalViolations, mostViolatedActivity, top5Violations } = useMemo(() => {
    if (!slaViolations.length) return { totalViolations: 0, mostViolatedActivity: null, top5Violations: [] };
    const activityCounts = slaViolations.reduce((acc, v) => {
      acc[v.activity] = (acc[v.activity] || 0) + 1;
      return acc;
    }, {});
    const mostViolated = Object.entries(activityCounts).sort((a, b) => b[1] - a[1])[0];
    const sorted = [...slaViolations].sort((a, b) => b.duration_minutes - a.duration_minutes);
    return {
      totalViolations: slaViolations.length,
      mostViolatedActivity: mostViolated ? { activity: mostViolated[0], count: mostViolated[1] } : null,
      top5Violations: sorted.slice(0, 5)
    };
  }, [slaViolations]);

  return (
    <div className="relative mx-auto h-full overflow-x-auto px-2 md:px-8 pb-8">
      {/* Hero/Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-pink-900/80 p-4 rounded-full shadow-lg border-2 border-pink-500">
          <i className="bx bx-slash-square text-4xl text-pink-300"><span><i className='bxr bx-x-circle'></i> </span></i>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-200 mb-1 drop-shadow">SLA Violations Analytics</h2>
          <p className="text-gray-400 text-sm md:text-base">Review all SLA violations, spot the most problematic activities, and prioritize improvements.</p>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-gradient-to-br from-pink-900/80 to-black border border-pink-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-slash-square text-3xl text-pink-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Total Violations</div>
            <div className="text-xl font-bold text-white">{totalViolations}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-indigo-900/80 to-black border border-indigo-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-bar-chart text-3xl text-indigo-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Most Violated Activity</div>
            <div className="text-sm font-bold text-white">{mostViolatedActivity ? `${mostViolatedActivity.activity} (${mostViolatedActivity.count})` : 'N/A'}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-yellow-900/80 to-black border border-yellow-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-timer text-3xl text-yellow-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Longest Violation</div>
            <div className="text-sm font-bold text-white">{top5Violations[0] ? `${top5Violations[0].duration_minutes} min (Case: ${top5Violations[0].case_id})` : 'N/A'}</div>
          </div>
        </div>
      </div>
      {/* Top 5 Violations Table */}
      <div className="bg-black/80 border border-pink-800 rounded-xl shadow-lg p-6 mb-8">
        <h4 className="text-md font-semibold text-pink-300 mb-3">Top 5 Longest Violations</h4>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-pink-200">
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
            {top5Violations.map((row, idx) => (
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
      {/* All Violations Table */}
      <div className="bg-black/70 border border-gray-800 rounded-xl shadow p-6">
        <h4 className="text-md font-semibold text-gray-300 mb-3">All SLA Violations</h4>
        <div className="overflow-x-auto max-h-72">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-400">
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
      </div>
    </div>
  );
};

export default ViolationsPage;
