import HandleError from "../../../../utils/handleError.js";

import {
  createAttribute,
  findAttributeByName,
  findAttributeBySlug,
} from "../repositories/attribute.repository.js";

const normalizeAttributeValues = (values = []) => {
  return values.map((item, index) => ({
    label: item.label.trim(),
    value: item.value.trim().toLowerCase().replace(/\s+/g, "-"),
    colorCode: item.colorCode || null,
    sortOrder: item.sortOrder ?? index + 1,
  }));
};

const cleanAttributeByType = (payload) => {
  const cleaned = {
    ...payload,
  };

  if (["dropdown", "switch"].includes(cleaned.type)) {
    cleaned.values = normalizeAttributeValues(cleaned.values);
    cleaned.unit = null;
    cleaned.placeholder = null;
    cleaned.minValue = null;
    cleaned.maxValue = null;
    cleaned.minLength = null;
    cleaned.maxLength = null;
  }

  if (cleaned.type === "text") {
    cleaned.values = [];
    cleaned.unit = null;
    cleaned.minValue = null;
    cleaned.maxValue = null;
  }

  if (cleaned.type === "number") {
    cleaned.values = [];
    cleaned.placeholder = null;
    cleaned.minLength = null;
    cleaned.maxLength = null;
  }

  if (cleaned.type === "boolean") {
    cleaned.values = [];
    cleaned.unit = null;
    cleaned.placeholder = null;
    cleaned.minValue = null;
    cleaned.maxValue = null;
    cleaned.minLength = null;
    cleaned.maxLength = null;
  }

  return cleaned;
};

export const createAttributeService = async ({ payload, adminId }) => {
  const existingSlug = await findAttributeBySlug(payload.slug);

  if (existingSlug) {
    throw new HandleError("Attribute slug already exists", 409, {
      slug: "This slug is already used",
    });
  }

  const existingName = await findAttributeByName(payload.name);

  if (existingName) {
    throw new HandleError("Attribute name already exists", 409, {
      name: "This attribute name is already used",
    });
  }

  const cleanedPayload = cleanAttributeByType(payload);

  const attribute = await createAttribute({
    ...cleanedPayload,
    createdBy: adminId,
  });

  return attribute;
};