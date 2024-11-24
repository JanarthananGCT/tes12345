import Resolver from '@forge/resolver';
import api, { route, storage, webTrigger } from '@forge/api';
import axios from 'axios';

const resolver = new Resolver();

const getSurveySparrowToken = async () => await storage.get('Token');
const getSurveySparrowHeaders = async () => ({
  'Authorization': await getSurveySparrowToken(),
  'Content-Type': 'application/json'
});

const fetchSurveySparrowData = async (url, surveyId) => {
  const token = await getSurveySparrowToken();
  const response = await axios.get(`${url}?survey_id=${surveyId}`, {
    headers: { 'Authorization': token }
  });
  return JSON.stringify(response.data);
};

resolver.define('initSurveySparrowAuth', async () => {
  const surveySparrow = api.asUser().withProvider('surveysparrow', 'surveysparrow-api');
  const isAuthenticated = await surveySparrow.hasCredentials();
  console.log(`surveysparrow: ${isAuthenticated}`);
  if (!isAuthenticated) {
    const data = await surveySparrow.requestCredentials();
    console.log(data, "data");
  }
});

resolver.define('checkAuthStatus', async () => {
  try {
    const surveySparrow = api.asUser().withProvider('surveysparrow');
    const hasCredentials = await surveySparrow.hasCredentials();
    const isAuthenticated = await storage.get('surveysparrow_authenticated');
    return { authenticated: hasCredentials && isAuthenticated };
  } catch (error) {
    console.error('Auth status check error:', error);
    return { authenticated: false };
  }
});

resolver.define('getUserProfile', async () => {
  try {
    const surveySparrow = api.asUser().withProvider('surveysparrow');
    const response = await surveySparrow.fetch('/api/v1/users/me');
    return await response.json();
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
});

resolver.define('getAllSurveys', async () => {
  try {
    const token = await getSurveySparrowToken();
    const response = await axios.get('https://api.surveysparrow.com/v3/surveys', {
      headers: { 'Authorization': token }
    });
    return JSON.stringify(response.data);
  } catch (error) {
    console.error('Surveys fetch error:', error);
    throw error;
  }
});

resolver.define('getAllSurveyContacts', async () => {
  try {
    const token = await getSurveySparrowToken();
    const response = await axios.get('https://api.surveysparrow.com/v3/contact_properties', {
      headers: { 'Authorization': token }
    });
    return JSON.stringify(response.data);
  } catch (error) {
    console.error('SurveySparrow contacts fetch error:', error);
    throw error;
  }
});

resolver.define('getAllSurveyQuestions', async (req) => {
  try {
    return await fetchSurveySparrowData('https://api.surveysparrow.com/v3/questions', req.payload.surveyId);
  } catch (error) {
    console.error('SurveySparrow questions fetch error:', error);
    throw error;
  }
});

resolver.define('getAllSurveyExpressions', async (req) => {
  try {
    return await fetchSurveySparrowData('https://api.surveysparrow.com/v3/expressions', req.payload.surveyId);
  } catch (error) {
    console.error('SurveySparrow expressions fetch error:', error);
    throw error;
  }
});

resolver.define('getAllSurveyVariables', async (req) => {
  try {
    return await fetchSurveySparrowData('https://api.surveysparrow.com/v3/variables', req.payload.surveyId);
  } catch (error) {
    console.error('SurveySparrow variables fetch error:', error);
    throw error;
  }
});

resolver.define('getAllJiraProjects', async () => {
  try {
    const jira = api.asUser().requestJira(route`/rest/api/3/project/search`, {
      headers: { 'Accept': 'application/json' },
      searchParams: { maxResults: 200 }
    });
    const response = await jira;
    return await response.json();
  } catch (error) {
    console.error('Jira projects fetch error:', error);
    throw error;
  }
});

resolver.define('storeMappingObject', async (req) => {
  try {
    await storage.set('mappingObject', req.payload.mappings);
    return { success: true, message: 'Mapping object stored successfully' };
  } catch (error) {
    console.error('Error storing mapping object:', error);
    throw error;
  }
});

resolver.define('getMappingObject', async () => {
  try {
    return await storage.get('mappingObject') || null;
  } catch (error) {
    console.error('Error retrieving mapping object:', error);
    throw error;
  }
});

resolver.define('deleteMappingObject', async (req) => {
  return await storage.delete(req.payload.key);
});

resolver.define('setSurveysparrowWebhook', async (req) => {
  try {
    const token = await getSurveySparrowToken();
    const webhookResponses = [];
    const baseConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.surveysparrow.com/v3/webhooks',
      headers: await getSurveySparrowHeaders()
    };

    const payloadItems = JSON.parse(req.payload.data.payload);
    for (const item of payloadItems) {
      const webhookData = {
        url: req.payload.data.url,
        event_type: req.payload.data.event_type,
        survey_id: req.payload.data.survey_id,
        http_method: req.payload.data.http_method,
        name: req.payload.data.name,
        payload: item
      };

      const config = { ...baseConfig, data: JSON.stringify(webhookData) };
      const response = await axios.request(config);
      webhookResponses.push(response.data);
    }

    return {
      success: true,
      message: 'Webhooks created successfully',
      responses: webhookResponses
    };
  } catch (error) {
    console.error('Webhook creation error:', error);
    throw error;
  }
});

resolver.define('getWebTriggerUrl', async (req) => {
  return await webTrigger.getUrl(req.payload.triggerId);
});

resolver.define('setToken', async (req) => {
  return await storage.set('Token', `Bearer ${req.payload.token}`);
});

