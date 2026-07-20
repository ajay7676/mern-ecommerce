import mongoose  from "mongoose";

const VARIANT_STATUS = ["active", "inactive", "archived"];
const PRODUCT_CURRENCY = ["INR", "USD"];
const ATTRIBUTE_TYPES = [
  "text",
  "number",
  "boolean",
  "select",
  "multi_select",
  "color",
];


const variantImageSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      trim: true,
    },

    url: {
      type: String,
      required: [true, "Variant image URL is required"],
      trim: true,
    },

    alt: {
      type: String,
      trim: true,
      maxlength: [120, "Image alt text cannot exceed 120 characters"],
    },

    isPrimary: {
      type: Boolean,
      default: false,
    },

    position: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const variantAttributeSchema = new mongoose.Schema(
  {
    categoryAttribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryAttribute",
    },

    attributeName: {
      type: String,
      required: [true, "Attribute name is required"],
      trim: true,
    },

    attributeSlug: {
      type: String,
      required: [true, "Attribute slug is required"],
      lowercase: true,
      trim: true,
    },

    attributeType: {
      type: String,
      enum: ATTRIBUTE_TYPES,
      required: [true, "Attribute type is required"],
    },

    optionLabel: {
      type: String,
      required: [true, "Option label is required"],
      trim: true,
    },

    optionValue: {
      type: String,
      required: [true, "Option value is required"],
      lowercase: true,
      trim: true,
    },

    colorCode: {
      type: String,
      trim: true,
    },

    unit: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const variantDimensionSchema = new mongoose.Schema(
  {
    length: {
      type: Number,
      min: [0, "Length cannot be negative"],
    },

    width: {
      type: Number,
      min: [0, "Width cannot be negative"],
    },

    height: {
      type: Number,
      min: [0, "Height cannot be negative"],
    },

    unit: {
      type: String,
      enum: ["cm", "inch"],
      default: "cm",
    },
  },
  {
    _id: false,
  }
);
const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
      index: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: [180, "Variant title cannot exceed 180 characters"],
    },

    sku: {
      type: String,
      required: [true, "Variant SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    barcode: {
      type: String,
      trim: true,
      sparse: true,
    },

    attributes: {
      type: [variantAttributeSchema],
      validate: {
        validator: function (attributes) {
          return Array.isArray(attributes) && attributes.length > 0;
        },
        message: "At least one variant attribute is required",
      },
    },

    /**
     * Auto-generated unique key.
     * Example:
     * color:black|size:l
     */
    optionSignature: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    price: {
      type: Number,
      min: [0, "Variant price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      min: [0, "Variant discount price cannot be negative"],
      validate: {
        validator: function (value) {
          if (value === undefined || value === null) return true;

          if (this.price === undefined || this.price === null) {
            return false;
          }

          return value < this.price;
        },
        message:
          "Variant discount price must be less than variant price. If discountPrice is provided, price is also required.",
      },
    },

    costPrice: {
      type: Number,
      min: [0, "Variant cost price cannot be negative"],
      select: false,
    },

    currency: {
      type: String,
      enum: PRODUCT_CURRENCY,
      default: "INR",
    },

    stock: {
      type: Number,
      required: [true, "Variant stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    reservedStock: {
      type: Number,
      min: [0, "Reserved stock cannot be negative"],
      default: 0,
      select: false,
    },

    lowStockThreshold: {
      type: Number,
      min: [0, "Low stock threshold cannot be negative"],
      default: 5,
    },

    sold: {
      type: Number,
      min: [0, "Sold count cannot be negative"],
      default: 0,
    },

    trackInventory: {
      type: Boolean,
      default: true,
    },

    allowBackorder: {
      type: Boolean,
      default: false,
    },

    images: {
      type: [variantImageSchema],
      default: [],
    },

    weight: {
      value: {
        type: Number,
        min: [0, "Weight cannot be negative"],
      },
      unit: {
        type: String,
        enum: ["g", "kg"],
        default: "g",
      },
    },

    dimensions: variantDimensionSchema,

    isDefault: {
      type: Boolean,
      default: false,
      index: true,
    },

    status: {
      type: String,
      enum: VARIANT_STATUS,
      default: "active",
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
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

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


/**
 * Available stock = stock - reservedStock
 */
productVariantSchema.virtual("availableStock").get(function () {
  if (!this.trackInventory) return null;

  return Math.max(this.stock - this.reservedStock, 0);
});

/**
 * Variant is in stock or not
 */
productVariantSchema.virtual("isInStock").get(function () {
  if (!this.trackInventory) return true;

  return this.availableStock > 0 || this.allowBackorder;
});

/**
 * Variant low stock status
 */
productVariantSchema.virtual("isLowStock").get(function () {
  if (!this.trackInventory) return false;

  return this.availableStock > 0 && this.availableStock <= this.lowStockThreshold;
});

/**
 * Variant final price
 */
productVariantSchema.virtual("finalPrice").get(function () {
  return this.discountPrice || this.price;
});

/**
 * Variant discount percentage
 */
productVariantSchema.virtual("discountPercentage").get(function () {
  if (!this.discountPrice || !this.price) return 0;

  return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});

/**
 * One product cannot have duplicate same variation.
 * Example:
 * Product A cannot have color:black|size:l twice.
 */
productVariantSchema.index(
  { product: 1, optionSignature: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

/**
 * Only one default variant per product.
 */
productVariantSchema.index(
  { product: 1, isDefault: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDefault: true,
      isDeleted: false,
    },
  }
);

productVariantSchema.index({ product: 1, status: 1, isDeleted: 1 });
productVariantSchema.index({ "attributes.attributeSlug": 1 });
productVariantSchema.index({ "attributes.optionValue": 1 });
productVariantSchema.index({ stock: 1 });
productVariantSchema.index({ sold: -1 });
productVariantSchema.index({ createdAt: -1 });

/**
 * Before validation:
 * - Normalize SKU
 * - Normalize attributes
 * - Generate optionSignature
 * - Generate title
 * - Ensure one primary image
 */
productVariantSchema.pre("validate", function () {
  if (this.sku) {
    this.sku = this.sku.toUpperCase().trim();
  }

  if (this.attributes && this.attributes.length > 0) {
    this.attributes = this.attributes
      .map((attribute) => {
        return {
          ...attribute,
          attributeSlug: attribute.attributeSlug
            ?.toString()
            .toLowerCase()
            .trim(),
          optionValue: attribute.optionValue?.toString().toLowerCase().trim(),
          optionLabel: attribute.optionLabel?.toString().trim(),
        };
      })
      .sort((a, b) => a.attributeSlug.localeCompare(b.attributeSlug));

    this.optionSignature = this.attributes
      .map((attribute) => {
        return `${attribute.attributeSlug}:${attribute.optionValue}`;
      })
      .join("|");

    if (!this.title) {
      this.title = this.attributes
        .map((attribute) => attribute.optionLabel)
        .join(" / ");
    }
  }

  if (this.images && this.images.length > 0) {
    const primaryImages = this.images.filter((image) => image.isPrimary);

    if (primaryImages.length === 0) {
      this.images[0].isPrimary = true;
    }

    if (primaryImages.length > 1) {
      this.images.forEach((image, index) => {
        image.isPrimary = index === 0;
      });
    }

    this.images.forEach((image, index) => {
      if (image.position === undefined || image.position === null) {
        image.position = index;
      }

      if (!image.alt) {
        image.alt = this.title;
      }
    });
  }

});

const ProductVariant =
  mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;