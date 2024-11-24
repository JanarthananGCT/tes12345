import React from "react";
import { useMappingsContext } from "../context/MappingsContext";
import { useAppContext } from "../context/AppContext";
import { Text } from "@atlaskit/primitives";
import SectionMessage, { SectionMessageAction } from "@atlaskit/section-message";
import  Icon  from "@atlaskit/icon";

export default function SingleMapping(mapping) {
  const { getMappingById, deleteMappingById, enableMappingsById, disableMappingsById } = useMappingsContext();
  const { setMapping, setCurrentPage, changePage, setChangePage } =
    useAppContext();
  return (
    <SectionMessage
      title={`Mapping For ${mapping?.mapping?.mappingObject?.survey?.label}`}
      appearance="discovery"
      actions={[
        <SectionMessageAction
          onClick={async () => {
            const response = await getMappingById(mapping?.mapping?.id);
            setMapping(response);
            setCurrentPage({
              page: "authorized edit mapping",
              id: 6,
            });
          }}
        >
          <Icon glyph="edit" label="edit" size="small" />
          Edit Mapping
        </SectionMessageAction>,
        <SectionMessageAction
          onClick={async () => {
            await deleteMappingById(mapping?.mapping?.id);
            setChangePage(!changePage);
          }}
        >
          Delete
        </SectionMessageAction>,
        <SectionMessageAction
          onClick={async () => {
            if (mapping?.mapping?.isEnabled) {
              await disableMappingsById(mapping?.mapping?.id);
            } else {
              await enableMappingsById(mapping?.mapping?.id);
            }
            setChangePage(!changePage);
          }}
        >
          {mapping?.mapping?.isEnabled ? "Disable" : "Enable"}
        </SectionMessageAction>,
      ]}
    >
      <Text>
        Jira Project:{" "}
        {mapping?.mapping?.mappingObject?.jiraProject[0]?.label}
        {/* {mapping?.mappings
          .map(
            (m) =>
              jiraProjects.find((p) => p.value === m.fields.project.key)?.label
          )
          .join(", ")} */}
      </Text>
    </SectionMessage>
  );
}
