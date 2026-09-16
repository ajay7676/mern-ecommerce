export const adminProductQueryKeys = {
  all: ["admin", "products"],
  lists: () => [...adminProductQueryKeys.all, "list"],
  list: (params) => [...adminProductQueryKeys.lists(), params],
  details: () => [...adminProductQueryKeys.all, "detail"],
  detail: (productId) => [...adminProductQueryKeys.details(), productId],

  stats: () => [...adminProductQueryKeys.all, "stats"],
};
