import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserData } from '../context/UserDataContext';
import { useSidebar } from '../context/SidebarContext';

const StepsPage = () => {
  useSidebar('steps');
  const { userData, loading, error } = useUserData();
  if (loading) return <div>Loading steps...</div>;
  if (error) return <div>Error loading steps: {error}</div>;
  const stepData = userData?.stepDurations || [];

  const { totalSteps, avgStepDuration, slowestStep, fastestStep, top5Slowest, top5Fastest } = useMemo(() => {
    if (!stepData.length) return {
      totalSteps: 0,
      avgStepDuration: 0,
      slowestStep: null,
      fastestStep: null,
      top5Slowest: [],
      top5Fastest: []
    };
    const sorted = [...stepData].sort((a, b) => b.average_minutes - a.average_minutes);
    return {
      totalSteps: stepData.length,
      avgStepDuration: stepData.reduce((sum, s) => sum + (s.average_minutes || 0), 0) / stepData.length,
      slowestStep: sorted[0],
      fastestStep: sorted[sorted.length - 1],
      top5Slowest: sorted.slice(0, 5),
      top5Fastest: sorted.slice(-5).reverse()
    };
  }, [stepData]);

  return (
    <div className="relative mx-auto h-full overflow-x-auto px-2 md:px-8 pb-8">
      {/* Hero/Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-green-900/80 p-4 rounded-full shadow-lg border-2 border-green-500">
          <i className="bx bx-git-branch text-4xl text-green-300"></i>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-200 mb-1 drop-shadow">Steps Analytics</h2>
          <p className="text-gray-400 text-sm md:text-base">Analyze the average duration of each workflow step. Spot bottlenecks and optimize your process flow.</p>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-5 bg-gradient-to-br from-green-900/80 to-black border border-green-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-git-branch text-3xl text-green-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Total Steps</div>
            <div className="text-xl font-bold text-white">{totalSteps}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-indigo-900/80 to-black border border-indigo-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-timer text-3xl text-indigo-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Avg Step Duration</div>
            <div className="text-xl font-bold text-white">{avgStepDuration.toFixed(1)} min</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-pink-900/80 to-black border border-pink-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-up-arrow-alt text-3xl text-pink-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Slowest Step</div>
            <div className="text-xl font-bold text-white">{slowestStep ? `${slowestStep.step} (${slowestStep.average_minutes} min)` : 'N/A'}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-yellow-900/80 to-black border border-yellow-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-down-arrow-alt text-3xl text-yellow-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Fastest Step</div>
            <div className="text-xl font-bold text-white">{fastestStep ? `${fastestStep.step} (${fastestStep.average_minutes} min)` : 'N/A'}</div>
          </div>
        </div>
      </div>
      {/* Bar Chart */}
      <div className="p-6 bg-gradient-to-br from-green-950/80 to-black border border-green-800 rounded-2xl shadow-xl mb-10">
        <h3 className="text-lg font-semibold mb-4 text-green-300">Step Durations Distribution</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={stepData} barSize={28} style={{ borderRadius: '12px' }}>
            <XAxis dataKey="step" tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#222', border: 'none', borderRadius: 8, color: '#fff' }} labelStyle={{ color: '#a5b4fc' }} />
            <Bar dataKey="average_minutes" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Top 5 Slowest/Fastest Steps Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black/80 border border-pink-800 rounded-xl shadow-lg p-6">
          <h4 className="text-md font-semibold text-pink-300 mb-3">Top 5 Slowest Steps</h4>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-pink-200">
                <th className="px-2 py-1 text-left">Step</th>
                <th className="px-2 py-1 text-left">Avg Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {top5Slowest.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="px-2 py-1">{row.step}</td>
                  <td className="px-2 py-1">{row.average_minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-black/80 border border-yellow-800 rounded-xl shadow-lg p-6">
          <h4 className="text-md font-semibold text-yellow-300 mb-3">Top 5 Fastest Steps</h4>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-yellow-200">
                <th className="px-2 py-1 text-left">Step</th>
                <th className="px-2 py-1 text-left">Avg Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {top5Fastest.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="px-2 py-1">{row.step}</td>
                  <td className="px-2 py-1">{row.average_minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StepsPage;
