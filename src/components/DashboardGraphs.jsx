import React, { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export default function DashboardGraphs() {
  const [caseData, setCaseData] = useState([])
  const [stepData, setStepData] = useState([])
  const [commonPaths, setCommonPaths] = useState([])
  const [userDelays, setUserDelays] = useState({ user_stats: [], slowest_user: null })
  const [slaViolations, setSlaViolations] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/case_durations')
      .then(res => res.json())
      .then(data => setCaseData(data.cases || []))
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/api/step_durations')
      .then(res => res.json())
      .then(data => setStepData(data || []))
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/api/common_paths')
      .then(res => res.json())
      .then(data => setCommonPaths(data || []))
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/api/user_delays')
      .then(res => res.json())
      .then(data => setUserDelays(data || { user_stats: [], slowest_user: null }))
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/api/sla_violations')
      .then(res => res.json())
      .then(data => setSlaViolations(data || []))
      .catch(console.error)
  }, [])

  return (
    <div className="min-w-[700px] grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Case Durations Chart */}
      <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-indigo-400">Case Durations (min)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={caseData} barSize={28} style={{ borderRadius: '12px' }}>
            <XAxis dataKey="case_id" tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#222', border: 'none', borderRadius: 8, color: '#fff' }} labelStyle={{ color: '#a5b4fc' }} />
            <Bar dataKey="total_minutes" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Step Durations Chart */}
      <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-indigo-400">Step Durations (min)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={stepData} barSize={28} style={{ borderRadius: '12px' }}>
            <XAxis dataKey="step" tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#c7d2fe', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#222', border: 'none', borderRadius: 8, color: '#fff' }} labelStyle={{ color: '#a5b4fc' }} />
            <Bar dataKey="average_minutes" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Common Paths Table */}
      <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-indigo-400">Top 5 Common Paths</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-indigo-200">
              <th className="px-2 py-1 text-left">Path</th>
              <th className="px-2 py-1 text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            {commonPaths.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="px-2 py-1">{row.path}</td>
                <td className="px-2 py-1">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* User Delays Table */}
      <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-indigo-400">User Delays</h2>
        {userDelays.slowest_user && (
          <div className="mb-2 text-green-400">Slowest User: {userDelays.slowest_user.user} ({userDelays.slowest_user.average_minutes} min avg)</div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-indigo-200">
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
      {/* SLA Violations Table */}
      <div className="p-4 bg-black border-[0.1px] border-gray-600 rounded-xl shadow-lg col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-indigo-400">SLA Violations</h2>
        <div className="overflow-x-auto max-h-64">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-indigo-200">
                <th className="px-2 py-1 text-left">Case ID</th>
                <th className="px-2 py-1 text-left">Activity</th>
                <th className="px-2 py-1 text-left">User</th>
                <th className="px-2 py-1 text-left">Role</th>
                <th className="px-2 py-1 text-left">Duration (min)</th>
                <th className="px-2 py-1 text-left">SLA Limit</th>
                <th className="px-2 py-1 text-left">Story Points</th>
              </tr>
            </thead>
            <tbody>
              {slaViolations.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="px-2 py-1">{row.case_id}</td>
                  <td className="px-2 py-1">{row.activity}</td>
                  <td className="px-2 py-1">{row.user}</td>
                  <td className="px-2 py-1">{row.role}</td>
                  <td className="px-2 py-1">{row.duration_minutes}</td>
                  <td className="px-2 py-1">{row.sla_limit}</td>
                  <td className="px-2 py-1">{row.story_points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
