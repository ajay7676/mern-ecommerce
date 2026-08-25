export const brandQueryKeys = {
  all: ["admin-brands"],

  lists: () => [
    ...brandQueryKeys.all,
    "list",
  ],

  list: (filters) => [
    ...brandQueryKeys.lists(),
    filters,
  ],

  details: () => [
    ...brandQueryKeys.all,
    "detail",
  ],

  detail: (brandId) => [
    ...brandQueryKeys.details(),
    brandId,
  ],

  stats: () => [
    ...brandQueryKeys.all,
    "stats",
  ],

  overview: () => [
    ...brandQueryKeys.all,
    "overview",
  ],

  top: () => [
    ...brandQueryKeys.all,
    "top",
  ],

  options: () => [
    ...brandQueryKeys.all,
    "options",
  ],
};