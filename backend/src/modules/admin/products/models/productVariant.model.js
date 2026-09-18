import mongoose from "mongoose";

const variantImageSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      trim: true,
      default: null,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    isPrimary: {
      type: Boolean,
      default: false,
    },

    sortOrder: {
      type: Number,
      default: 1,
    },
  },
  { _id: false },
);

const variantAttributeSchema = new mongoose.Schema(
  {
    attributeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      default: null,
    },

    attributeName: {
      type: String,
      required: true,
      trim: true,
    },

    optionId: {
      type: String,
      default: null,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
    },

    colorCode: {
      type: String,
      default: null,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },

    source: {
      type: String,
      enum: ["auto", "manual"],
      default: "auto",
    },

    image: {
      publicId: {
        type: String,
        default: null,
      },

      url: {
        type: String,
        default: null,
      },
    },

    images: {
      type: [variantImageSchema],
      default: [],
    },

    attributes: {
      type: [variantAttributeSchema],
      default: [],
    },

    optionSignature: {
      type: String,
      required: true,
      trim: true,
    },

    sortOrder: {
      type: Number,
      default: 1,
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
  },
);

productVariantSchema.index(
  {
    product: 1,
    optionSignature: 1,
  },
  {
    unique: true,
  },
);

productVariantSchema.index({
  product: 1,
  status: 1,
});

export const ProductVariant = mongoose.model(
  "ProductVariant",
  productVariantSchema,
);
