import React, { createContext, useContext, useState } from 'react';
import { dashboardData } from '../common/constants';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [stats, setStats] = useState(dashboardData);

  const value = {
    stats,
    setStats
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
}
