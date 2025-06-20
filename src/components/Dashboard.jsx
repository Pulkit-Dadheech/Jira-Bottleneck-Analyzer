import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import DashboardContent from './DashboardContent';
import 'boxicons/css/boxicons.min.css';
import '../index.css';
import { useSidebar } from '../context/SidebarContext';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {activeSection} = useSidebar('dashboard');

  return (
    <div className="flex flex-col h-screen text-white overflow-hidden">
      {/* Header at the very top */}
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-56 h-full overflow-auto">
          <Sidebar
            titleName="Dashboard"
            activeSectionList={['dashboard']}
            LogoComponents={[() => <i className="bx bx-dashboard"></i>]}
            sectionNames={['Overview']}
          />
        </aside>
        {/* Main content area */}
        <div className="flex-1 overflow-auto bg-gray-900 p-5" style={{ maxHeight: 'calc(100vh - 3.5rem)'}} >
          {activeSection === 'dashboard' && <DashboardContent />}
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
              activeSectionList={['dashboard']}
              LogoComponents={[() => <i className="bx bx-dashboard"></i>]}
              sectionNames={['Overview']}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

