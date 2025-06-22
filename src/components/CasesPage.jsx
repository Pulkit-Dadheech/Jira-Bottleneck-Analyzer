import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CasesPage = () => {
  const [caseData, setCaseData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/case_durations')
      .then(res => res.json())
      .then(data => setCaseData(data.cases || []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-indigo-400">Case Durations (min)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={caseData} barSize={28} style={{ borderRadius: '12px' }}>
          <XAxis dataKey="case_id" tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: '#222', border: 'none', borderRadius: 8, color: '#fff' }} labelStyle={{ color: '#a5b4fc' }} />
          <Bar dataKey="total_minutes" fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CasesPage;
