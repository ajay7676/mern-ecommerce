export const mapAttributeForTable = (attribute) => {
  return {
    id: attribute._id,

    name: attribute.name,
    slug: attribute.slug,
    type: attribute.type,

    values: attribute.values || [],

    status: attribute.status,

    sortOrder: attribute.sortOrder || 0,

    productCount: attribute.productCount || 0,

    isRequired: attribute.isRequired,
    showInFilter: attribute.showInFilter,
    showOnProductPage: attribute.showOnProductPage,

    createdAt: attribute.createdAt,
    updatedAt: attribute.updatedAt,
  };
};