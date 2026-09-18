export const adminProductMetaQueryKeys = {
  all: ["admin", "products", "meta"],

  categories: () => [...adminProductMetaQueryKeys.all, "categories"],
  brands: () => [...adminProductMetaQueryKeys.all, "brands"],
  attributes: () => [...adminProductMetaQueryKeys.all, "attributes"],
};