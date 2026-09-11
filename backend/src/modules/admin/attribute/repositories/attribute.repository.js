import { Attribute } from "../models/attribute.model.js";

const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

export const findAttributeById = async (attributeId) => {
  return Attribute.findById(attributeId);
};

export const findAttributeDetailById = async (attributeId) => {
  return Attribute.findById(attributeId).lean();
};

export const findAttributeBySlug = async (slug) => {
  return Attribute.findOne({ slug });
};

export const findAttributeBySlugExceptId = async (slug, attributeId) => {
  return Attribute.findOne({
    slug,
    _id: {
      $ne: attributeId,
    },
  });
};

export const findAttributeByName = async (name) => {
  return Attribute.findOne({
    name: {
      $regex: `^${escapeRegex(name)}$`,
      $options: "i",
    },
  });
};

export const findAttributeByNameExceptId = async (name, attributeId) => {
  return Attribute.findOne({
    _id: {
      $ne: attributeId,
    },
    name: {
      $regex: `^${escapeRegex(name)}$`,
      $options: "i",
    },
  });
};
export const deleteAttributeById = async (attributeId) => {
  return Attribute.findByIdAndDelete(attributeId);
};

export const findAttributesByIds = async (attributeIds) => {
  return Attribute.find({
    _id: {
      $in: attributeIds,
    },
  });
};

export const deleteAttributesByIds = async (attributeIds) => {
  return Attribute.deleteMany({
    _id: {
      $in: attributeIds,
    },
  });
};

export const getAttributeStats = async () => {
  return Attribute.aggregate([
    {
      $group: {
        _id: null,
        totalAttributes: {
          $sum: 1,
        },
        activeAttributes: {
          $sum: {
            $cond: [{ $eq: ["$status", "active"] }, 1, 0],
          },
        },
        inactiveAttributes: {
          $sum: {
            $cond: [{ $eq: ["$status", "inactive"] }, 1, 0],
          },
        },
        productsUsing: {
          $sum: "$productCount",
        },
      },
    },
  ]);
};

export const getAttributeTypeSummary = async () => {
  return Attribute.aggregate([
    {
      $group: {
        _id: "$type",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        type: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        type: 1,
      },
    },
  ]);
};
