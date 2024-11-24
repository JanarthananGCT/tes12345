import React, { Fragment } from "react";

import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/new";
import Select from "@atlaskit/select";
import Form, {
  Field,
  FormFooter,
  FormSection,
  HelperMessage,
} from "@atlaskit/form";
import { invoke } from "@forge/bridge";

const LinkIssuesForm = ({ surveys, setLocalLinks, setShowAddSurveys, issueKey }) => {
  const options = surveys?.map((survey) => ({
    label: survey.surveyName,
    value: survey.link,
    id: survey.surveyId
  }))
  return (
    <div>
      <Form
        onSubmit={async (data) => {
          const parseData = data?.surveys?.map((survey) => ({
            surveyName: survey.label,
            link: survey.value,
            surveyId: survey.id
          }))
          await invoke("linkSurveysToIssue", {
            surveys: {
              surveys: parseData
            },
            issueKey: issueKey
          });
          const linkedSurveys = await invoke("getAllLinkedSurveys", {
            issueKey: issueKey
          })
          setLocalLinks(linkedSurveys?.surveys);
          setShowAddSurveys(false)
        }}
      >
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <div
              style={{
                height: "160px",
              }}
            >
              <FormSection>
                <Field
                  aria-required={true}
                  name="surveys"
                  label="Surveys"
                  isRequired
                >
                  {({ fieldProps: { id, ...rest }, error }) => (
                    <>
                      <Select
                        inputId={id}
                        {...rest}
                        options={options}
                        isMulti
                      />
                      <HelperMessage>
                        Choose surveys to link to this issue
                      </HelperMessage>
                    </>
                  )}
                </Field>
              </FormSection>
            </div>
            <FormFooter>
              <ButtonGroup label="Form submit options">
                <Button appearance="subtle" onClick={() => setShowAddSurveys(false)}>Cancel</Button>
                <Button type="submit" appearance="primary" isLoading={submitting}>
                  Link
                </Button>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  )
}

export default LinkIssuesForm;
