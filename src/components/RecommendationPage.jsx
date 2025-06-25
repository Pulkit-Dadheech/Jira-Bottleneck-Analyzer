import React from 'react';
import { useSidebar } from '../context/SidebarContext';
import { useUserData } from '../context/UserDataContext';

const RecommendationPage = () => {
  const { userData, loading, error } = useUserData();
  useSidebar('recommendations');

  if (loading) return (
    <div className="flex w-full h-full items-center justify-center bg-opacity-80 ">
      <div className="animate-spin h-20 w-20 border-4 border-t-blue-500 border-gray-800 rounded-full"></div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">Error: {error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-300 mb-10 text-center drop-shadow-lg tracking-tight">Workflow Recommendations</h1>
        <div className="space-y-10">
          {/* Ticket-based recommendations in one card */}
          <div className="relative flex flex-col gap-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border-l-8 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-200 mb-4 flex items-center gap-2">
              <span className="inline-block align-middle"><i className="bx bx-bulb text-blue-400 text-2xl"></i></span>
              Ticket-based Recommendations
            </h2>
            { (userData?.recommendations || []).length === 0 && (
              <div className="text-center text-gray-400">No recommendations available.</div>
            )}
            <ul className="space-y-6">
              { (userData?.recommendations || []).map((rec, idx) => (
                <li key={idx} className="bg-gray-900 rounded-xl p-4 border border-blue-800">
                  <div className="text-sm text-blue-400 font-mono mb-1">Ticket: {rec.case_id}</div>
                  <div className="text-lg font-semibold text-blue-100 mb-1">{rec.heuristic_recommendation}</div>
                  <div className="text-white text-base md:text-lg leading-relaxed whitespace-pre-line">{rec.recommendation_text}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Process-level insights */}
          <div className="relative flex flex-col gap-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border-l-8 border-green-500">
            <h2 className="text-2xl font-bold text-green-300 mb-2 flex items-center gap-2">
              <span className="inline-block align-middle"><i className="bx bx-cog text-green-400 text-2xl"></i></span>
              Process-level Insights
            </h2>
            <ul className="list-disc pl-6">
              { (userData?.insights?.process || []).map((item, idx) => (
                <li key={idx} className="text-white text-base md:text-lg mb-1">{item}</li>
              ))}
            </ul>
          </div>

          {/* User-level insights */}
          <div className="relative flex flex-col gap-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border-l-8 border-yellow-500">
            <h2 className="text-2xl font-bold text-yellow-300 mb-2 flex items-center gap-2">
              <span className="inline-block align-middle"><i className="bx bx-user text-yellow-400 text-2xl"></i></span>
              User-level Insights
            </h2>
            <ul className="list-disc pl-6">
              { (userData?.insights?.user || []).map((item, idx) => (
                <li key={idx} className="text-white text-base md:text-lg mb-1">{item}</li>
              ))}
            </ul>
          </div>

          {/* Activity-level insights */}
          <div className="relative flex flex-col gap-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border-l-8 border-blue-400">
            <h2 className="text-2xl font-bold text-blue-300 mb-2 flex items-center gap-2">
              <span className="inline-block align-middle"><i className="bx bx-task text-blue-400 text-2xl"></i></span>
              Activity-level Insights
            </h2>
            <ul className="list-disc pl-6">
              { (userData?.insights?.activity || []).map((item, idx) => (
                <li key={idx} className="text-white text-base md:text-lg mb-1">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
