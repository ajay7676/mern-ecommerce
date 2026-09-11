import HandleError from "../../../../utils/handleError.js";
import {
  createAttribute,
  findAttributeByName,
  findAttributeBySlug,
  findAttributesWithFilters,
  deleteAttributeById,
  deleteAttributesByIds,
  findAttributeById,
  findAttributeByNameExceptId,
  findAttributeBySlugExceptId,
  findAttributeDetailById,
  findAttributesByIds,
  getAttributeStats,
  getAttributeTypeSummary,
} from "../repositories/attribute.repository.js";

import {
  mapAttributeDetail,
  mapAttributeForTable,
} from "../mappers/attribute.mapper.js";

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

export const getAttributesService = async (query) => {
  const { page, limit, search, type, status, sortBy, sortOrder } = query;

  const { attributes, total } = await findAttributesWithFilters({
    page,
    limit,
    search,
    type,
    status,
    sortBy,
    sortOrder,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    items: attributes.map(mapAttributeForTable),

    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },

    filters: {
      search,
      type,
      status,
      sortBy,
      sortOrder,
    },
  };
};

export const getSingleAttributeService = async (attributeId) => {
  const attribute = await findAttributeDetailById(attributeId);

  if (!attribute) {
    throw new HandleError("Attribute not found", 404);
  }

  return mapAttributeDetail(attribute);
};

export const updateAttributeService = async ({
  attributeId,
  payload,
  adminId,
}) => {
  const attribute = await findAttributeById(attributeId);

  if (!attribute) {
    throw new HandleError("Attribute not found", 404);
  }

  if (payload.slug) {
    const existingSlug = await findAttributeBySlugExceptId(
      payload.slug,
      attributeId,
    );

    if (existingSlug) {
      throw new HandleError("Attribute slug already exists", 409, {
        slug: "This slug is already used",
      });
    }
  }

  if (payload.name) {
    const existingName = await findAttributeByNameExceptId(
      payload.name,
      attributeId,
    );

    if (existingName) {
      throw new HandleError("Attribute name already exists", 409, {
        name: "This attribute name is already used",
      });
    }
  }

  if (
    payload.type &&
    payload.type !== attribute.type &&
    attribute.productCount > 0
  ) {
    throw new HandleError(
      "Cannot change attribute type because products are already using this attribute",
      400,
      {
        type: "Deactivate this attribute or create a new attribute instead",
      },
    );
  }

  const nextType = payload.type || attribute.type;

  const cleanedPayload = cleanAttributeByType({
    ...payload,
    type: nextType,
  });

  const allowedFields = [
    "name",
    "slug",
    "type",
    "values",
    "placeholder",
    "defaultValue",
    "minValue",
    "maxValue",
    "step",
    "unit",
    "maxLength",
    "trueLabel",
    "falseLabel",
    "isRequired",
    "showInFilter",
    "showOnProductPage",
    "status",
    "sortOrder",
  ];

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(cleanedPayload, field)) {
      attribute[field] = cleanedPayload[field];
    }
  }

  attribute.updatedBy = adminId;

  await attribute.save();

  return mapAttributeDetail(attribute.toObject());
};


export const updateAttributeStatusService = async ({
  attributeId,
  status,
  adminId,
}) => {
  const attribute = await findAttributeById(attributeId);

  if (!attribute) {
    throw new HandleError("Attribute not found", 404);
  }

  if (attribute.status === status) {
    return mapAttributeDetail(attribute.toObject());
  }

  attribute.status = status;
  attribute.updatedBy = adminId;

  await attribute.save();

  return mapAttributeDetail(attribute.toObject());
};

export const deleteAttributeService = async (attributeId) => {
  const attribute = await findAttributeById(attributeId);

  if (!attribute) {
    throw new HandleError("Attribute not found", 404);
  }

  if (attribute.productCount > 0) {
    throw new HandleError(
      "This attribute is used by products. Please deactivate it instead of deleting.",
      400,
      {
        productCount: `This attribute is used by ${attribute.productCount} products`,
      }
    );
  }

  await deleteAttributeById(attributeId);

  return {
    deletedId: attributeId,
  };
};

export const bulkDeleteAttributesService = async (attributeIds) => {
  const uniqueIds = [...new Set(attributeIds)];

  const attributes = await findAttributesByIds(uniqueIds);

  const foundIds = attributes.map((item) => String(item._id));

  const missingIds = uniqueIds.filter((id) => !foundIds.includes(String(id)));

  const usedAttributes = attributes.filter((item) => item.productCount > 0);

  if (usedAttributes.length > 0) {
    throw new HandleError(
      "Some attributes are used by products. Deactivate them instead of deleting.",
      400,
      {
        usedAttributes: usedAttributes.map((item) => ({
          id: item._id,
          name: item.name,
          productCount: item.productCount,
        })),
      }
    );
  }

  const result = await deleteAttributesByIds(foundIds);

  return {
    requestedCount: uniqueIds.length,
    deletedCount: result.deletedCount,
    deletedIds: foundIds,
    missingIds,
  };
};

export const getAttributeStatsService = async () => {
  const [stats] = await getAttributeStats();

  const totalAttributes = stats?.totalAttributes || 0;
  const activeAttributes = stats?.activeAttributes || 0;
  const inactiveAttributes = stats?.inactiveAttributes || 0;
  const productsUsing = stats?.productsUsing || 0;

  return {
    totalAttributes,
    activeAttributes,
    inactiveAttributes,
    productsUsing,

    activePercentage:
      totalAttributes > 0
        ? Number(((activeAttributes / totalAttributes) * 100).toFixed(1))
        : 0,

    inactivePercentage:
      totalAttributes > 0
        ? Number(((inactiveAttributes / totalAttributes) * 100).toFixed(1))
        : 0,
  };
};

export const getAttributeTypeSummaryService = async () => {
  const summary = await getAttributeTypeSummary();

  const defaultTypes = [
    "dropdown",
    "switch",
    "text",
    "number",
    "boolean",
  ];

  return defaultTypes.map((type) => {
    const found = summary.find((item) => item.type === type);

    return {
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      count: found?.count || 0,
    };
  });
};
