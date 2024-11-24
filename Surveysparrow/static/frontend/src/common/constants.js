import { xcss } from "@forge/react";
const createOptions = (prefix, items) =>
  items.map(item => ({
    value: `${prefix}_${item}`,
    label: `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} ${item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}`
  }));

const JiraEvents = createOptions('Issue', ['created', 'updated', 'deleted'])
  .concat(createOptions('Task', ['created', 'updated', 'deleted']))
  .concat(createOptions('Story', ['created', 'updated', 'deleted']))
  .concat(createOptions('Epic', ['created', 'updated', 'deleted']));

const DataTypes = [
  { value: "contact", label: "Contacts", sparrowOptions: [] },
  { value: "question", label: "Questions", sparrowOptions: [] },
  { value: "variable", label: "Variables", sparrowOptions: [] },
  { value: "expression", label: "Expression", sparrowOptions: [] },
];

const JiraFields = [
  { value: "summary", label: "Summary", isRequired: true },
  { value: "description", label: "Description", isRequired: true },
  { value: "priority", label: "Priority" },
  { value: "labels", label: "Labels" },
  { value: "environment", label: "Environment" },
  { value: "duedate", label: "Due Date" },
];

const issueStatusPerTypeData = [
  { type: "Bugs", label: "Bugs", value: 20 },
  { type: "Tasks", label: "Tasks", value: 25 },
  { type: "Stories", label: "Stories", value: 15 },
  { type: "Epics", label: "Epics", value: 10 },
];

const pages = [
  { page: "landing", id: 1 },
  { page: "Dashboard", id: 2 },
  { page: "Mapping", id: 3 },
  { page: "Trigger", id: 4 },
];

const ticketTypes = ['Bug', 'Task', 'Epic', 'Story'].map(type => ({
  value: type,
  label: type
}));

const shareTypes = ['EMAIL', 'SMS', 'LINK'].map(type => ({
  value: type,
  label: type.charAt(0) + type.slice(1).toLowerCase()
}));
const readViewContainerStyles = xcss({
  width: "300px",
  paddingInline: "space.075",
  paddingBlock: "space.150",
  borderRadius: "5px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "color.border",
  marginBlockEnd: "space.075",
});
const defaultMappingObject = {
  jiraProject: null,
  survey: null,
  ticketType: null,
  fields: [],
};

const defaultTriggerObject = {
  jiraProject: null,
  survey: null,
  events: [],
  shareType: null,
  shareChannel: null,
};
const defaultSelectedConfig = {
  type: null,
  sparrowField: null,
  jiraField: null,
  defaultValue: null,
};
const dashboardData = [
  {
    id: 1,
    title: "Tickets Created",
    value: [20, 40],
  },
  {
    id: 2,
    title: "Events Triggered",
    value: [34, 52],
  },
  {
    id: 3,
    title: "Average Fallback in Ticket creation",
    value: [39, 37],
  }
]
const dashboardDescription = "This comprehensive dashboard provides a detailed overview of the performance and efficiency of our IT Service Management (ITSM) team. Here, you will find a collection of insightful charts and metrics that highlight key aspects of our issue resolution process."
export { JiraEvents, DataTypes, JiraFields, issueStatusPerTypeData, pages, ticketTypes, shareTypes, readViewContainerStyles, defaultMappingObject, defaultTriggerObject, defaultSelectedConfig, dashboardData, dashboardDescription };