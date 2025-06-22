import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StepsPage = () => {
  const [stepData, setStepData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/step_durations')
      .then(res => res.json())
      .then(data => setStepData(data || []))
      .catch(console.error);
  }, []);

  return (
    <div className="min-w-[700px] p-4 bg-gray-900">
      <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-indigo-400">Step Durations (min)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stepData} barSize={28} style={{ borderRadius: '12px' }}>
            <XAxis dataKey="step" tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#222', border: 'none', borderRadius: 8, color: '#fff' }} labelStyle={{ color: '#a5b4fc' }} />
            <Bar dataKey="average_minutes" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StepsPage;
