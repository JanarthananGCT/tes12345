import React from 'react'
import { Box, Inline, Text,} from "@atlaskit/primitives";
import  Heading  from "@atlaskit/heading";
import  Button  from "@atlaskit/button/new";
import  Icon  from "@atlaskit/icon";
import  Image  from "@atlaskit/image";
import { useAuthContext } from '../context/AuthContext'
import { useAppContext } from '../context/AppContext'

export default function Landing() {
  const { handleConnect } = useAuthContext();
  const { changePage, setChangePage } = useAppContext();
  return (
      <Box
        xcss={{
          margin: "space.300",
          marginBlock: "space.500",
          width: "90%",
        }}
      >
        <Inline spread="space-between" shouldWrap>
          <Box>
            <Inline alignInline="center" space="space.200">
              <Box
                xcss={{
                  width: "180px",
                  height: "180px",
                }}
              >
                <Image src="https://appnest-app.salesparrow.com/SurveyMigrationTest-4119/version_1.0/icon/Color.png" />
              </Box>
              <Box xcss={{ marginBlockStart: "space.50" }}>
                <Inline
                  alignBlock="center"
                  space="space.100"
                >
                  <Heading as="h3">Surveysparrow</Heading>

                  <Button
                    onClick={() => console.log("5678")}
                    appearance="subtle"
                  >
                    <Icon glyph="info" label="info" size="small" />
                  </Button>
                </Inline>
                <Box
                  xcss={{
                    marginBlockStart: "space.100",
                    marginBlockEnd: "space.200",
                  }}
                >
                  <Text>
                    Connect your Surveysparrow account to start using the
                    integration and streamline your workflow across platforms
                    surveysparrow account to start using the integration and
                    streamline your workflow across platforms Surveysparrow
                    account to
                  </Text>
                </Box>
                <Button
                  size="small"
                  iconAfter="shortcut"
                  appearance="primary"
                  onClick={() => {
                    handleConnect();
                    setChangePage(!changePage);
                  }}
                >
                  Connect
                </Button>
              </Box>
            </Inline>
          </Box>
        </Inline>
        <Box
          xcss={{
            marginBlock: "space.200",
          }}
        >
          <Heading as="h4">GETTING STARTED</Heading>
        </Box>
        <Box
          xcss={{
            marginBlock: "space.200",
          }}
        >
          <Box
            xcss={{
              marginBlockStart: "space.100",
              marginBlockEnd: "space.200",
            }}
          >
            <Inline
              space="space.100"
              alignBlock="center"
              alignInline="center"
            >
              <Icon glyph="check-circle" label="check-circle" />
              <Text>
                Connect your Surveysparrow account to start using the
                integration and streamline your workflow across platforms
                surveysparrow account to start using the integration and
                streamline your workflow across platforms Surveysparrow
                account to
              </Text>
            </Inline>
            <Inline
              space="space.100"
              alignBlock="center"
              alignInline="center"
            >
              <Icon glyph="check-circle" label="check-circle" />
              <Text>
                Connect your Surveysparrow account to start using the
                integration and streamline your workflow across platforms
                surveysparrow account to start using the integration and
                streamline your workflow across platforms Surveysparrow
                account to
              </Text>
            </Inline>
            <Inline alignBlock="center" alignInline="center">
              <Box
                xcss={{
                  marginBlock: "space.300",
                  minWidth: "300px",
                  minHeight: "300px",
                }}
              >
                <Image src="https://static.surveysparrow.com/site/assets/integrations/inner/microsoft/v2/create-and-share-chat-surveys-directly-from-teams.png" />
              </Box>
            </Inline>
            <Inline
              space="space.100"
              alignBlock="center"
              alignInline="center"
            >
              <Icon glyph="check-circle" label="check-circle" />
              <Text>
                Connect your Surveysparrow account to start using the
                integration and streamline your workflow across platforms
                surveysparrow account to start using the integration and
                streamline your workflow across platforms Surveysparrow
                account to
              </Text>
            </Inline>
            <Inline
              space="space.100"
              alignBlock="center"
              alignInline="center"
            >
              <Icon glyph="check-circle" label="check-circle" />
              <Text>
                Connect your Surveysparrow account to start using the
                integration and streamline your workflow across platforms
                surveysparrow account to start using the integration and
                streamline your workflow across platforms Surveysparrow
                account to
              </Text>
            </Inline>
            <Inline
              space="space.100"
              alignBlock="center"
              alignInline="center"
            >
              <Icon glyph="check-circle" label="check-circle" />
              <Text>
                Connect your Surveysparrow account to start using the
                integration and streamline your workflow across platforms
                surveysparrow account to start using the integration and
                streamline your workflow across platforms Surveysparrow
                account to
              </Text>
            </Inline>
            <Inline alignBlock="center" alignInline="center">
              <Box
                xcss={{
                  marginBlock: "space.300",
                  minWidth: "300px",
                  minHeight: "300px",
                }}
              >
                <Image src="https://static.surveysparrow.com/site/assets/integrations/inner/microsoft/v2/create-and-share-chat-surveys-directly-from-teams.png" />
              </Box>
            </Inline>
          </Box>
        </Box>
      </Box>
  )
}
