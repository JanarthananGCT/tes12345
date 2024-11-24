import Resolver from '@forge/resolver';
import api, { route, storage, webTrigger } from '@forge/api';
import axios from 'axios';

const resolver = new Resolver();

export const getSurveySparrowToken = async () => await storage.get('Token');
export const getAllSurveys = async () => {
  try {
    const token = await getSurveySparrowToken();
    const response = await axios.get('https://api.surveysparrow.com/v3/surveys', {
      headers: { 'Authorization': token }
    })
    return JSON.stringify(response.data)
  } catch (error) {
    console.error('Surveys fetch error:', error);
    throw error;
  }
}
const filterLinkShares = (shares) => shares.filter(channel => channel.type === 'LINK').map(channel => ({
  link: channel.share_url.url,
  surveyId: channel.survey_id,
}))

export const getShareLinks = async (surveyId) => {
  try {
    const token = await getSurveySparrowToken();
    const response = await axios.get(`https://api.surveysparrow.com/v3/channels?survey_id=${surveyId}`, {
      headers: { 'Authorization': token }
    });
    const shares = JSON.stringify(response.data)
    return filterLinkShares(JSON.parse(shares).data)
  } catch (error) {
    console.error('channels fetch error:', error);
    throw error;
  }
}

export const getLinks = async () => {
  const surveys = JSON.parse(await getAllSurveys()).data.map((survey) => ({
    surveyId: survey.id,
    surveyName: survey.name,
  }))
  const result = [];

  for (const survey of surveys) {
    const channels = await getShareLinks(survey.surveyId);
    channels.forEach(channel => {
      result.push({
        surveyId: survey.surveyId,
        surveyName: survey.surveyName,
        link: channel.link
      });
    });
  }

  return result;
}
export const getAllLinks = async () => {
  return await storage.get('LinkedSurveys');
}
export const getLinksByIssueKey = async (issueKey) => {
  const links = await getAllLinks();
  return links?.find((link) => link.issueKey === issueKey);
}

export const linkSurveysToIssue = async (surveys, issueKey) => {
  const overallLinks = await getAllLinks() || [];
  const existingLinks = await getLinksByIssueKey(issueKey);
  if (existingLinks) {
    const updatedSurveys = [...existingLinks.surveys, ...surveys.surveys]
    const updatedLink = {
      issueKey: issueKey,
      surveys: updatedSurveys
    }
    const updatedLinks = overallLinks.map(link => link.issueKey === issueKey ? updatedLink : link);
    await storage.set('LinkedSurveys', updatedLinks);
  } else {
    const createLink = {
      issueKey: issueKey,
      surveys: surveys.surveys
    }
    await storage.set('LinkedSurveys', [...overallLinks, createLink]);
  }
}
export const unlinkSurveysFromIssue = async (surveyId, issueKey) => {
  const existingLinks = await getLinksByIssueKey(issueKey);
  const updatedSurveys = existingLinks.surveys.filter(survey => survey.surveyId !== surveyId);
  const updatedLink = {
    issueKey: issueKey,
    surveys: updatedSurveys
  }
  const overallLinks = await getAllLinks();
  const updatedLinks = overallLinks.map(link => link.issueKey === issueKey ? updatedLink : link);
  await storage.set('LinkedSurveys', updatedLinks);
}
export const deleteLink = async (issueKey) => {
  const overallLinks = await getAllLinks();
  const filteredLinks = overallLinks?.filter((link) => link.issueKey !== issueKey);
  await storage.set('LinkedSurveys', filteredLinks);
}
export const deleteAllLinks = async () => {
  await storage.delete('LinkedSurveys');
}



resolver.define('getAllSurveys', async () => {
  try {
    return await getLinks()
  } catch (error) {
    console.error('Surveys fetch error:', error);
    throw error;
  }
});

resolver.define('getAllLinkedSurveys', async (req) => {
  try {
    
    return await getLinksByIssueKey(req.payload.issueKey)
  } catch (error) {
    console.error('Linked Surveys fetch error:', error);
    throw error;
  }
});
resolver.define('linkSurveysToIssue', async (req) => {
  try {
    
    return await linkSurveysToIssue(req.payload.surveys,req.payload.issueKey)
  } catch (error) {
    console.error('link survey to issue error:', error);
    throw error;
  }
});
resolver.define('unlinkSurveyToIssue', async (req) => {
  try {
    return await unlinkSurveysFromIssue(req.payload.surveyId, req.payload.issueKey)
  } catch (error) {
    console.error('unlink survey to issue error:', error);
    throw error;
  }
});

export const handler = resolver.getDefinitions();