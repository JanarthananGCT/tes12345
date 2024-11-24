import React, { useState, useEffect } from "react";
import { Box, Inline, Stack, Text } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import AttachmentIcon from "@atlaskit/icon/core/attachment";
import Image from "@atlaskit/image";
import LinkIssuesForm from "../components/Modal";
import { invoke, view } from "@forge/bridge";
import Link from '@atlaskit/link';
import DeleteIcon from '@atlaskit/icon/core/delete';
import { router } from "@forge/bridge";
import Spinner from "@atlaskit/spinner";

export default function IssueContextPage() {
  const [showAddSurveys, setShowAddSurveys] = useState(false)
  const [surveys, setSurveys] = useState(null)
  const [localLinks, setLocalLinks] = useState(null)
  const [issueKey, setIssueKey] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState({
    id: false
  })
  const getData = async () => {
    try {
      let issue = ''
      await view.getContext().then((context) => {
        const key = context.extension.issue.key;
        issue = key
        setIssueKey(key);
      })
      const surveyResponse = await invoke("getAllSurveys")
      const mappedSurveys = await invoke("getAllLinkedSurveys", {
        issueKey: issue
      })
      setSurveys(surveyResponse)
      setLocalLinks(mappedSurveys)
    } catch (error) {
      console.log(error)
    } finally {

      setLoading(false)
    }
  }
  useEffect(() => {
    // if (!surveys || !localLinks) {
    getData()
    // }
  }, [])
  const NoSurveys = () => {
    return (
      <Inline alignBlock="center" alignInline="center">
        <Image
          src="https://ss-staging-public.s3.us-east-1.amazonaws.com/Jira+Integration/No_data.svg"
          width={150}
          height={150}
        />
      </Inline>
    );
  };
  const LinkedSurveys = (surveys) => {
    console.log(surveys)
    return (
      <Stack space="space.100" xcss={
        {
          marginBlockStart: "space.200"
        }
      }>
        {surveys?.surveys?.map((link) => (
          <Inline key={link.surveyId} xcss={{
            borderWidth: "1px",
            borderColor: "color.border.disabled",
            borderStyle: "solid",
            borderRadius: "space.200",
          }} alignInline="start" spread="space-between" alignBlock="center" space="space.200">
            <Link onClick={() => {
              router.open(link.link)
            }}>
              {link.surveyName}
            </Link>
            <Button id={link.surveyId} appearance="subtle" isLoading={deleting.id === link.surveyId} onClick={async () => {
              setDeleting({
                id: link.surveyId
              })
              await invoke("unlinkSurveyToIssue",
                {
                  issueKey: issueKey,
                  surveyId: link.surveyId
                }
              )
              const mappedSurveys = await invoke("getAllLinkedSurveys", {
                issueKey: issueKey
              })
              setLocalLinks(mappedSurveys)
              setDeleting(false)
            }}>
              <DeleteIcon color="var(--ds-icon-danger)" />
            </Button>

          </Inline>
        ))}
      </Stack>

    )
  }
  const Header = () => {
    return (
      <Box>
        <Inline
          xcss={{
            width: "100%",
          }}
          alignBlock="center"
          spread="space-between"
          shouldWrap
        >
          <Text size="large">{showAddSurveys ? "Link Surveys" : "Linked Surveys"}</Text>
          {!showAddSurveys && <Button appearance="subtle" onClick={() => setShowAddSurveys(true)}>
            <AttachmentIcon />
          </Button>}
        </Inline>
        <Text size="small">
          Survyes that are linked to this issue from surveysparrow
        </Text>
      </Box>
    );
  };
  return (
    <Box>
      <Header />
      {loading ? <Inline xcss={{
        marginBlock: "space.200"
      }} alignBlock="center" alignInline="center" >
        <Spinner size="large" />
      </Inline> : <Box>
        {showAddSurveys ? <LinkIssuesForm surveys={surveys?.filter((survey) => !localLinks?.surveys?.some((a) => a.surveyId === survey.surveyId))} setLocalLinks={setLocalLinks} setShowAddSurveys={setShowAddSurveys} issueKey={issueKey} /> : <Box>
          {localLinks?.surveys ? <LinkedSurveys surveys={localLinks?.surveys} /> : <NoSurveys />}
        </Box>}
      </Box>}
    </Box>
  );
}
    