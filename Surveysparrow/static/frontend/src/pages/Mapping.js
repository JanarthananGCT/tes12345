import React, { useState, useEffect } from "react";
import { Box, Stack, Inline } from "@atlaskit/primitives";
import  Textfield  from "@atlaskit/textfield";
import  Select  from "@atlaskit/select";
import  Heading  from "@atlaskit/heading";
import  Label  from "@atlaskit/form";
import  ButtonGroup  from "@atlaskit/button";
import  Button  from "@atlaskit/button/new";
import  Icon  from "@atlaskit/icon";
import  InlineEdit  from "@atlaskit/inline-edit";
import Header from "../components/Header";
import { useAppContext } from "../context/AppContext";
import {
  JiraFields,
  readViewContainerStyles,
  issueStatusPerTypeData,
} from "../common/constants";
import { useSparrowContext } from "../context/SparrowContext";
import { useJiraContext } from "../context/JiraContext";
import { useMappingsContext } from "../context/MappingsContext";
export default function Mapping() {
  const [additionalFields, setAdditionalFields] = useState([]);
  const {
    mappingObject,
    setMappingObject,
    selectedConfig,
    setSelectedConfig,
    changePage,
    setChangePage,
  } = useAppContext();
  const { jiraProjects } = useJiraContext();
  const {
    surveys,
    getAllQuestions,
    getAllExpressions,
    getAllVariables,
    getAllContacts,
    getAllShareChannels,
    sparrowOptions,
  } = useSparrowContext();
  const [DataTypes, setDataTypes] = useState(sparrowOptions);
  const { handleSaveMapping } = useMappingsContext();

  useEffect(() => {
    if (mappingObject?.survey) {
      getAllQuestions(mappingObject?.survey?.value);
      getAllExpressions(mappingObject?.survey?.value);
      getAllVariables(mappingObject?.survey?.value);
      getAllContacts(mappingObject?.survey?.value);
      getAllShareChannels(mappingObject?.survey?.value);
    }
  }, [mappingObject?.survey]);
  useEffect(() => {
    setDataTypes(sparrowOptions);
  }, [sparrowOptions]);
  return (
    <>
      <Box
        xcss={{
          width: "100%",
          margin: "space.300",
        }}
      >
        <Header />
        <Box
          xcss={{
            marginBlock: "space.300",
            width: "300px",
          }}
        >
          <Box
            xcss={{
              marginBlock: "space.200",
            }}
          >
            <Heading as="h4">CONFIGURE MAPPING</Heading>
          </Box>
          <Stack space="space.200">
            <Box>
              <Label labelFor="select">
                Jira Project
                
              </Label>
              <Select
                isMulti={true}
                onChange={(e) => {
                  const temp = {
                    ...mappingObject,
                    jiraProject: e,
                  };
                  setMappingObject(temp);
                }}
                options={jiraProjects}
                inputId="select"
                placeholder="Choose project"
              />
            </Box>
            <Box>
              <Label labelFor="select">
                Survey
                
              </Label>
              <Select
                onChange={(e) => {
                  const temp = {
                    ...mappingObject,
                    survey: e,
                  };
                  setMappingObject(temp);
                }}
                options={surveys}
                inputId="select"
                placeholder="Choose survey"
              />
            </Box>
            <Box>
              <Label labelFor="select">
                Ticket Type
                
              </Label>
              <Select
                onChange={(e) => {
                  const temp = {
                    ...mappingObject,
                    ticketType: e,
                  };
                  setMappingObject(temp);
                }}
                options={issueStatusPerTypeData}
                inputId="select"
                placeholder="Choose ticket type"
              />
            </Box>
          </Stack>
        </Box>
        {mappingObject.survey &&
          mappingObject.jiraProject &&
          mappingObject.ticketType && (
            <>
              <Box
                xcss={{
                  marginBlockStart: "space.400",
                  marginBlockEnd: "space.100",
                }}
              >
                <Heading as="h5">MAP YOUR JIRA FIELDS</Heading>
              </Box>
              {JiraFields.filter((field) => field.isRequired).map((field) => (
                <Box xcss={{ width: "90%", marginBlockEnd: "space.300" }}>
                  <Inline space="space.200" alignBlock="center" shouldWrap>
                    <Box xcss={{ width: "300px" }}>
                      <Label labelFor="select">
                        Type
                        
                      </Label>
                      <Select
                        onChange={(e) => {
                          const temp = {
                            type: e,
                            sparrowField: null,
                            jiraField: field,
                            defaultValue: null,
                          };
                          setSelectedConfig(temp);
                          setMappingObject((prevMapping) => ({
                            ...prevMapping,
                            fields: [...prevMapping.fields, temp],
                          }));
                        }}
                        inputId="select"
                        options={DataTypes}
                        placeholder="Choose type"
                      />
                    </Box>
                    <Box xcss={{ width: "300px" }}>
                      <Label labelFor="select">
                        Sparrow Field
                        
                      </Label>
                      <Select
                        onChange={(e) => {
                          const temp = {
                            ...selectedConfig,
                            sparrowField: e,
                          };
                          setSelectedConfig(temp);
                          setMappingObject((prevMapping) => ({
                            ...prevMapping,
                            fields: prevMapping.fields.map((field) =>
                              field.jiraField === selectedConfig.jiraField
                                ? temp
                                : field
                            ),
                          }));
                        }}
                        inputId="select"
                        options={selectedConfig?.type?.sparrowOptions ?? []}
                        placeholder="Choose Sparrow field"
                      />
                    </Box>
                    <Box xcss={{ width: "300px" }}>
                      <Label labelFor="select">
                        Jira Field
                        
                      </Label>
                      <Select
                        value={field}
                        isDisabled={field.isRequired}
                        onChange={(e) => {
                          const temp = {
                            ...selectedConfig,
                            jiraField: e,
                          };
                          setSelectedConfig(temp);
                          setMappingObject((prevMapping) => ({
                            ...prevMapping,
                            fields: prevMapping.fields.map((field) =>
                              field.jiraField === selectedConfig.jiraField
                                ? temp
                                : field
                            ),
                          }));
                        }}
                        inputId="select"
                        options={JiraFields}
                        placeholder="Choose Jira field"
                      />
                    </Box>
                    <Box xcss={{ width: "300px" }}>
                      <InlineEdit
                        defaultValue={selectedConfig.defaultValue}
                        label="Default Value"
                        editView={({ errorMessage, ...fieldProps }) => (
                          <Textfield {...fieldProps} autoFocus />
                        )}
                        readView={() => (
                          <Box xcss={readViewContainerStyles}>
                            {selectedConfig.defaultValue ||
                              "Enter Default Value"}
                          </Box>
                        )}
                        onConfirm={(value) => {
                          const temp = {
                            ...selectedConfig,
                            defaultValue: value,
                          };
                          setSelectedConfig(temp);
                          setMappingObject((prevMapping) => ({
                            ...prevMapping,
                            fields: prevMapping.fields.map((field) =>
                              field.jiraField === selectedConfig.jiraField
                                ? temp
                                : field
                            ),
                          }));
                        }}
                      />
                    </Box>
                  </Inline>
                </Box>
              ))}
              {additionalFields.map((field) => (
                <Box xcss={{ width: "100%", marginBlock: "space.300" }}>
                  <Inline space="space.200" alignBlock="center" shouldWrap>
                    <Box xcss={{ width: "300px" }}>
                      <Label labelFor="select">
                        Type
                        
                      </Label>
                      <Select
                        onChange={(e) => {
                          const temp = {
                            type: e,
                            sparrowField: null,
                            jiraField: null,
                            defaultValue: null,
                          };
                          setSelectedConfig(temp);
                          setMappingObject((prevMapping) => ({
                            ...prevMapping,
                            fields: [...prevMapping.fields, temp],
                          }));
                        }}
                        inputId="select"
                        options={DataTypes}
                        placeholder="Choose type"
                      />
                    </Box>
                    <Box xcss={{ width: "300px" }}>
                      <Label labelFor="select">
                        Sparrow Field
                        
                      </Label>
                      <Select
                        onChange={(e) => {
                          const temp = {
                            ...selectedConfig,
                            sparrowField: e,
                          };
                          setSelectedConfig(temp);
                          setMappingObject((prevMapping) => ({
                            ...prevMapping,
                            fields: prevMapping.fields.map((field) =>
                              field.jiraField === selectedConfig.jiraField
                                ? temp
                                : field
                            ),
                          }));
                        }}
                        inputId="select"
                        options={selectedConfig?.type?.sparrowOptions ?? []}
                        placeholder="Choose Sparrow field"
                      />
                    </Box>
                    <Box xcss={{ width: "300px" }}>
                      <Label labelFor="select">
                        Jira Field
                        
                      </Label>
                      <Select
                        onChange={(e) => {
                          const temp = {
                            ...selectedConfig,
                            jiraField: e,
                          };
                          setSelectedConfig(temp);
                          setMappingObject((prevMapping) => ({
                            ...prevMapping,
                            fields: prevMapping.fields.map((field) =>
                              field.jiraField === selectedConfig.jiraField
                                ? temp
                                : field
                            ),
                          }));
                        }}
                        inputId="select"
                        options={JiraFields.filter(
                          (field) => !field.isRequired
                        )}
                        placeholder="Choose Jira field"
                      />
                    </Box>
                    <Box xcss={{ width: "300px" }}>
                      <InlineEdit
                        defaultValue={selectedConfig.defaultValue}
                        label="Default Value"
                        editView={({ errorMessage, ...fieldProps }) => (
                          <Textfield {...fieldProps} autoFocus />
                        )}
                        readView={() => (
                          <Box xcss={readViewContainerStyles}>
                            {selectedConfig.defaultValue ||
                              "Enter Default Value"}
                          </Box>
                        )}
                        onConfirm={(value) => {
                          const temp = {
                            ...selectedConfig,
                            defaultValue: value,
                          };
                          setSelectedConfig(temp);
                        }}
                      />
                    </Box>

                    <Box
                      xcss={{
                        marginInlineStart: "space.100",
                        marginBlockStart: "space.200",
                      }}
                    >
                      <Button
                        appearance="subtle"
                        size="medium"
                        onClick={() => {
                          setAdditionalFields(
                            additionalFields.filter(
                              (fields) => fields.id !== field.id
                            )
                          );
                        }}
                      >
                        <Icon glyph="trash" label="trash" />
                      </Button>
                    </Box>
                  </Inline>
                </Box>
              ))}

              <Inline alignInline="center">
                <Box xcss={{ marginBlock: "space.300" }}>
                  <Button
                    iconBefore="add"
                    appearance="default"
                    onClick={() => {
                      setAdditionalFields([
                        ...additionalFields,
                        {
                          id: additionalFields.length + 1,
                        },
                      ]);
                    }}
                  >
                    Add Another
                  </Button>
                </Box>
              </Inline>
              <ButtonGroup size="medium" label="Default button group">
                <Button
                  size="medium"
                  appearance="primary"
                  onClick={() => {
                    handleSaveMapping(mappingObject);
                  }}
                >
                  Save Mapping
                </Button>
                <Button
                  onClick={() => {
                    setChangePage(!changePage);
                  }}
                  size="medium"
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </>
          )}
      </Box>
    </>
  );
}
