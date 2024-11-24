import React from 'react'
import { Box, Inline } from "@atlaskit/primitives";
import  Textfield  from "@atlaskit/textfield";
import  Label  from "@atlaskit/form";
import  Select  from "@atlaskit/select";
import  InlineEdit  from "@atlaskit/inline-edit";
import  DataTypes  from '../common/constants'

export default function MappingField({ field, selectedConfig, setSelectedConfig, setMappingObject }) {
  return (
    <Box xcss={{ width: "90%", marginBlockEnd: "space.300" }}>
    <Inline
      space="space.200"
      alignBlock="center"
      shouldWrap
    >
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
          options={
            selectedConfig?.type?.sparrowOptions ?? []
          }
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
  )
}
