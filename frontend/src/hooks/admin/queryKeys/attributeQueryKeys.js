export const attributeQueryKeys = {
  all: ["admin", "attributes"],
  lists: () => [...attributeQueryKeys.all, "list"],
  list: (params) => [...attributeQueryKeys.lists(), params],
  detail: (id) => [...attributeQueryKeys.all, "detail", id],
  stats: () => [...attributeQueryKeys.all, "stats"],
};
