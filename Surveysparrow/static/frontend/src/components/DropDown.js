import React, { useState } from "react";
import { Box, Inline, Stack } from "@atlaskit/primitives";
import  Button  from "@atlaskit/button/new";
import  Popup  from "@atlaskit/popup";
import { useAppContext } from "../context/AppContext";
export default function DropDown() {
  const { setCurrentPage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      content={() => (
        <Box
          xcss={{
            width: "150px",
          }}
        >
          <Stack>
            <Button
              appearance="subtle"
              shouldFitContainer
              onClick={() => {
                setIsOpen(!isOpen);
                setCurrentPage({
                  page: "Mapping",
                  id: 3,
                });
              }}
            >
              <Inline alignInline="start">New Mapping</Inline>
            </Button>
            <Button
              appearance="subtle"
              shouldFitContainer
              onClick={() => {
                setIsOpen(!isOpen);
                setCurrentPage({
                  page: "Trigger",
                  id: 4,
                });
              }}
            >
              <Inline alignInline="start"> New Trigger</Inline>
            </Button>
          </Stack>
        </Box>
      )}
      trigger={() => (
        <Button
          appearance="primary"
          iconAfter="chevron-down"
          size="small"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add New
        </Button>
      )}
    />
  );
}
