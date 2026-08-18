import mongoose from "mongoose";
import HandleError from "../../../utils/handleError.js";
import {
  CATEGORY_SORT_FIELDS,
  CATEGORY_STATUSES,
  MAX_CATEGORY_LIMIT,
} from "./adminCategory.constants.js";

import { normalizeSlug } from "./adminCategory.helpers.js";

export const validateCategoryId = (categoryId) => {
  if (!categoryId || !mongoose.isValidObjectId(categoryId)) {
    throw new HandleError("Invalid category id", 400);
  }

  return categoryId;
};
export const validateAdminId = (adminId) => {
  if (!adminId || !mongoose.isValidObjectId(adminId)) {
    throw new HandleError("Authenticated admin ID is missing or invalid", 400);
  }

  return adminId;
};

export const validateCreateCategoryPayload = (payload = {}) => {
  const {
    name,
    slug,
    description,
    parentCategory,
    status,
    sortOrder,
    icon,
    seo,
  } = payload;

  if (typeof name !== "string" || !name.trim()) {
    throw new HandleError("Category name is required", 400, {
      name: "Category name is required",
    });
  }

  if (name.trim().length > 80) {
    throw new HandleError("Category name is too long", 400, {
      name: "Category name cannot exceed 80 characters",
    });
  }

  const normalizedSlug = normalizeSlug(slug || name);

  if (!normalizedSlug) {
    throw new HandleError("Category slug is required", 400, {
      slug: "Category slug is required",
    });
  }

  if (parentCategory && !mongoose.isValidObjectId(parentCategory)) {
    throw new HandleError("Invalid parent category", 400, {
      parentCategory: "Invalid parent category",
    });
  }

  const normalizedStatus = status?.toLowerCase() || "active";

  if (!CATEGORY_STATUSES.includes(normalizedStatus)) {
    throw new HandleError("Invalid category status", 400);
  }

  const normalizedSortOrder =
    sortOrder === undefined || sortOrder === "" ? 0 : Number(sortOrder);

  if (!Number.isInteger(normalizedSortOrder) || normalizedSortOrder < 0) {
    throw new HandleError("Sort order must be a non-negative integer", 400, {
      sortOrder: "Sort order must be 0 or greater",
    });
  }

  if (description && description.length > 500) {
    throw new HandleError("Description is too long", 400, {
      description: "Description cannot exceed 500 characters",
    });
  }

  if (seo?.title && seo.title.length > 60) {
    throw new HandleError("SEO title is too long", 400, {
      seoTitle: "SEO title cannot exceed 60 characters",
    });
  }

  if (seo?.description && seo.description.length > 160) {
    throw new HandleError("SEO description is too long", 400, {
      seoDescription: "SEO description cannot exceed 160 characters",
    });
  }

  return {
    name: name.trim(),

    slug: normalizedSlug,

    description: description?.trim() || "",

    parentCategory: parentCategory || null,

    status: normalizedStatus,

    sortOrder: normalizedSortOrder,

    icon: icon?.trim() || null,

    seo: {
      title: seo?.title?.trim() || "",

      description: seo?.description?.trim() || "",

      keywords: Array.isArray(seo?.keywords)
        ? [
            ...new Set(
              seo.keywords
                .map((keyword) => String(keyword).trim())
                .filter(Boolean),
            ),
          ]
        : [],
    },
  };
};

