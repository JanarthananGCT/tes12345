import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useSparrowContext } from "../context/SparrowContext";
import { JiraEvents, shareTypes } from "../common/constants";
import {
  Box,
  Inline,
  Stack,
} from "@atlaskit/primitives";
import  ButtonGroup  from "@atlaskit/button";
import  Heading  from "@atlaskit/heading";
import  Button  from "@atlaskit/button/new";
import  Icon  from "@atlaskit/icon";
import  Select  from "@atlaskit/select";
import  Label  from "@atlaskit/form";
import  Checkbox  from "@atlaskit/checkbox";
import  Image  from "@atlaskit/image";
import { useJiraContext } from "../context/JiraContext";
import { useTriggerContext } from "../context/TriggerContext";

export default function Trigger() {
  const { triggerObject, setTriggerObject, changePage, setChangePage } = useAppContext();
  const { shareChannels, surveys, getAllShareChannels } = useSparrowContext();
  const { jiraProjects } = useJiraContext();
  const { handleSaveTrigger } = useTriggerContext();
  useEffect(() => {
    if (triggerObject.survey) {
      getAllShareChannels(triggerObject.survey.value);
    }
  }, [triggerObject.survey]);
  return (
    <Box
      xcss={{
        width: "90%",
        margin: "space.500",
        height: "80vh",
      }}
    >
      <Inline spread="space-between" shouldWrap>
        <Box>
          <Inline alignBlock="center" alignInline="center" space="space.100">
            <Box
              xcss={{
                width: "30px",
                height: "30px",
              }}
            >
              <Image src="https://appnest-app.salesparrow.com/SurveyMigrationTest-4119/version_1.0/icon/Color.png" />
            </Box>
            <Heading as="h3">Surveysparrow</Heading>

            <Button onClick={() => console.log("5678")} appearance="subtle">
              <Icon glyph="info" label="info" size="small" />
            </Button>
          </Inline>
        </Box>
      </Inline>
      <Box
        xcss={{
          marginBlock: "space.300",
        }}
      >
        <Box
          xcss={{
            marginBlock: "space.200",
          }}
        >
          <Heading as="h4">CONFIGURE TRIGGERS</Heading>
        </Box>
        <Stack space="space.200">
          <Box>
            <Label labelFor="select">
              Jira Project
              
            </Label>
            <Select
              onChange={(e) => {
                const temp = {
                  ...triggerObject,
                  jiraProject: e,
                };
                setTriggerObject(temp);
              }}
              value={triggerObject.jiraProject}
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
              value={triggerObject.survey}
              onChange={(e) => {
                const temp = {
                  ...triggerObject,
                  survey: e,
                };
                setTriggerObject(temp);
              }}
              options={surveys}
              inputId="select"
              placeholder="Choose survey"
            />
          </Box>
          <Box
            xcss={{
              width: "100%",
            }}
          >
            <Heading as="h5">SELECT JIRA EVENTS</Heading>
            <Box xcss={{ width: "70%", marginBlock: "space.300" }}>
              <Inline alignBlock="center" space="space.200" shouldWrap>
                {JiraEvents.map((event) => (
                  <Checkbox
                    isChecked={
                      triggerObject?.events?.filter(
                        (e) => e?.value === event?.value
                      )?.length > 0
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        const temp = {
                          ...triggerObject,
                          events: [...triggerObject.events, event],
                        };
                        setTriggerObject(temp);
                      } else {
                        const temp = {
                          ...triggerObject,
                          events: triggerObject.events.filter(
                            (e) => e?.value !== event?.value
                          ),
                        };
                        setTriggerObject(temp);
                      }
                    }}
                    value={
                      triggerObject?.events?.filter(
                        (e) => e?.value === event?.value
                      )?.length > 0
                        ? true
                        : false
                    }
                    id={event.value}
                    label={event.label}
                  />
                ))}
              </Inline>
            </Box>
          </Box>
          <Box
            xcss={{
              width: "300px",
            }}
          >
            <Heading as="h5">CONFIGURE SURVEY SHARE</Heading>
          </Box>
          <Box xcss={{ width: "300px" }}>
            <Label labelFor="select">
              Share Type
              
            </Label>
            <Select
              value={triggerObject.shareType}
              onChange={(e) => {
                const temp = {
                  ...triggerObject,
                  shareType: e,
                };
                setTriggerObject(temp);
              }}
              options={shareTypes}
              inputId="select"
              placeholder="Choose share type"
            />
          </Box>
          <Box xcss={{ width: "300px" }}>
            <Label labelFor="select">
              Share Channel
              
            </Label>
            <Select
              value={triggerObject.shareChannel}
              isDisabled={!triggerObject.shareType}
              onChange={(e) => {
                const temp = {
                  ...triggerObject,
                  shareChannel: e,
                };
                setTriggerObject(temp);
              }}
              options={shareChannels.filter(
                (channel) => channel.type === triggerObject.shareType?.value
              )}
              inputId="select"
              placeholder="Choose share channel"
            />
          </Box>
          <Box xcss={{ width: "300px", marginBlockStart: "space.300" }}>
            <ButtonGroup size="medium" label="Default button group">
              <Button
                size="medium"
                appearance="primary"
                onClick={() => {
                  handleSaveTrigger(triggerObject);
                }}
              >
                Save Trigger
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
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
