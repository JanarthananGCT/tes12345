import React, { createContext, useContext, useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';
import { DataTypes } from '../common/constants';

const SparrowContext = createContext();

export function SparrowProvider({ children }) {
  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [expressions, setExpressions] = useState([]);
  const [variables, setVariables] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [shareChannels, setShareChannels] = useState([]);
  const [sparrowOptions, setSparrowOptions] = useState(DataTypes);
  useEffect(() => {
    setSparrowOptions(sparrowOptions.map((option) => ({
      ...option,
      sparrowOptions: option.value === "question" ? questions : option.value === "expression" ? expressions : option.value === "variable" ? variables : contacts,
    })));
  }, [contacts, questions, expressions, variables]);

  const getAllSurveys = async () => {
    const response = await invoke("getAllSurveys");
    setSurveys(
      JSON.parse(response).data.map((survey) => ({
        value: survey.id,
        label: survey.name,
      }))
    );
  };

  const getAllQuestions = async (surveyId) => {
    const response = await invoke("getAllSurveyQuestions", { surveyId });
    const parsedResponse = JSON.parse(response).data.map((question) => ({
      value: `{question_${question.id}}`,
      label: question.rtxt,
    }));
    setQuestions(parsedResponse);
  };

  const getAllExpressions = async (surveyId) => {
    const response = await invoke("getAllSurveyExpressions", { surveyId });
    const parsedResponse = JSON.parse(response).data?.map((expression) => ({
      value: `{expression_${expression.id}}`,
      label: expression.name,
    }));
    setExpressions(parsedResponse);
  };

  const getAllVariables = async (surveyId) => {
    const response = await invoke("getAllSurveyVariables", { surveyId });
    const parsedResponse = JSON.parse(response).data.map((variable) => ({
      value: `custom_param_${variable.name}`,
      label: variable.label,
    }));
    setVariables(parsedResponse);
  };

  const getAllContacts = async () => {
    const response = await invoke("getAllSurveyContacts");
    const parsedResponse = JSON.parse(response).data?.map((contact) => ({
      value: `{contact_${contact.name}}`,
      label: contact.label,
    }));
    setContacts(parsedResponse);
  };

  const getAllShareChannels = async (surveyId) => {
    const response = await invoke("getAllShareChannels", { surveyId });
    console.log(response, "response");
    setShareChannels(
      JSON.parse(response)?.data?.map((channel) => ({
        value: channel.id,
        label: channel.name,
        type: channel.type,
      }))
    );
    return response;
  };

  const value = {
    sparrowOptions,
    surveys,
    questions,
    expressions,
    variables,
    contacts,
    shareChannels,
    getAllSurveys,
    getAllQuestions,
    getAllExpressions,
    getAllVariables,
    getAllContacts,
    getAllShareChannels,
  };

  return <SparrowContext.Provider value={value}>{children}</SparrowContext.Provider>;
}

export function useSparrowContext() {
  const context = useContext(SparrowContext);
  if (context === undefined) {
    throw new Error('useSparrowContext must be used within a SparrowProvider');
  }
  return context;
}
