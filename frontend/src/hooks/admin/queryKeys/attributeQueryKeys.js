export const attributeQueryKeys = {
  all: ["admin", "attributes"],
  lists: () => [...attributeQueryKeys.all, "list"],
  list: (params) => [...attributeQueryKeys.lists(), params],
  details: () => [...attributeQueryKeys.all, "detail"],
  detail: (attributeId) => [...attributeQueryKeys.details(), attributeId],
  stats: () => [...attributeQueryKeys.all, "stats"],
  typeSummary: () => [...attributeQueryKeys.all, "type-summary"],
};
