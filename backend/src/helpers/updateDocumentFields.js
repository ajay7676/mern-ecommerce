export const updateDocumentFields = (
  document,
  payload,
  allowedFields
) => {
  for (const field of allowedFields) {
    if (Object.hasOwn(payload, field)) {
      document[field] = payload[field];
    }
  }

  return document;
};