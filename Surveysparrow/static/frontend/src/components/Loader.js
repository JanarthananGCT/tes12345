import React from 'react'
import { Box, Inline } from "@atlaskit/primitives";
import  Heading  from "@atlaskit/heading";
import  Button  from "@atlaskit/button/new";
import  Icon  from "@atlaskit/icon";
import  Image  from "@atlaskit/image";
import  Spinner  from "@atlaskit/spinner";

export default function Loader() {
  return (
    <Box xcss={{ width: '90%', margin: 'space.500', height: '80vh' }}>
      <Inline spread="space-between" shouldWrap>
        <Box>
          <Inline alignBlock="center" alignInline="center" space="space.100">
            <Box xcss={{ width: '30px', height: '30px' }}>
              <Image src="https://appnest-app.salesparrow.com/SurveyMigrationTest-4119/version_1.0/icon/Color.png" />
            </Box>
            <Heading as="h3">Surveysparrow</Heading>
            <Button onClick={() => console.log('Info clicked')} appearance="subtle">
              <Icon glyph="info" label="info" size="small" />
            </Button>
          </Inline>
        </Box>
      </Inline>
      <Box xcss={{ paddingBlockStart: 'space.500', marginBlock: 'space.500', height: '700px', justifyContent: 'center', alignItems: 'center'  }}>
        <Inline alignBlock="center" alignInline="center">
          <Spinner size="large" />
        </Inline>
      </Box>
    </Box>
  )
}