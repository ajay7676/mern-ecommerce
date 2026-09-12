export const getAttributeFormValues = (attribute) => {
  return {
    name: attribute?.name ?? "",
    slug: attribute?.slug ?? "",
    type: attribute?.type ?? "dropdown",

    values:
      attribute?.values?.length > 0
        ? attribute.values.map((item) => ({
            label: item.label ?? "",
            value: item.value ?? "",
            colorCode: item.colorCode ?? "#000000",
          }))
        : [],

    placeholder: attribute?.placeholder ?? "",
    defaultValue:
      attribute?.defaultValue !== null &&
      attribute?.defaultValue !== undefined
        ? String(attribute.defaultValue)
        : "",

    minValue:
      attribute?.minValue !== null &&
      attribute?.minValue !== undefined
        ? String(attribute.minValue)
        : "",

    maxValue:
      attribute?.maxValue !== null &&
      attribute?.maxValue !== undefined
        ? String(attribute.maxValue)
        : "",

    step:
      attribute?.step !== null &&
      attribute?.step !== undefined
        ? String(attribute.step)
        : "",

    unit: attribute?.unit ?? "",

    maxLength:
      attribute?.maxLength !== null &&
      attribute?.maxLength !== undefined
        ? String(attribute.maxLength)
        : "",

    trueLabel: attribute?.trueLabel ?? "Yes",
    falseLabel: attribute?.falseLabel ?? "No",

    isRequired: Boolean(attribute?.isRequired),
    showInFilter: Boolean(attribute?.showInFilter),
    showOnProductPage: Boolean(attribute?.showOnProductPage),

    status: attribute?.status ?? "active",
    sortOrder: attribute?.sortOrder ?? 0,
  };
};