resolver.define('getToken', async () => {
  return await getSurveySparrowToken();
});

resolver.define('getAllShareChannels', async (req) => {
  try {
    return await fetchSurveySparrowData('https://api.surveysparrow.com/v3/channels', req.payload.surveyId);
  } catch (error) {
    console.error('SurveySparrow channels fetch error:', error);
    throw error;
  }
});

resolver.define('getMappingsById', async (req) => {
  const response = await storage.get('mappingObject');
  return response.find(mapping => mapping.id === req.payload.id);
});

resolver.define('deleteMappingsById', async (req) => {
  try {
    const token = await getSurveySparrowToken();
    const response = await axios.get('https://api.surveysparrow.com/v3/webhooks', {
      headers: { 'Authorization': token }
    });
    const webhooks = response.data?.data.filter(webhook => webhook.name === `Jira_webhook_${req.payload.id}`);
    const deletedWebhooks = [];
    for (const item of webhooks) {
      const response = await axios.delete(`https://api.surveysparrow.com/v3/webhooks/${item.id}`, {
        headers: { 'Accept': '*/*', 'Authorization': token }
      });
      deletedWebhooks.push(response.data);
    }
    const currentMappings = await storage.get('mappingObject');
    const mappings = currentMappings.filter(mapping => mapping.id !== req.payload.id);
    return await storage.set('mappingObject', mappings);
  } catch (error) {
    console.error('SurveySparrow variables fetch error:', error);
    throw error;
  }
});

resolver.define('disableMappingsById', async (req) => {
  try {
    const token = await getSurveySparrowToken();
    const response = await axios.get('https://api.surveysparrow.com/v3/webhooks', {
      headers: { 'Authorization': token }
    });
    const webhooks = response.data?.data.filter(webhook => webhook.name === `Jira_webhook_${req.payload.id}`);
    const deletedWebhooks = [];
    for (const item of webhooks) {
      const response = await axios.delete(`https://api.surveysparrow.com/v3/webhooks/${item.id}`, {
        headers: { 'Accept': '*/*', 'Authorization': token }
      });
      deletedWebhooks.push(response.data);
    }
    const mappings = await storage.get('mappingObject');
    const currentMapping = mappings.find(mapping => mapping.id === req.payload.id);
    currentMapping.isEnabled = false;
    const updatedMappings = mappings.map(mapping => mapping.id === req.payload.id ? currentMapping : mapping);
    await storage.set('mappingObject', updatedMappings);
    return deletedWebhooks;
  } catch (error) {
    console.error('SurveySparrow variables fetch error:', error);
    throw error;
  }
});

resolver.define('enableMappingsById', async (req) => {
  try {
    const token = await getSurveySparrowToken();
    const mappings = await storage.get('mappingObject');
    const currentMapping = mappings.find(mapping => mapping.id === req.payload.id);
    const webhookResponses = [];
    const baseConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.surveysparrow.com/v3/webhooks',
      headers: await getSurveySparrowHeaders()
    };

    const payloadItems = currentMapping.mappings;
    for (const item of payloadItems) {
      const webhookData = {
        url: currentMapping.webhookURL,
        event_type: "submission_completed",
        survey_id: currentMapping.surveyId,
        http_method: "POST",
        name: `Jira_webhook_${currentMapping.id}`,
        payload: item
      };
      const config = { ...baseConfig, data: JSON.stringify(webhookData) };
      const response = await axios.request(config);
      webhookResponses.push(response.data);
    }
    currentMapping.isEnabled = true;
    const updatedMappings = mappings.map(mapping => mapping.id === req.payload.id ? currentMapping : mapping);
    await storage.set('mappingObject', updatedMappings);
    return { success: true, message: 'Webhooks enabled successfully' };
  } catch (error) {
    console.error('SurveySparrow variables fetch error:', error);
    throw error;
  }
});

resolver.define('updateMappingsById', async (req) => {
  return await storage.set(req.payload.id, req.payload.mappings);
});

resolver.define('logout', async () => {
  return await storage.delete('Token');
});

resolver.define('saveTrigger', async (req) => {
  return await storage.set('Trigger', req.payload.trigger);
});

resolver.define('getTrigger', async () => {
  return await storage.get('Trigger');
});

resolver.define('deleteTrigger', async () => {
  return await storage.delete('Trigger');
});

resolver.define('disableTrigger', async (req) => {
  const triggers = await storage.get('Trigger');
  const currentTrigger = triggers.find(trigger => trigger.id === req.payload.id);
  currentTrigger.isEnabled = false;
  const updatedTriggers = triggers.map(trigger => trigger.id === req.payload.id ? currentTrigger : trigger);
  return await storage.set('Trigger', updatedTriggers);
});

resolver.define('enableTrigger', async (req) => {
  const triggers = await storage.get('Trigger');
  const currentTrigger = triggers.find(trigger => trigger.id === req.payload.id);
  currentTrigger.isEnabled = true;
  const updatedTriggers = triggers.map(trigger => trigger.id === req.payload.id ? currentTrigger : trigger);
  return await storage.set('Trigger', updatedTriggers);
});

resolver.define('deleteTriggerById', async (req) => {
  const triggers = await storage.get('Trigger');
  const updatedTriggers = triggers.filter(trigger => trigger.id !== req.payload.id);
  return await storage.set('Trigger', updatedTriggers);
});

resolver.define('getTriggersById', async (req) => {
  const triggers = await storage.get('Trigger');
  return triggers.find(trigger => trigger.id === req.payload.id);
});

export const handler = resolver.getDefinitions();
