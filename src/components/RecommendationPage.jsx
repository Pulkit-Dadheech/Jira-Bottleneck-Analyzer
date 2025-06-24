import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const RecommendationPage = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Fetch data from backend API
        const [caseRes, stepRes, delayRes, commonPathsRes, violationsRes] = await Promise.all([
          fetch('http://localhost:3000/api/case_durations').then(res => res.json()),
          fetch('http://localhost:3000/api/step_durations').then(res => res.json()),
          fetch('http://localhost:3000/api/user_delays').then(res => res.json()),
          fetch('http://localhost:3000/api/common_paths').then(res => res.json()),
          fetch('http://localhost:3000/api/sla_violations').then(res => res.json()),
        ]);

        // Construct prompt for OpenRouter
        const prompt = `Given the following workflow data, provide recommendations to optimize the process:
        Case durations: ${JSON.stringify(caseRes)}
        Step durations: ${JSON.stringify(stepRes)}
        User delays: ${JSON.stringify(delayRes)}
        Common paths: ${JSON.stringify(commonPathsRes)}
        SLA violations: ${JSON.stringify(violationsRes)}\n`;

        // Call OpenRouter API
        const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
          body: JSON.stringify({
            model: 'mistralai/mistral-7b-instruct:free',
            messages: [{ role: 'user', content: prompt }],
          }),
        });
        const result = await response.json();
        const recs = result.choices[0].message.content;
        setRecommendations(recs);
      } catch (err) {
        setError(err.message || 'Failed to fetch recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

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

  // Parse recommendations into objects: first line = title, rest = description
  const recs = recommendations
    ? recommendations.split(/\n{2,}/).map((block) => {
        const [title, ...desc] = block.trim().split(/\n/);
        return { title: title.replace(/^\d+\.\s*/, ''), desc: desc.join(' ') };
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-900py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-300 mb-10 text-center drop-shadow-lg tracking-tight">Workflow Recommendations</h1>
        <div className="space-y-10">
          {recs.map((rec, idx) => (
            <div
              key={idx}
              className="relative flex items-start gap-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border-l-8 border-blue-500 hover:border-blue-400 transition-all group overflow-hidden"
            >
              {/* Accent circle and icon */}
              <div className="flex-shrink-0 mt-1 relative z-10">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-700 to-blue-400 text-white text-2xl font-extrabold shadow-lg border-2 border-gray-900 group-hover:scale-110 transition-transform">
                  <i className="bx bx-bulb"></i>
                </span>
              </div>
              <div className="pl-1 flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-blue-200 mb-2 leading-tight flex items-center gap-2">
                  <span className="inline-block align-middle"><i className="bx bx-chevron-right text-blue-400 text-2xl"></i></span>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({node, ...props}) => <strong className="font-bold text-blue-100" {...props} />,
                      p: ({node, ...props}) => <span {...props} />
                    }}
                  >{rec.title}</ReactMarkdown>
                </h2>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    strong: ({node, ...props}) => <strong className="font-bold text-blue-100" {...props} />,
                    p: ({node, ...props}) => <p className="text-white text-base md:text-lg leading-relaxed whitespace-pre-line" {...props} />
                  }}
                >{rec.desc}</ReactMarkdown>
              </div>
              {/* Decorative gradient blob */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-blue-900 to-blue-400 opacity-20 rounded-full blur-2xl z-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
