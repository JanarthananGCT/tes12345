import React, { createContext, useContext, useState } from 'react';
import { invoke } from '@forge/bridge';
import { generateUniqueId } from '../common/helper';
import { useAppContext } from './AppContext';

const TriggerContext = createContext();

export function TriggerProvider({ children }) {
  const [configuredTriggers, setConfiguredTriggers] = useState([]);
  const { setChangePage, changePage } = useAppContext();

  const getAllTriggers = async () => {
    const response = await invoke("getTrigger");
    setConfiguredTriggers(response.length ? response : []);
    return response.length ? response : [];
  };

  const disableTriggerById = async (triggerId) => {
    await invoke("disableTrigger", { id: triggerId });
    setChangePage(!changePage);
  };

  const enableTriggerById = async (triggerId) => {
    await invoke("enableTrigger", { id: triggerId });
    setChangePage(!changePage);
  };

  const deleteTriggerById = async (triggerId) => {
    await invoke("deleteTriggerById", { id: triggerId });
    setChangePage(!changePage);
  };

  const handleSaveTrigger = async (trigger) => {
    const existing = await getAllTriggers();
    let existingTriggers = [...existing];
    if (trigger.id) {
      existingTriggers = existingTriggers.map((t) =>
        t.id === trigger.id ? trigger : t
      );
    } else {
      existingTriggers.push({
        ...trigger,
        id: generateUniqueId(),
        isEnabled: true,
      });
    }
    await invoke("saveTrigger", { trigger: existingTriggers });
    setChangePage(!changePage);
  };

  const getTriggerById = async (triggerId) => {
    return await invoke("getTriggersById", { id: triggerId });
  };

  const value = {
    configuredTriggers,
    getAllTriggers,
    disableTriggerById,
    enableTriggerById,
    deleteTriggerById,
    handleSaveTrigger,
    getTriggerById
  };

  return (
    <TriggerContext.Provider value={value}>
      {children}
    </TriggerContext.Provider>
  );
}

export function useTriggerContext() {
  const context = useContext(TriggerContext);
  if (context === undefined) {
    throw new Error('useTriggerContext must be used within a TriggerProvider');
  }
  return context;
}
