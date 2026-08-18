export const categoryQueryKeys = {
  all: ["admin-categories"],

  lists: () => [
    ...categoryQueryKeys.all,
    "list",
  ],

  list: (filters) => [
    ...categoryQueryKeys.lists(),
    filters,
  ],

  details: () => [
    ...categoryQueryKeys.all,
    "detail",
  ],

  detail: (categoryId) => [
    ...categoryQueryKeys.details(),
    categoryId,
  ],

  tree: () => [
    ...categoryQueryKeys.all,
    "tree",
  ],

  stats: () => [
    ...categoryQueryKeys.all,
    "stats",
  ],
};