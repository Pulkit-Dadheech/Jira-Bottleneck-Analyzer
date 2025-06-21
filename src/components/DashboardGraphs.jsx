import React, { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export default function DashboardGraphs() {
  const [caseData, setCaseData] = useState([])
  const [stepData, setStepData] = useState([])

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <h2 className="text-xl font-semibold mb-4">Case Durations (min)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={caseData}>
            <XAxis dataKey="case_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_minutes" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <h2 className="text-xl font-semibold mb-4">Step Durations (min)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stepData}>
            <XAxis dataKey="step" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="average_minutes" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
