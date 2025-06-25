import React, { useMemo } from 'react';
import { useUserData } from '../context/UserDataContext';
import { useSidebar } from '../context/SidebarContext';

const PathsPage = () => {
  useSidebar('paths');
  const { userData, loading, error } = useUserData();
  if (loading) return <div>Loading paths...</div>;
  if (error) return <div>Error loading paths: {error}</div>;
  const paths = userData?.commonPaths || [];

  const { totalPaths, topPath, top5Paths } = useMemo(() => {
    if (!paths.length) return { totalPaths: 0, topPath: null, top5Paths: [] };
    const sorted = [...paths].sort((a, b) => b.count - a.count);
    return {
      totalPaths: paths.length,
      topPath: sorted[0],
      top5Paths: sorted.slice(0, 5)
    };
  }, [paths]);

  return (
    <div className="relative mx-auto h-full overflow-x-auto px-2 md:px-8 pb-8">
      {/* Hero/Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-indigo-900/80 p-4 rounded-full shadow-lg border-2 border-indigo-500">
          <i className="bx bx-git-merge text-4xl text-indigo-300"></i>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-200 mb-1 drop-shadow">Paths Analytics</h2>
          <p className="text-gray-400 text-sm md:text-base">Discover the most common workflow paths and their frequency. Optimize your process by focusing on the most traveled routes.</p>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-gradient-to-br from-indigo-900/80 to-black border border-indigo-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-git-merge text-3xl text-indigo-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Total Unique Paths</div>
            <div className="text-xl font-bold text-white">{totalPaths}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-green-900/80 to-black border border-green-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-star text-3xl text-green-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Most Frequent Path</div>
            <div className="text-sm font-bold text-white break-all">{topPath ? topPath.path : 'N/A'}</div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-br from-pink-900/80 to-black border border-pink-700 rounded-2xl shadow-lg flex items-center">
          <i className="bx bx-bar-chart text-3xl text-pink-400 mr-4"></i>
          <div>
            <div className="text-xs text-gray-400">Top Path Count</div>
            <div className="text-xl font-bold text-white">{topPath ? topPath.count : 'N/A'}</div>
          </div>
        </div>
      </div>
      {/* Top 5 Paths Table */}
      <div className="bg-black/80 border border-indigo-800 rounded-xl shadow-lg p-6 mb-8">
        <h4 className="text-md font-semibold text-indigo-300 mb-3">Top 5 Most Common Paths</h4>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-indigo-200">
              <th className="px-2 py-1 text-left">Path</th>
              <th className="px-2 py-1 text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            {top5Paths.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="px-2 py-1 break-all max-w-xs">{row.path}</td>
                <td className="px-2 py-1">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* All Paths Table */}
      <div className="bg-black/70 border border-gray-800 rounded-xl shadow p-6">
        <h4 className="text-md font-semibold text-gray-300 mb-3">All Paths</h4>
        <div className="overflow-x-auto max-h-72">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="px-2 py-1 text-left">Path</th>
                <th className="px-2 py-1 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {paths.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="px-2 py-1 break-all max-w-xs">{row.path}</td>
                  <td className="px-2 py-1">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PathsPage;
