import mongoose from "mongoose";

import {
  DISCOUNT_TYPE,
  PRODUCT_STATUS,
  PRODUCT_TYPE,
  PRODUCT_UNITS,
  PUBLISH_OPTION,
  TAX_CLASS,
} from "../constants/product.constants.js";

const productImageSchema = new mongoose.Schema(
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

    altText: {
      type: String,
      trim: true,
      default: "",
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

const productVisibilitySchema = new mongoose.Schema(
  {
    onlineStore: {
      type: Boolean,
      default: true,
    },

    mobileApp: {
      type: Boolean,
      default: true,
    },

    pos: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const productSeoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      trim: true,
      default: null,
    },

    metaDescription: {
      type: String,
      trim: true,
      default: null,
    },

    metaKeywords: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const productPricingSchema = new mongoose.Schema(
  {
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discountType: {
      type: String,
      enum: Object.values(DISCOUNT_TYPE),
      default: DISCOUNT_TYPE.NONE,
    },

    discountValue: {
      type: Number,
      default: null,
      min: 0,
    },

    finalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    taxClass: {
      type: String,
      enum: Object.values(TAX_CLASS),
      default: TAX_CLASS.GST_18,
    },

    costPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    mrp: {
      type: Number,
      default: null,
      min: 0,
    },

    specialPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    specialPriceFrom: {
      type: Date,
      default: null,
    },

    specialPriceTo: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);

const productInventorySchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    barcode: {
      type: String,
      trim: true,
      default: null,
    },

    trackInventory: {
      type: Boolean,
      default: true,
    },

    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 0,
      min: 0,
    },

    units: {
      type: String,
      enum: Object.values(PRODUCT_UNITS),
      default: PRODUCT_UNITS.PCS,
    },

    allowBackorders: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const productAttributeOptionSnapshotSchema = new mongoose.Schema(
  {
    optionId: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      trim: true,
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

const productAttributeSnapshotSchema = new mongoose.Schema(
  {
    attributeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      enum: ["existing", "custom"],
      default: "existing",
    },

    options: {
      type: [productAttributeOptionSnapshotSchema],
      default: [],
    },
  },
  { _id: false },
);

const customFieldSchema = new mongoose.Schema(
  {
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
  },
  { _id: false },
);

const userManualSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      default: null,
    },

    url: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      default: null,
    },

    size: {
      type: Number,
      default: null,
    },

    type: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    productType: {
      type: String,
      enum: Object.values(PRODUCT_TYPE),
      default: PRODUCT_TYPE.SIMPLE,
      index: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    seo: {
      type: productSeoSchema,
      default: {},
    },

    pricing: {
      type: productPricingSchema,
      required: true,
    },

    inventory: {
      type: productInventorySchema,
      required: true,
    },

    images: {
      type: [productImageSchema],
      default: [],
    },

    videoUrl: {
      type: String,
      trim: true,
      default: null,
    },

    imageZoom: {
      type: Boolean,
      default: true,
    },

    attributes: {
      type: [productAttributeSnapshotSchema],
      default: [],
    },

    productTypeDetail: {
      type: String,
      trim: true,
      default: null,
    },

    productCollection: {
      type: String,
      trim: true,
      default: null,
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    hsnCode: {
      type: String,
      trim: true,
      default: null,
    },

    countryOfOrigin: {
      type: String,
      trim: true,
      default: null,
    },

    warrantyInformation: {
      type: String,
      trim: true,
      default: null,
    },

    returnPolicy: {
      type: String,
      trim: true,
      default: null,
    },

    careInstructions: {
      type: String,
      trim: true,
      default: null,
    },

    safetyInformation: {
      type: String,
      trim: true,
      default: null,
    },

    userManual: {
      type: userManualSchema,
      default: null,
    },

    customFields: {
      type: [customFieldSchema],
      default: [],
    },

    visibility: {
      type: productVisibilitySchema,
      default: {},
    },

    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.DRAFT,
      index: true,
    },

    publishOption: {
      type: String,
      enum: Object.values(PUBLISH_OPTION),
      default: PUBLISH_OPTION.SAVE_AS_DRAFT,
    },

    scheduledAt: {
      type: Date,
      default: null,
    },

    publishedAt: {
      type: Date,
      default: null,
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
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ name: "text", shortDescription: "text" });
productSchema.index({ status: 1, createdAt: -1 });
productSchema.index({ category: 1, brand: 1 });
productSchema.index(
  { "inventory.sku": 1 },
  {
    unique: true,
    name: "inventory_sku_unique",
  },
);

export const Product = mongoose.model("Product", productSchema);
