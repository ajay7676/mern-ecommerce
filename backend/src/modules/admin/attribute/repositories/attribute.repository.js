import { Attribute } from "../models/attribute.model.js";

const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const findAttributeBySlug = async (slug) => {
  return Attribute.findOne({ slug });
};

export const findAttributeByName = async (name) => {
  return Attribute.findOne({
    name: {
      $regex: `^${name}$`,
      $options: "i",
    },
  });
};

export const createAttribute = async (payload) => {
  return Attribute.create(payload);
};

export const findAttributesWithFilters = async ({
  search,
  type,
  status,
  page,
  limit,
  sortBy,
  sortOrder,
}) => {
  const filter = {};

  if (search) {
    const safeSearch = escapeRegex(search);

    filter.$or = [
      {
        name: {
          $regex: safeSearch,
          $options: "i",
        },
      },
      {
        slug: {
          $regex: safeSearch,
          $options: "i",
        },
      },
    ];
  }

  if (type && type !== "all") {
    filter.type = type;
  }

  if (status && status !== "all") {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const [attributes, total] = await Promise.all([
    Attribute.find(filter)
      .select(
        "_id name slug type values status sortOrder productCount isRequired showInFilter showOnProductPage createdAt updatedAt",
      )
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Attribute.countDocuments(filter),
  ]);

  return {
    attributes,
    total,
  };
};
