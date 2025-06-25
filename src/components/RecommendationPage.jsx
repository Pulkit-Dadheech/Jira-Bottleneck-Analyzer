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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950/80 via-black to-indigo-950 py-12 px-4 sm:px-6 lg:px-8 text-white rounded-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center tracking-tight drop-shadow-lg">Workflow Recommendations</h1>
          <p className="text-lg text-gray-400 text-center max-w-2xl">Personalized suggestions and insights to optimize your workflow, reduce delays, and improve efficiency. Powered by AI and your real data.</p>
        </div>
        <div className="space-y-10">
          {/* Ticket-based recommendations in one card */}
          <div className="relative flex flex-col gap-4 backdrop-blur-md bg-gray-900/80 rounded-3xl shadow-2xl p-8 border-l-8 border-indigo-500">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
              <span className="inline-block align-middle"><svg className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg></span>
              Ticket-based Recommendations
            </h2>
            { (userData?.recommendations || []).length === 0 && (
              <div className="text-center text-gray-500 italic">No recommendations available for your tickets yet.</div>
            )}
            <ul className="space-y-6">
              { (userData?.recommendations || []).map((rec, idx) => (
                <li key={idx} className="bg-gray-950/80 rounded-xl p-4 border border-indigo-800 shadow-sm">
                  <div className="text-xs text-indigo-400 font-mono mb-1">Ticket: {rec.case_id}</div>
                  <div className="text-lg font-semibold text-indigo-100 mb-1">{rec.heuristic_recommendation}</div>
                  <div className="text-white text-base md:text-lg leading-relaxed whitespace-pre-line">{rec.recommendation_text}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Process-level insights */}
          <div className="relative flex flex-col gap-2 backdrop-blur-md bg-gray-900/80 rounded-3xl shadow-2xl p-8 border-l-8 border-green-500">
            <h2 className="text-2xl font-bold text-green-300 mb-2 flex items-center gap-2">
              <span className="inline-block align-middle"><svg className="h-7 w-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4V7a4 4 0 10-8 0v6a4 4 0 008 0z" /></svg></span>
              Process-level Insights
            </h2>
            <ul className="list-disc pl-6">
              { (userData?.insights?.process || []).length === 0 ? (
                <li className="text-gray-500 italic">No process-level insights available.</li>
              ) : (
                (userData?.insights?.process || []).map((item, idx) => (
                  <li key={idx} className="text-white text-base md:text-lg mb-1">{item}</li>
                ))
              )}
            </ul>
          </div>

          {/* User-level insights */}
          <div className="relative flex flex-col gap-2 backdrop-blur-md bg-gray-900/80 rounded-3xl shadow-2xl p-8 border-l-8 border-yellow-500">
            <h2 className="text-2xl font-bold text-yellow-300 mb-2 flex items-center gap-2">
              <span className="inline-block align-middle"><svg className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
              User-level Insights
            </h2>
            <ul className="list-disc pl-6">
              { (userData?.insights?.user || []).length === 0 ? (
                <li className="text-gray-500 italic">No user-level insights available.</li>
              ) : (
                (userData?.insights?.user || []).map((item, idx) => (
                  <li key={idx} className="text-white text-base md:text-lg mb-1">{item}</li>
                ))
              )}
            </ul>
          </div>

          {/* Activity-level insights */}
          <div className="relative flex flex-col gap-2 backdrop-blur-md bg-gray-900/80 rounded-3xl shadow-2xl p-8 border-l-8 border-blue-400">
            <h2 className="text-2xl font-bold text-blue-300 mb-2 flex items-center gap-2">
              <span className="inline-block align-middle"><svg className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m9 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
              Activity-level Insights
            </h2>
            <ul className="list-disc pl-6">
              { (userData?.insights?.activity || []).length === 0 ? (
                <li className="text-gray-500 italic">No activity-level insights available.</li>
              ) : (
                (userData?.insights?.activity || []).map((item, idx) => (
                  <li key={idx} className="text-white text-base md:text-lg mb-1">{item}</li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
