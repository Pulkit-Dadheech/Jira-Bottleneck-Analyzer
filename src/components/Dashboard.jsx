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
import CsvUpload from './CsvUpload'; // Import the CsvUpload component


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeSection } = useSidebar('overview');
  const [csvUploaded, setCsvUploaded] = useState(false);

  // Only allow navigation if CSV is uploaded
  const navDisabled = !csvUploaded;

  return (
    <div className="flex flex-col h-screen text-white overflow-hidden">
      {/* Header at the very top */}
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-56 h-full overflow-auto">
          <Sidebar
            titleName="Dashboard"
            activeSectionList={['overview','cases','steps','paths','delays','violations']}
            LogoComponents={[
              () => <i className="bx bx-home-alt-2"></i>,
              () => <i className="bx bx-list-ol"></i>,
              () => <i className="bx bx-timer"></i>,
              () => <i className="bx bx-merge"></i>,
              () => <i className="bx bx-user"></i>,
              () => < i class='bxr  bx-x-circle'  ></i> 
            ]}
            sectionNames={['Overview','Cases','Steps','Paths','Delays','Violations']}
            navDisabled={navDisabled}
          />
        </aside>
        {/* Main content area */}
        <div className="flex-1 overflow-auto bg-gray-900 p-5" style={{ maxHeight: 'calc(100vh - 3.5rem)'}} >
          {/* Only show CSV upload in overview, and only if not uploaded */}
          {activeSection === 'overview' && !csvUploaded && (
            <div className='flex items-center h-full justify-center'>
              <CsvUpload onUploadSuccess={() => setCsvUploaded(true)} />
            </div>
          )}
          {/* Only show overview graphs if CSV is uploaded and only in overview */}
          {activeSection === 'overview' && csvUploaded && <DashboardContent />}
          {/* Only show other pages if CSV is uploaded and not in overview */}
          {activeSection === 'cases' && csvUploaded && <CasesPage/>}
          {activeSection === 'steps' && csvUploaded && <StepsPage/>}
          {activeSection === 'paths' && csvUploaded && <PathsPage/>}
          {activeSection === 'delays' && csvUploaded && <DelaysPage/>}
          {activeSection === 'violations' && csvUploaded && <ViolationsPage/>}
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
              activeSectionList={['overview','cases','steps','paths','delays','violations']}
              LogoComponents={[
                () => <i className="bx bx-home-alt-2"></i>,
                () => <i className="bx bx-list-ol"></i>,
                () => <i className="bx bx-timer"></i>,
                () => <i className="bx bx-merge"></i>,
                () => <i className="bx bx-user"></i>,
                () => <i className="bx bx-slash-square"></i>
              ]}
              sectionNames={['Overview','Cases','Steps','Paths','Delays','Violations']}
              navDisabled={navDisabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

