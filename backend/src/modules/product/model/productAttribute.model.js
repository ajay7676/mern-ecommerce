import mongoose from "mongoose";

const productAttributeValueSchema = new mongoose.Schema(
  {
    textValue: {
      type: String,
      trim: true,
    },

    numberValue: {
      type: Number,
    },

    booleanValue: {
      type: Boolean,
    },

    selectedValues: [
      {
        label: {
          type: String,
          trim: true,
        },

        value: {
          type: String,
          trim: true,
          lowercase: true,
        },

        colorCode: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    _id: false,
  },
);

const productAttributeSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
      index: true,
    },
    categoryAttribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryAttribute",
      required: [true, "Category attribute is required"],
      index: true,
    },
    value: {
      type: productAttributeValueSchema,
      required: [true, "Attribute value is required"],
    },
    displayValue: {
      type: String,
      trim: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },

    isFilterable: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy is required"],
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

productAttributeSchema.index(
  { product: 1, categoryAttribute: 1 },
  { unique: true }
);

productAttributeSchema.index({
  categoryAttribute: 1,
  isFilterable: 1,
});

const ProductAttribute = mongoose.model(
  "ProductAttribute",
  productAttributeSchema
);

export default ProductAttribute;
