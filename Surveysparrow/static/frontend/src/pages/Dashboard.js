import React from "react";
import { Box, Text, Inline, Stack } from "@atlaskit/primitives";
import  Image  from "@atlaskit/image";
import { SingleValueChart, PieChart } from "@forge/react";
import  Heading  from "@atlaskit/heading";
import Header from "../components/Header";
import { useDashboardContext } from "../context/DashboardContext";
import { useStorageContext } from "../context/StorageContext";
import {
  dashboardDescription,
  issueStatusPerTypeData,
} from "../common/constants";
import DropDown from "../components/DropDown";
import CustomEmptyState from "../components/CustomEmptyState";
import SingleTrigger from "../components/SingleTrigger";
import SingleMapping from "../components/SingleMapping";

export default function Dashboard() {
  const { stats } = useDashboardContext();
  const { triggers, mappings } = useStorageContext();
  return (
    <Box
      xcss={{
        width: "100%",
        margin: "space.500",
      }}
    >
      <Header />
      <Box xcss={{ width: "90%", marginBlock: "space.300" }}>
        <Box
          xcss={{
            marginBlockStart: "space.300",
            marginBlockEnd: "space.300",
          }}
        >
          <Box>
            <Heading as="h4">SPARROW DASHBOARD</Heading>
          </Box>
          <Box xcss={{ marginBlock: "space.100" }}>
            <Text
              color="color.text.discovery"
              xcss={{ color: "color.text.accent.gray" }}
            >
              {dashboardDescription}
            </Text>
          </Box>
          <Box xcss={{ marginBlock: "space.200" }}>
            <Box xcss={{ marginBlock: "space.500" }}>
              <Stack grow="fill">
                <Inline space="space.400" spread="space-between">
                  {stats.map((stat) => (
                    <Stack grow="fill">
                      <SingleValueChart
                        title={stat.title}
                        data={stat.value}
                        showBorder={true}
                      />
                    </Stack>
                  ))}
                </Inline>
              </Stack>
            </Box>
            <Box xcss={{ marginBlock: "space.500" }}>
              <Stack grow="fill">
                <Inline space="space.400" spread="space-between">
                  <Stack grow="fill">
                    <PieChart
                      data={issueStatusPerTypeData}
                      colorAccessor="type"
                      labelAccessor="label"
                      valueAccessor="value"
                      title="Type of issues reported"
                      subtitle="Total issues reported grouped by type"
                      showMarkLabels={true}
                      showBorder={true}
                    />
                  </Stack>
                  <Stack grow="fill">
                    <Box
                      xcss={{
                        padding: "space.200",
                        minHeight: "630px",
                        height: "auto",
                        borderWidth: "1px",
                        borderColor: "color.border.disabled",
                        borderStyle: "solid",
                        borderRadius: "space.200",
                      }}
                    >
                      <Box xcss={{ marginBlockEnd: "space.200" }}>
                        <Inline alignInline="center" spread="space-between">
                          <Heading as="h4">Mappings and Triggers</Heading>
                          {triggers?.length || mappings?.length ? (
                            <DropDown />
                          ) : null}
                        </Inline>
                      </Box>
                      {!triggers?.length && !mappings?.length ? (
                        <CustomEmptyState />
                      ) : (
                        <Stack space="space.300">
                          {triggers?.map((trigger) => (
                            <SingleTrigger trigger={trigger} />
                          ))}
                          {mappings?.map((mapping) => (
                            <SingleMapping mapping={mapping} />
                          ))}
                        </Stack>
                      )}
                    </Box>
                  </Stack>
                </Inline>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// import React from 'react'

// export default function Dashboard() {
//   console.log('890')
//   return (
//     <div>Dashboard</div>
//   )
// }
