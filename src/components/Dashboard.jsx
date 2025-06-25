import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import DashboardContent from './DashboardOverview';
import 'boxicons/css/boxicons.min.css';
import '../index.css';
import { useSidebar } from '../context/SidebarContext';
import CasesPage from './CasesPage';
import StepsPage from './StepsPage';
import PathsPage from './PathsPage';
import DelaysPage from './DelaysPage';
import ViolationsPage from './ViolationsPage';
import CsvUpload from './CsvUpload';
import RecommendationPage from './RecommendationPage';
import PathTreePage from './PathTreePage';
import { useUserData } from '../context/UserDataContext';
import { useEffect } from 'react';

const CSV_KEY = 'uploaded_csv';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeSection } = useSidebar('overview');
  const [csvUploaded, setCsvUploaded] = useState(() => !!sessionStorage.getItem(CSV_KEY));
  const { userData, loading, error } = useUserData();

  // Only allow navigation if CSV is uploaded
  // If userData exists, CSV is considered uploaded
  const navDisabled = !csvUploaded;

  useEffect(() => {
    if(!csvUploaded && !loading) {
      setCsvUploaded(false);
    }
  },[error && error.includes('Failed to fetch user data')]);

  

  // Handler for uploading another CSV (clears session and triggers upload UI)
  const handleUploadAnotherCsv = async () => {
    // Delete user data on the server
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:3000/upload/reset', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      console.error('Failed to reset server data', e);
    }
    sessionStorage.removeItem(CSV_KEY);
    sessionStorage.removeItem('recommendation_response');
    setCsvUploaded(false);
  };

  return (
    <div className="flex flex-col h-screen text-white overflow-hidden">
      {/* Header at the very top */}
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-56 h-full overflow-auto">
          <Sidebar
            titleName="Dashboard"
            activeSectionList={['overview','cases','steps','paths','pathTree','delays','violations','recommendations']}
            LogoComponents={[
              () => <i className="bx bx-home-alt-2"></i>,
              () => <i className="bx bx-list-ol"></i>,
              () => <i className="bx bx-timer"></i>,
              () => <i className="bx bx-merge"></i>,
              () => <i className="bx bx-sitemap"></i>,
              () => <i className="bx bx-user"></i>,
              () => <i className="bx bx-block"></i>,
              () => <i className="bx bx-bulb"></i>
            ]}
            sectionNames={['Overview','Cases','Steps','Paths','Path Tree','Delays','Violations','Recommendations']}
            navDisabled={navDisabled}
          />
        </aside>
        {/* Main content area */}
        <div className="flex-1 overflow-auto bg-gray-900 p-5" style={{ maxHeight: 'calc(100vh - 3.5rem)'}} >
          {/* Only show CSV upload in overview, and only if not uploaded or fetch failed */}
          {activeSection === 'overview' && !csvUploaded && (
            <div className='flex items-center h-full justify-center'>
              <CsvUpload onUploadSuccess={() => setCsvUploaded(true)} />
            </div>
          )}
          {/* Show upload another CSV button in overview if already uploaded */}
          {activeSection === 'overview' && csvUploaded && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleUploadAnotherCsv}
                className="inline-flex items-center gap-2 bg-indigo-700 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded shadow transition"
              >
                <i className="bx bx-upload"></i> Upload Another CSV
              </button>
            </div>
          )}
          {/* Only show overview graphs if CSV is uploaded and only in overview */}
          {activeSection === 'overview' && csvUploaded && <DashboardContent />}
          {/* Only show other pages if CSV is uploaded and not in overview */}
          {activeSection === 'cases' && csvUploaded && <CasesPage/>}
          {activeSection === 'steps' && csvUploaded && <StepsPage/>}
          {activeSection === 'paths' && csvUploaded && <PathsPage/>}
          {activeSection === 'pathTree' && csvUploaded && <PathTreePage/>}
          {activeSection === 'delays' && csvUploaded && <DelaysPage/>}
          {activeSection === 'violations' && csvUploaded && <ViolationsPage/>}
          {activeSection === 'recommendations' && csvUploaded && (
            <RecommendationPage/>
          )}
        </div>
      </div>
      {/* Mobile sidebar toggle and drawer remain unchanged */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(true)} className="text-white text-2xl">
          <i className="bx bx-menu"></i>
        </button>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="absolute left-0 top-0 bottom-0 w-56 bg-gray-800 p-4">
            <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl mb-4">
              <i className="bx bx-x"></i>
            </button>
            <Sidebar
              titleName="Dashboard"
              activeSectionList={['overview','cases','steps','paths','pathTree','delays','violations','recommendations']}
              LogoComponents={[
                () => <i className="bx bx-home-alt-2"></i>,
                () => <i className="bx bx-list-ol"></i>,
                () => <i className="bx bx-timer"></i>,
                () => <i className="bx bx-merge"></i>,
                () => <i className="bx bx-sitemap"></i>,
                () => <i className="bx bx-user"></i>,
                () => <i className="bx bx-slash-square"></i>,
                () => <i className="bx bx-recommend"></i>
              ]}
              sectionNames={['Overview','Cases','Steps','Paths','Path Tree','Delays','Violations','Recommendations']}
              navDisabled={navDisabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

