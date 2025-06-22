import React from 'react';
import { useSidebar } from '../context/SidebarContext';
import DashboardGraphs from './DashboardGraphs';

const OverviewPage = () => {
  return (
    <>
      <DashboardGraphs />
    </>
  );
};

export default OverviewPage;
