import React from "react";
import { Box, Inline, Stack,Text } from "@atlaskit/primitives";
import  Image  from "@atlaskit/image";
import  Heading  from "@atlaskit/heading";
import DropDown from "./DropDown";

export default function CustomEmptyState() {
  return (
    <Box
    xcss={{
      marginBlockStart: "space.500",
      width: "100%",
    }}
  >
    <Inline alignBlock="center" alignInline="center">
      <Stack
        space="space.075"
        alignBlock="center"
        alignInline="center"
      >
        <Box
          xcss={{ width: "150px", height: "150px" }}
        >
          <Image src="https://developer.atlassian.com//console/assets/assets/SearchNoResults.ae017adfe3f389e4be72.svg" />
        </Box>
        <Box>
          <Heading as="h4">No Datas Found</Heading>
        </Box>
        <Box xcss={{ marginBlockEnd: "space.075" }}>
          <Text>
            Create a Trigger/Mapping to automatically
            share Surveysparrow data to Jira
          </Text>
          <Inline alignInline="center">
            <Text>when a jira event is happened</Text>
          </Inline>
        </Box>
        <DropDown />
      </Stack>
    </Inline>
    </Box>
  );
}
