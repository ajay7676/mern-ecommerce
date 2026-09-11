export const mapAttributeForTable = (attribute) => {
  return {
    id: attribute._id,

    name: attribute.name,
    slug: attribute.slug,
    type: attribute.type,

    values: attribute.values || [],

    placeholder: attribute.placeholder ?? null,
    defaultValue: attribute.defaultValue ?? null,

    minValue: attribute.minValue ?? null,
    maxValue: attribute.maxValue ?? null,
    step: attribute.step ?? null,
    unit: attribute.unit ?? null,
    maxLength: attribute.maxLength ?? null,

    trueLabel: attribute.trueLabel ?? null,
    falseLabel: attribute.falseLabel ?? null,

    isRequired: attribute.isRequired,
    showInFilter: attribute.showInFilter,
    showOnProductPage: attribute.showOnProductPage,

    status: attribute.status,
    sortOrder: attribute.sortOrder ?? 0,
    productCount: attribute.productCount ?? 0,

    createdAt: attribute.createdAt,
    updatedAt: attribute.updatedAt,
  };
};

export const mapAttributeDetail = (attribute) => {
  return {
    id: attribute._id,

    name: attribute.name,
    slug: attribute.slug,
    type: attribute.type,

    values: attribute.values || [],

    placeholder: attribute.placeholder ?? null,
    defaultValue: attribute.defaultValue ?? null,

    minValue: attribute.minValue ?? null,
    maxValue: attribute.maxValue ?? null,
    step: attribute.step ?? null,
    unit: attribute.unit ?? null,
    maxLength: attribute.maxLength ?? null,

    trueLabel: attribute.trueLabel ?? null,
    falseLabel: attribute.falseLabel ?? null,

    isRequired: attribute.isRequired,
    showInFilter: attribute.showInFilter,
    showOnProductPage: attribute.showOnProductPage,

    status: attribute.status,
    sortOrder: attribute.sortOrder ?? 0,
    productCount: attribute.productCount ?? 0,

    createdBy: attribute.createdBy ?? null,
    updatedBy: attribute.updatedBy ?? null,

    createdAt: attribute.createdAt,
    updatedAt: attribute.updatedAt,
  };
};