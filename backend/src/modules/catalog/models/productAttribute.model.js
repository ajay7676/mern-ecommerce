import mongoose from "mongoose";

const attributeOptionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, "Option label is required"],
      trim: true,
    },

    value: {
      type: String,
      required: [true, "Option value is required"],
      trim: true,
      lowercase: true,
    },

    colorCode: {
      type: String,
      trim: true,
      match: [/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color code"],
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const productAttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Attribute name is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    displayName: {
      type: String,
      required: [true, "Display name is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      enum: ["text", "number", "select", "multiSelect", "color", "boolean"],
      required: true,
      default: "select",
    },

    options: [attributeOptionSchema],

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

productAttributeSchema.pre("validate", function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  if (this.options?.length > 0) {
    const values = this.options.map((option) =>
      option.value.trim().toLowerCase()
    );

    const uniqueValues = new Set(values);

    if (values.length !== uniqueValues.size) {
      this.invalidate("options", "Option values must be unique");
    }
  }
});

productAttributeSchema.index({ isActive: 1 });
productAttributeSchema.index({ type: 1 });
productAttributeSchema.index({ isVariant: 1, isFilterable: 1 });

const ProductAttributeModel = mongoose.model(
  "ProductAttribute",
  productAttributeSchema
);

export default ProductAttributeModel;