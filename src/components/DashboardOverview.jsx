import React, { useMemo } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { useUserData } from '../context/UserDataContext';

const DashboardContent = () => {
  useSidebar('overview');
  const { userData, loading, error } = useUserData();
  // Extract raw data for metrics calculation
  const caseData = userData?.caseDurations?.cases || [];
  const slaViolations = userData?.slaViolations || [];
  const userDelaysStats = userData?.userDelays?.user_stats || [];
  const slowestUserName = userData?.userDelays?.slowest_user?.user || 'N/A';
  // Memoize metrics unconditionally
  const { totalCases, avgCaseDuration, totalViolations, topSlowUser } = useMemo(() => ({
    totalCases: caseData.length,
    avgCaseDuration: caseData.reduce((sum, c) => sum + (c.total_minutes || 0), 0) / (caseData.length || 1),
    totalViolations: slaViolations.length,
    topSlowUser: slowestUserName
  }), [caseData, slaViolations, slowestUserName]);
  // Conditional rendering after hooks
  if (loading) return <div>Loading overview...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="relative mx-auto h-full overflow-x-auto px-2 md:px-8 pb-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-br from-indigo-900/80 via-black/80 to-gray-900/80 p-8 mb-10 flex flex-col md:flex-row items-center gap-6 shadow-xl border border-gray-700">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-200 mb-2 drop-shadow">Enterprize Workflow Analyzer</h1>
          <p className="text-lg text-indigo-100 mb-2">Visualize, analyze, and eliminate workflow bottlenecks in your projects.</p>
          <p className="text-sm text-gray-400">Upload your CSV to unlock powerful analytics and actionable insights.</p>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="group p-5 bg-gradient-to-br from-indigo-900/80 to-black border border-indigo-700 rounded-2xl shadow-lg flex items-center transition-transform hover:scale-105 hover:border-indigo-400">
          <i className="bx bx-list-check text-4xl text-indigo-400 mr-4 group-hover:text-indigo-300 transition-colors"></i>
          <div>
            <div className="text-xs text-gray-400">Total Cases</div>
            <div className="text-2xl font-bold text-white">{totalCases}</div>
          </div>
        </div>
        <div className="group p-5 bg-gradient-to-br from-green-900/80 to-black border border-green-700 rounded-2xl shadow-lg flex items-center transition-transform hover:scale-105 hover:border-green-400">
          <i className="bx bx-timer text-4xl text-green-400 mr-4 group-hover:text-green-300 transition-colors"></i>
          <div>
            <div className="text-xs text-gray-400">Avg Case Duration</div>
            <div className="text-2xl font-bold text-white">{avgCaseDuration.toFixed(1)} min</div>
          </div>
        </div>
        <div className="group p-5 bg-gradient-to-br from-pink-900/80 to-black border border-pink-700 rounded-2xl shadow-lg flex items-center transition-transform hover:scale-105 hover:border-pink-400">
          <i className="bx bx-slash-square text-4xl text-pink-400 mr-4 group-hover:text-pink-300 transition-colors"></i>
          <div>
            <div className="text-xs text-gray-400">SLA Violations</div>
            <div className="text-2xl font-bold text-white">{totalViolations}</div>
          </div>
        </div>
        <div className="group p-5 bg-gradient-to-br from-yellow-900/80 to-black border border-yellow-700 rounded-2xl shadow-lg flex items-center transition-transform hover:scale-105 hover:border-yellow-400">
          <i className="bx bx-user text-4xl text-yellow-400 mr-4 group-hover:text-yellow-300 transition-colors"></i>
          <div>
            <div className="text-xs text-gray-400">Slowest User</div>
            <div className="text-2xl font-bold text-white">{topSlowUser}</div>
          </div>
        </div>
      </div>
      {/* Next Steps / Callout Section */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-800/60 to-black/80 border border-indigo-700 p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-indigo-200 mb-2">Get Started</h3>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>Use the sidebar to explore Cases, Steps, Paths, Delays, and Violations.</li>
            <li>Each section provides focused analytics and interactive visualizations.</li>
            <li>Return to this overview anytime for a quick summary of your data.</li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <span className="inline-block bg-indigo-700/80 text-white text-xs px-3 py-1 rounded-full mb-2">Tip</span>
          <span className="text-gray-300 text-sm text-center">Hover over the cards for more details!</span>
        </div>
      </div>
      {/* Subtle animated accent */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  )
}

export default DashboardContent
