import React from "react";
import { useTriggerContext } from "../context/TriggerContext";
import { useAppContext } from "../context/AppContext";
import { Text } from "@atlaskit/primitives";
import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";
import  Icon  from "@atlaskit/icon";

export default function SingleTrigger(trigger) {
  const { getTriggerById, enableTriggerById, disableTriggerById, deleteTriggerById } = useTriggerContext();
  const { setTriggerObject, setCurrentPage, changePage, setChangePage } = useAppContext();
  return (
    <SectionMessage
      title={`Trigger For ${trigger?.trigger?.survey?.label}`}
      appearance="information"
      actions={[
        <SectionMessageAction
          onClick={async () => {
            const response = await getTriggerById(trigger?.trigger?.id);
            setTriggerObject(response);
            setCurrentPage({
              page: "trigger",
              id: 4,
            });
          }}
        >
          <Icon glyph="edit" label="edit" size="small" />
          Edit Trigger
        </SectionMessageAction>,
        <SectionMessageAction
          onClick={async () => {
            await deleteTriggerById(trigger?.trigger?.id);
            setChangePage(!changePage);
          }}
        >
          Delete
        </SectionMessageAction>,
        <SectionMessageAction
          onClick={async () => {
            if (trigger?.trigger?.isEnabled) {
              await disableTriggerById(trigger?.trigger?.id);
            } else {
              await enableTriggerById(trigger?.trigger?.id);
            }
            setChangePage(!changePage);
          }}
        >
          {trigger?.trigger?.isEnabled ? "Disable" : "Enable"}
        </SectionMessageAction>,
      ]}
    >
      <Text>Jira Project: {trigger?.trigger?.jiraProject?.label}</Text>
    </SectionMessage>
  );
}
