import React from "react";
import { Box, Inline } from "@atlaskit/primitives";
import  Button  from "@atlaskit/button/new";
// import  Icon  from "@atlaskit/icon";
import  Image  from "@atlaskit/image";
import  Heading  from "@atlaskit/heading";
import  {useAuthContext}  from "../context/AuthContext";
import  {useAppContext}  from "../context/AppContext";

export default function Header() {
  const { handleLogout } = useAuthContext();
  const { changePage, setChangePage } = useAppContext();
  return (
    <Box xcss={{ width: "90%" }}>
      <Inline spread="space-between" shouldWrap>
        <Box>
          <Inline alignBlock="center" space="space.100">
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
              {/* <Icon glyph="info" label="info" size="small" /> */}
            </Button>
          </Inline>
        </Box>

        <Button appearance="subtle" onClick={()=> {
          handleLogout();
          setChangePage(!changePage);
        }}>
          f
          {/* <Icon
            glyph="question-circle"
            label="question-circle"
            primaryColor="color.icon.danger"
            size="medium"
          /> */}
        </Button>
      </Inline>
    </Box>
  );
}
