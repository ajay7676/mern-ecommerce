import { generateSlug } from "../../../generateSlug";

const toNumberOrNull = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  return Number(value);
};

export const buildAttributePayload = (values) => {
  const payload = {
    name: values.name.trim(),
    slug: values.slug.trim().toLowerCase(),
    type: values.type,
    isRequired: Boolean(values.isRequired),
    showInFilter: Boolean(values.showInFilter),
    showOnProductPage: Boolean(values.showOnProductPage),
    status: values.status || "active",
    sortOrder: Number(values.sortOrder || 0),
  };

  if (["dropdown", "switch"].includes(values.type)) {
    payload.values = values.values.map((item, index) => {
      const label = item.label.trim();

      return {
        label,
        value: item.value?.trim() || generateSlug(label),
        colorCode:
          values.type === "switch"
            ? item.colorCode || "#000000"
            : null,
        sortOrder: index + 1,
      };
    });
  }

  if (values.type === "text") {
    payload.values = [];
    payload.placeholder = values.placeholder || null;
    payload.defaultValue = values.defaultValue || null;
    payload.maxLength = toNumberOrNull(values.maxLength);
  }

  if (values.type === "number") {
    payload.values = [];
    payload.minValue = toNumberOrNull(values.minValue);
    payload.maxValue = toNumberOrNull(values.maxValue);
    payload.step = toNumberOrNull(values.step);
    payload.unit = values.unit || null;
    payload.defaultValue = toNumberOrNull(values.defaultValue);
  }

  if (values.type === "boolean") {
    payload.values = [];
    payload.trueLabel = values.trueLabel || "Yes";
    payload.falseLabel = values.falseLabel || "No";
    payload.defaultValue = values.defaultValue === "true";
  }

  return payload;
};