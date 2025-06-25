import React, { useMemo } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { useUserData } from '../context/UserDataContext';

const DelaysPage = () => {
  useSidebar('delays');
  const { userData, loading, error } = useUserData();
  if (loading) return <div>Loading delays...</div>;
  if (error) return <div>Error loading delays: {error}</div>;
  const userDelays = userData?.userDelays || { user_stats: [], slowest_user: null };

  const { totalUsers, slowestUser, fastestUser, avgDelay, top5Slowest, top5Fastest } = useMemo(() => {
    if (!userDelays.user_stats.length) return {
      totalUsers: 0,
      slowestUser: null,
      fastestUser: null,
      avgDelay: 0,
      top5Slowest: [],
      top5Fastest: []
    };
    const sorted = [...userDelays.user_stats].sort((a, b) => b.average_minutes - a.average_minutes);
    return {
      totalUsers: userDelays.user_stats.length,
      slowestUser: sorted[0],
      fastestUser: sorted[sorted.length - 1],
      avgDelay: userDelays.user_stats.reduce((sum, u) => sum + (u.average_minutes || 0), 0) / userDelays.user_stats.length,
      top5Slowest: sorted.slice(0, 5),
      top5Fastest: sorted.slice(-5).reverse()
    };
  }, [userDelays]);

  return (
    <div className="relative mx-auto h-full overflow-x-auto px-2 md:px-8 pb-8">
      {/* Hero/Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-green-900/80 p-4 rounded-full shadow-lg border-2 border-green-500">
          <i className="bx bx-timer text-4xl text-green-300"></i>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-200 mb-1 drop-shadow">Delays Analytics</h2>
          <p className="text-gray-400 text-sm md:text-base">See which users and activities are causing the most delays. Use this to target process improvements and training.</p>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-5 bg-gradient-to-br from-green-900/80 to-black border border-green-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-user text-3xl text-green-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Total Users</div>
            <div className="text-xl font-bold text-white">{totalUsers}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-pink-900/80 to-black border border-pink-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-up-arrow-alt text-3xl text-pink-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Slowest User</div>
            <div className="text-sm font-bold text-white">{slowestUser ? `${slowestUser.user} (${slowestUser.average_minutes} min)` : 'N/A'}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-yellow-900/80 to-black border border-yellow-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-down-arrow-alt text-3xl text-yellow-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Fastest User</div>
            <div className="text-sm font-bold text-white">{fastestUser ? `${fastestUser.user} (${fastestUser.average_minutes} min)` : 'N/A'}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-indigo-900/80 to-black border border-indigo-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-timer text-3xl text-indigo-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Avg Delay</div>
            <div className="text-xl font-bold text-white">{avgDelay.toFixed(1)} min</div>
          </div>
        </div>
      </div>
      {/* Top 5 Slowest Users Table */}
      <div className="bg-black/80 border border-pink-800 rounded-xl shadow-lg p-6 mb-8">
        <h4 className="text-md font-semibold text-pink-300 mb-3">Top 5 Slowest Users</h4>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-pink-200">
              <th className="px-2 py-1 text-left">User</th>
              <th className="px-2 py-1 text-left">Role</th>
              <th className="px-2 py-1 text-left">Activity</th>
              <th className="px-2 py-1 text-left">Avg Min</th>
              <th className="px-2 py-1 text-left">Avg SP</th>
              <th className="px-2 py-1 text-left">Occurrences</th>
            </tr>
          </thead>
          <tbody>
            {top5Slowest.map((row, idx) => (
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
      {/* Top 5 Fastest Users Table */}
      <div className="bg-black/80 border border-yellow-800 rounded-xl shadow-lg p-6 mb-8">
        <h4 className="text-md font-semibold text-yellow-300 mb-3">Top 5 Fastest Users</h4>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-yellow-200">
              <th className="px-2 py-1 text-left">User</th>
              <th className="px-2 py-1 text-left">Role</th>
              <th className="px-2 py-1 text-left">Activity</th>
              <th className="px-2 py-1 text-left">Avg Min</th>
              <th className="px-2 py-1 text-left">Avg SP</th>
              <th className="px-2 py-1 text-left">Occurrences</th>
            </tr>
          </thead>
          <tbody>
            {top5Fastest.map((row, idx) => (
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
      {/* All Delays Table */}
      <div className="bg-black/70 border border-gray-800 rounded-xl shadow p-6">
        <h4 className="text-md font-semibold text-gray-300 mb-3">All User Delays</h4>
        <div className="overflow-x-auto max-h-72">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-400">
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
    </div>
  );
};

export default DelaysPage;