export const validateUpdateCategoryPayload = (payload = {}) => {
  const allowedFields = [
    "name",
    "slug",
    "description",
    "parentCategory",
    "status",
    "sortOrder",
    "icon",
    "seo",
  ];

  const receivedFields = Object.keys(payload);

  if (!receivedFields.length) {
    throw new HandleError("At least one field is required", 400);
  }

  const invalidFields = receivedFields.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length) {
    throw new HandleError(
      `Invalid update fields: ${invalidFields.join(", ")}`,
      400,
    );
  }

  const update = {};

  if (Object.prototype.hasOwnProperty.call(payload, "name")) {
    if (typeof payload.name !== "string" || !payload.name.trim()) {
      throw new HandleError("Category name cannot be empty", 400, {
        name: "Category name is required",
      });
    }

    update.name = payload.name.trim();
  }

  if (Object.prototype.hasOwnProperty.call(payload, "slug")) {
    const slug = normalizeSlug(payload.slug);

    if (!slug) {
      throw new HandleError("Invalid category slug", 400, {
        slug: "Slug cannot be empty",
      });
    }

    update.slug = slug;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "description")) {
    const description = payload.description ?? "";

    if (description.length > 500) {
      throw new HandleError("Description is too long", 400, {
        description: "Description cannot exceed 500 characters",
      });
    }

    update.description = description.trim();
  }

  if (Object.prototype.hasOwnProperty.call(payload, "parentCategory")) {
    if (
      payload.parentCategory &&
      !mongoose.isValidObjectId(payload.parentCategory)
    ) {
      throw new HandleError("Invalid parent category", 400, {
        parentCategory: "Invalid parent category",
      });
    }

    update.parentCategory = payload.parentCategory || null;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "status")) {
    const status = payload.status?.toLowerCase();

    if (!CATEGORY_STATUSES.includes(status)) {
      throw new HandleError("Invalid category status", 400);
    }

    update.status = status;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "sortOrder")) {
    const sortOrder = Number(payload.sortOrder);

    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      throw new HandleError("Invalid sort order", 400, {
        sortOrder: "Sort order must be 0 or greater",
      });
    }

    update.sortOrder = sortOrder;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "icon")) {
    update.icon = payload.icon?.trim() || null;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "seo")) {
    update.seo = {
      title: payload.seo?.title?.trim() || "",

      description: payload.seo?.description?.trim() || "",

      keywords: Array.isArray(payload.seo?.keywords)
        ? [
            ...new Set(
              payload.seo.keywords
                .map((keyword) => String(keyword).trim())
                .filter(Boolean),
            ),
          ]
        : [],
    };
  }

  return update;
};

export const normalizeCategoryQuery = (query = {}) => {
  const page = Math.max(Number(query.page) || 1, 1);

  const limit = Math.min(
    Math.max(Number(query.limit) || 10, 1),
    MAX_CATEGORY_LIMIT,
  );

  const status = query.status?.trim().toLowerCase() || "";

  if (status && !CATEGORY_STATUSES.includes(status)) {
    throw new HandleError("Invalid status filter", 400);
  }

  const parentCategory = query.parentCategory?.trim() || "";

  if (parentCategory && !mongoose.isValidObjectId(parentCategory)) {
    throw new HandleError("Invalid parent category filter", 400);
  }

  const sortBy = CATEGORY_SORT_FIELDS.includes(query.sortBy)
    ? query.sortBy
    : "sortOrder";

  const sortOrder = query.sortOrder === "desc" ? "desc" : "asc";

  return {
    page,
    limit,

    search: query.search?.trim() || "",

    status,

    parentCategory,

    sortBy,
    sortOrder,
  };
};

export const handleDuplicateCategoryError = (error) => {
  if (error?.code !== 11000) {
    throw error;
  }

  const duplicateFields = new Set([
    ...Object.keys(error.keyPattern || {}),
    ...Object.keys(error.keyValue || {}),
  ]);

  if (duplicateFields.has("slug")) {
    throw new HandleError(
      "Category slug already exists",
      409,
      {
        slug: "This slug is already in use",
      },
    );
  }

  if (
    duplicateFields.has("name") ||
    duplicateFields.has("normalizedName")
  ) {
    throw new HandleError(
      "Category already exists",
      409,
      {
        name: "A category with this name already exists under the selected parent",
      },
    );
  }

  throw new HandleError(
    "Category already exists",
    409,
  );
};
