import React, { createContext, useContext, useState } from 'react';
import { invoke } from '@forge/bridge';

const JiraContext = createContext();

export function JiraProvider({ children }) {
  const [jiraProjects, setJiraProjects] = useState([]);

  const getAllJiraProjects = async () => {
    const response = await invoke("getAllJiraProjects");
    setJiraProjects(
      response.values.map((project) => ({
        value: project.key,
        label: project.name,
      }))
    );
  };

  const value = {
    jiraProjects,
    getAllJiraProjects
  };

  return (
    <JiraContext.Provider value={value}>
      {children}
    </JiraContext.Provider>
  );
}

export function useJiraContext() {
  const context = useContext(JiraContext);
  if (context === undefined) {
    throw new Error('useJiraContext must be used within a JiraProvider');
  }
  return context;
}
