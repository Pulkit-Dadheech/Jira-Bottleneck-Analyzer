import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import DashboardContent from './DashboardContent';
import 'boxicons/css/boxicons.min.css';
import { useSidebar } from '../context/SidebarContext';

const Dashboard = () => {
  const { activeSection } = useSidebar('dashboard');

  return (
    <>
      <Header />
      <Sidebar
        titleName="Dashboard Elements"
        activeSectionList={['dashboard']}
        LogoComponents={[() => <i className="bx bx-dashboard"></i>]} // Pass an array of components
        sectionNames={['MainPage']}
      />
      {activeSection === 'dashboard' && <DashboardContent />}
    </>
  );
};

export default Dashboard;

