import React, { createContext, useContext, useState } from 'react';
import { defaultSelectedConfig, defaultMappingObject, defaultTriggerObject } from '../common/constants';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState({
    page: "dashboard",
    id: 2,
  });
  const [changePage, setChangePage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [trigger, setTrigger] = useState([]);
  const [mapping, setMapping] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(defaultSelectedConfig);
  const [mappingObject, setMappingObject] = useState(defaultMappingObject);
  const [triggerObject, setTriggerObject] = useState(defaultTriggerObject);

  const value = {
    currentPage,
    setCurrentPage,
    changePage,
    setChangePage,
    isLoading,
    setIsLoading,
    showToast,
    setShowToast,
    trigger,
    setTrigger,
    mapping,
    setMapping,
    loading,
    setLoading,
    mappingObject,
    setMappingObject,
    selectedConfig,
    setSelectedConfig,
    triggerObject,
    setTriggerObject,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
