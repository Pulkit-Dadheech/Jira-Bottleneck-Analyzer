import React, { useState } from 'react'
import CsvUpload from './CsvUpload'
import DashboardGraphs from './DashboardGraphs'

const DashboardContent = () => {
  const [csvUploaded, setCsvUploaded] = useState(false)

  return (
    <div className="mx-auto h-full">
      {!csvUploaded ? (
        <div className='flex items-center h-full justify-center'>
        <CsvUpload onUploadSuccess={() => setCsvUploaded(true)} />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6">Overview</h2>
          <DashboardGraphs />
        </>
      )}
    </div>
  )
}

export default DashboardContent
