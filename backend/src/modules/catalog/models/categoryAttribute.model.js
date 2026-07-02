import mongoose from "mongoose";

const categoryAttributeSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },

    attribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductAttribute",
      required: [true, "Product attribute is required"],
      index: true,
    },

    isRequired: {
      type: Boolean,
      default: false,
    },

    isVariant: {
      type: Boolean,
      default: true,
    },

    isFilterable: {
      type: Boolean,
      default: true,
    },

    isSearchable: {
      type: Boolean,
      default: false,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

categoryAttributeSchema.index(
  { category: 1, attribute: 1 },
  { unique: true }
);

categoryAttributeSchema.index({
  category: 1,
  isActive: 1,
  sortOrder: 1,
});

const CategoryAttributeModel = mongoose.model(
  "CategoryAttribute",
  categoryAttributeSchema
);

export default CategoryAttributeModel;