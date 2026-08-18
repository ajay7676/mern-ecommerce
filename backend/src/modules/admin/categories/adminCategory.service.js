import HandleError from "../../../utils/handleError.js";

import {
  createCategory,
  countCategories,
  findCategories,
  findCategoryById,
  findCategoryByNameAndParent,
  findCategoryByNameAndParentExceptId,
  findCategoryBySlug,
  findCategoryBySlugExceptId,
  findCategoryDetailById,
  countChildCategories,
  countProductsByCategory,
  deleteCategoryById,
} from "./adminCategory.repository.js";

import {
  validateCategoryId,
  validateCreateCategoryPayload,
  validateUpdateCategoryPayload,
  normalizeCategoryQuery,
  validateAdminId,
} from "./adminCategory.validators.js";

import { escapeRegex } from "./adminCategory.helpers.js";

const assertParentDoesNotCreateCycle = async ({
  categoryId,
  parentCategoryId,
}) => {
  if (!parentCategoryId) {
    return;
  }

  if (categoryId.toString() === parentCategoryId.toString()) {
    throw new HandleError("A category cannot be its own parent", 400, {
      parentCategory: "Category cannot be its own parent",
    });
  }

  let currentParentId = parentCategoryId;

  const visited = new Set();

  while (currentParentId) {
    const normalizedId = currentParentId.toString();

    if (visited.has(normalizedId)) {
      throw new HandleError("Category hierarchy contains a cycle", 400);
    }

    visited.add(normalizedId);

    if (normalizedId === categoryId.toString()) {
      throw new HandleError(
        "Cannot move category under one of its own descendants",
        400,
        {
          parentCategory:
            "Selected parent is inside this category's own hierarchy",
        },
      );
    }

    const parent = await findCategoryById(currentParentId)
      .select("_id parentCategory")
      .lean();

    if (!parent) {
      throw new HandleError("Parent category not found", 404, {
        parentCategory: "Selected parent category does not exist",
      });
    }

    currentParentId = parent.parentCategory;
  }
};

export const getAdminCategoriesService = async (query) => {
  const { page, limit, search, status, parentCategory, sortBy, sortOrder } =
    normalizeCategoryQuery(query);

  const filter = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), "i");

    filter.$or = [
      {
        name: regex,
      },
      {
        slug: regex,
      },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (parentCategory) {
    filter.parentCategory = parentCategory;
  }

  const skip = (page - 1) * limit;

  const sort = {
    [sortBy]: sortOrder === "desc" ? -1 : 1,

    _id: 1,
  };

  const [categories, totalCategories] = await Promise.all([
    findCategories({
      filter,
      skip,
      limit,
      sort,
    }),

    countCategories(filter),
  ]);

  const totalPages = Math.ceil(totalCategories / limit);

  return {
    categories,

    pagination: {
      currentPage: page,

      limit,

      totalCategories,

      totalPages,

      hasNextPage: page < totalPages,

      hasPreviousPage: page > 1,
    },
  };
};

export const getAdminCategoryService = async (categoryId) => {
  validateCategoryId(categoryId);

  const category = await findCategoryDetailById(categoryId);

  if (!category) {
    throw new HandleError("Category not found", 404);
  }

  return category;
};

export const createAdminCategoryService = async (payload, adminId) => {
  validateAdminId(adminId);

  /*
   * Validation should only return allowed category fields.
   * Do not accept createdBy or updatedBy from the frontend.
   */
  const normalized = validateCreateCategoryPayload(payload);

  const parentCategory = normalized.parentCategory || null;

  const [parent, existingSlug, existingName] = await Promise.all([
    parentCategory ? findCategoryById(parentCategory) : Promise.resolve(null),

    findCategoryBySlug(normalized.slug),

    findCategoryByNameAndParent(normalized.name, parentCategory),
  ]);

  if (parentCategory && !parent) {
    throw new HandleError("Parent category not found", 404, {
      parentCategory: "Selected parent category does not exist",
    });
  }

  if (existingSlug) {
    throw new HandleError("Category slug already exists", 409, {
      slug: "This slug is already in use",
    });
  }

  if (existingName) {
    throw new HandleError("Category already exists", 409, {
      name: "A category with this name already exists under the selected parent",
    });
  }

  try {
    return await createCategory({
      ...normalized,
      parentCategory,

      // Audit fields are controlled by backend
      createdBy: adminId,
      updatedBy: adminId,
    });
  } catch (error) {
    handleDuplicateCategoryError(error);
  }
};

export const updateAdminCategoryService = async ({ categoryId, payload }) => {
  validateCategoryId(categoryId);

  const update = validateUpdateCategoryPayload(payload);

  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new HandleError("Category not found", 404);
  }

  const nextParentCategory = Object.prototype.hasOwnProperty.call(
    update,
    "parentCategory",
  )
    ? update.parentCategory
    : category.parentCategory;

  if (nextParentCategory) {
    await assertParentDoesNotCreateCycle({
      categoryId,
      parentCategoryId: nextParentCategory,
    });
  }

  if (update.slug && update.slug !== category.slug) {
    const duplicateSlug = await findCategoryBySlugExceptId(
      update.slug,
      categoryId,
    );

    if (duplicateSlug) {
      throw new HandleError("Category slug already exists", 409, {
        slug: "This slug is already in use",
      });
    }
  }

  const nextName = update.name ?? category.name;

  const existingName = await findCategoryByNameAndParentExceptId(
    nextName,
    nextParentCategory,
    categoryId,
  );

  if (existingName) {
    throw new HandleError("Category already exists", 409, {
      name: "A category with this name already exists under the selected parent",
    });
  }

  Object.entries(update).forEach(([field, value]) => {
    category[field] = value;
  });

  try {
    await category.save();
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      throw new HandleError("Category slug already exists", 409, {
        slug: "This slug is already in use",
      });
    }

    throw error;
  }

  return category;
};

export const deleteAdminCategoryService = async (categoryId) => {
  validateCategoryId(categoryId);

  const category = await findCategoryById(categoryId);


  if (!category) {
    throw new HandleError("Category not found", 404);
  }

  const [childCount, productCount] = await Promise.all([
    countChildCategories(categoryId),
    countProductsByCategory(categoryId),
  ]);

  if (childCount > 0) {
    const childLabel =
      childCount === 1
        ? "subcategory"
        : "subcategories";
    throw new HandleError(
      "Category cannot be deleted because it contains subcategories",
      409,
      {
        category:
          `Move or delete ${childCount} ${childLabel} first`,
      },
    );
  }

 if (productCount > 0) {
    const productLabel =
      productCount === 1
        ? "product is"
        : "products are";

    throw new HandleError(
      "Category cannot be deleted because products are assigned to it",
      409,
      {
        category:
          `${productCount} ${productLabel} currently assigned to this category`,
      },
    );
  }

  await deleteCategoryById(categoryId);

   return {
    categoryId,
    name: category.name,
  };

};
