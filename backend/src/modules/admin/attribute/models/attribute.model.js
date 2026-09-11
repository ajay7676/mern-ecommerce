import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      required: true,
    },

    value: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },

    colorCode: {
      type: String,
      trim: true,
      default: null,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: ["dropdown", "switch", "text", "number", "boolean"],
      required: true,
      index: true,
    },

    values: {
      type: [attributeValueSchema],
      default: [],
    },

    unit: {
      type: String,
      trim: true,
      default: null,
    },

    placeholder: {
      type: String,
      trim: true,
      default: null,
    },

    defaultValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    minValue: {
      type: Number,
      default: null,
    },

    maxValue: {
      type: Number,
      default: null,
    },

    minLength: {
      type: Number,
      default: null,
    },

    maxLength: {
      type: Number,
      default: null,
    },

    isRequired: {
      type: Boolean,
      default: false,
    },

    showInFilter: {
      type: Boolean,
      default: true,
    },

    showOnProductPage: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    productCount: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

attributeSchema.index({ name: 1 });
attributeSchema.index({ slug: 1 }, { unique: true });
attributeSchema.index({ type: 1, status: 1 });

export const Attribute = mongoose.model("Attribute", attributeSchema);