import React, { createContext, useContext, useState } from 'react';
import { invoke } from '@forge/bridge';
import { isObjectEmpty } from '../common/helper';

const StorageContext = createContext();

export function StorageProvider({ children }) {
  const [mappings, setMappings] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [token, setToken] = useState(null);

  const getAllMappings = async () => {
    const response = await invoke("getMappingObject");
    setMappings(response);
  };

  const getAllTriggers = async () => {
    const response = await invoke("getTrigger");
    setTriggers(response);
  };

  const getToken = async () => {
    const response = await invoke("getToken");
    setToken(response);
  };

  const value = {
    mappings,
    triggers,
    token,
    getAllMappings,
    getAllTriggers,
    getToken
  };

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorageContext() {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useStorageContext must be used within a StorageProvider');
  }
  return context;
}
