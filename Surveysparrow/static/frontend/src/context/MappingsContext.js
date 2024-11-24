import React, { createContext, useContext, useState } from 'react';
import { invoke } from '@forge/bridge';
import { constructPayload, generateUniqueId } from '../common/helper';
import { useAppContext } from './AppContext';

const MappingsContext = createContext();

export function MappingsProvider({ children }) {
  const { setChangePage, changePage } = useAppContext();
  const [mappings, setMappings] = useState([]);

  const getMappings = async () => {
    const response = await invoke("getMappingObject");
    setMappings(response);
  };

  const handleSaveMapping = async (mappingObject) => {
    try {
      const payload = constructPayload(
        mappingObject.jiraProject,
        mappingObject?.ticketType?.value,
        mappingObject.fields.find(
          (field) => field?.jiraField?.value === "summary"
        )?.sparrowField?.value,
        mappingObject.fields.find(
          (field) => field?.jiraField?.value === "description"
        )?.sparrowField?.value,
        mappingObject.fields.find(
          (field) => field?.jiraField?.value === "priority"
        )?.sparrowField?.value,
        mappingObject.fields.find(
          (field) => field?.jiraField?.value === "labels"
        )?.sparrowField?.value,
        mappingObject.fields.find(
          (field) => field?.jiraField?.value === "duedate"
        )?.sparrowField?.value,
        mappingObject.fields.find(
          (field) => field?.jiraField?.value === "environment"
        )?.sparrowField?.value
      );
      const webhookURL = await invoke("getWebTriggerUrl", {
        triggerId: "create-ticket-webtrigger",
      });
      const id = generateUniqueId();
      const webhookResponse = await invoke("setSurveysparrowWebhook", {
        data: {
          url: webhookURL,
          event_type: "submission_completed",
          survey_id: mappingObject.survey.value,
          http_method: "POST",
          name: `Jira_webhook_${id}`,
          payload: JSON.stringify(
            payload.map((payload) => ({ ...payload, uid: id }))
          ),
        },
      });
      const tempMappings = mappings ? [...mappings] : [];
      tempMappings.push({
        id: id,
        isEnabled: true,
        surveyId: mappingObject.survey.value,
        webhookURL: webhookURL,
        mappingObject: mappingObject,
        mappings: payload.map((payload) => ({ ...payload, uid: id })),
      });
      await invoke("storeMappingObject", {
        mappings: tempMappings,
      });
      setChangePage(!changePage);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const disableMappingsById = async (mappingId) => {
    return await invoke("disableMappingsById", { id: mappingId });
  };

  const enableMappingsById = async (mappingId) => {
    return await invoke("enableMappingsById", { id: mappingId });
  };

  const deleteMappingById = async (mappingId) => {
    return await invoke("deleteMappingsById", { id: mappingId });
  };

  const value = {
    mappings,
    getMappings,
    handleSaveMapping,
    disableMappingsById,
    enableMappingsById,
    deleteMappingById,
  };

  return <MappingsContext.Provider value={value}>{children}</MappingsContext.Provider>;
}

export function useMappingsContext() {
  const context = useContext(MappingsContext);
  if (context === undefined) {
    throw new Error('useMappingsContext must be used within a MappingsProvider');
  }
  return context;
}
