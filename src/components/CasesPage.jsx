import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserData } from '../context/UserDataContext';
import { useSidebar } from '../context/SidebarContext';

const CasesPage = () => {
  useSidebar('cases');
  const { userData, loading, error } = useUserData();
  if (loading) return <div>Loading cases...</div>;
  if (error) return <div>Error loading cases: {error}</div>;
  const caseData = userData?.caseDurations?.cases || [];

  const { totalCases, avgCaseDuration, longestCase, shortestCase, top5Longest, top5Shortest } = useMemo(() => {
    if (!caseData.length) return {
      totalCases: 0,
      avgCaseDuration: 0,
      longestCase: null,
      shortestCase: null,
      top5Longest: [],
      top5Shortest: []
    };
    const sorted = [...caseData].sort((a, b) => b.total_minutes - a.total_minutes);
    return {
      totalCases: caseData.length,
      avgCaseDuration: caseData.reduce((sum, c) => sum + (c.total_minutes || 0), 0) / caseData.length,
      longestCase: sorted[0],
      shortestCase: sorted[sorted.length - 1],
      top5Longest: sorted.slice(0, 5),
      top5Shortest: sorted.slice(-5).reverse()
    };
  }, [caseData]);

  return (
    <div className="relative mx-auto h-full overflow-x-auto px-2 md:px-8 pb-8">
      {/* Hero/Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-indigo-900/80 p-4 rounded-full shadow-lg border-2 border-indigo-500">
          <i className="bx bx-list-check text-4xl text-indigo-300"></i>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-200 mb-1 drop-shadow">Cases Analytics</h2>
          <p className="text-gray-400 text-sm md:text-base">Explore the duration and distribution of all Jira cases. Identify bottlenecks and outliers instantly.</p>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-gradient-to-br from-indigo-900/80 to-black border border-indigo-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-list-check text-3xl text-indigo-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Total Cases</div>
            <div className="text-xl font-bold text-white">{totalCases}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-green-900/80 to-black border border-green-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-timer text-3xl text-green-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Avg Duration</div>
            <div className="text-xl font-bold text-white">{avgCaseDuration.toFixed(1)} min</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-pink-900/80 to-black border border-pink-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-up-arrow-alt text-3xl text-pink-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Longest Case</div>
            <div className="text-xl font-bold text-white">{longestCase ? `${longestCase.total_minutes} min (ID: ${longestCase.case_id})` : 'N/A'}</div>
          </div>
        </div>
      </div>
      {/* Bar Chart */}
      <div className="p-6 bg-gradient-to-br from-indigo-950/80 to-black border border-indigo-800 rounded-2xl shadow-xl mb-10">
        <h3 className="text-lg font-semibold mb-4 text-indigo-300">Case Durations Distribution</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={caseData} barSize={28} style={{ borderRadius: '12px' }}>
            <XAxis dataKey="case_id" tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#222', border: 'none', borderRadius: 8, color: '#fff' }} labelStyle={{ color: '#a5b4fc' }} />
            <Bar dataKey="total_minutes" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Top 5 Longest/Shortest Cases Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black/80 border border-indigo-800 rounded-xl shadow-lg p-6">
          <h4 className="text-md font-semibold text-indigo-300 mb-3">Top 5 Longest Cases</h4>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-indigo-200">
                <th className="px-2 py-1 text-left">Case ID</th>
                <th className="px-2 py-1 text-left">Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {top5Longest.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="px-2 py-1">{row.case_id}</td>
                  <td className="px-2 py-1">{row.total_minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-black/80 border border-green-800 rounded-xl shadow-lg p-6">
          <h4 className="text-md font-semibold text-green-300 mb-3">Top 5 Shortest Cases</h4>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-green-200">
                <th className="px-2 py-1 text-left">Case ID</th>
                <th className="px-2 py-1 text-left">Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {top5Shortest.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="px-2 py-1">{row.case_id}</td>
                  <td className="px-2 py-1">{row.total_minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CasesPage;
