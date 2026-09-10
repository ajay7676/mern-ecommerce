import { Attribute } from "../models/attribute.model.js";

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