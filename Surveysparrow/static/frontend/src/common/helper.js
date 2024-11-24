const generateUniqueId = () => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const constructPayload = (
  jiraProject,
  issueType,
  summary,
  description,
  priority = null,
  labels = null,
  duedate = null,
  environment = null
) => {
  const payload = {
    fields: {
      project: { key: jiraProject },
      issuetype: { name: issueType },
      summary: summary,
      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: description,
              },
            ],
          },
        ],
      },
      ...(priority && { priority: { name: priority } }),
      ...(labels && { labels: labels }),
      ...(duedate && { duedate: duedate }),
      ...(environment && { environment: environment }),
    },
  };
  const payloads = jiraProject.map((project) => {
    payload.fields.project.key = project.value;
    return payload;
  });
  return payloads;
};
const checkObjectEmpty = (obj) => {
  return Object.keys(obj)?.length === 0;
};

export { generateUniqueId, constructPayload, checkObjectEmpty };