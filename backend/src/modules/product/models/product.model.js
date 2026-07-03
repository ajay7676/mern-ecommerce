import mongoose from "mongoose";

const PRODUCT_STATUS = ["draft", "published", "archived"];
const PRODUCT_VISIBILITY = ["public", "private"];
const PRODUCT_CURRENCY = ["INR", "USD"];

const productImageSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      trim: true,
    },

    url: {
      type: String,
      required: [true, "Product image URL is required"],
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

const seoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [70, "SEO title cannot exceed 70 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [170, "SEO description cannot exceed 170 characters"],
    },

    keywords: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
  },
  {
    _id: false,
  }
);

const productSchema = new mongoose.Schema(
  {
    // 1. Basic Information
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
      maxlength: [150, "Product name cannot exceed 150 characters"],
    },

    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: [250, "Short description cannot exceed 250 characters"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [5000, "Product description cannot exceed 5000 characters"],
    },

    // 2. Relations
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
      index: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Product brand is required"],
      index: true,
    },

    // 3. Pricing
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function (value) {
          if (value === undefined || value === null) return true;
          return value < this.price;
        },
        message: "Discount price must be less than original price",
      },
    },

    costPrice: {
      type: Number,
      min: [0, "Cost price cannot be negative"],
      select: false,
    },

    currency: {
      type: String,
      enum: PRODUCT_CURRENCY,
      default: "INR",
    },

    // 4. Inventory
    sku: {
      type: String,
      required: [true, "Product SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
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

    // 5. Media
    images: {
      type: [productImageSchema],
      validate: {
        validator: function (images) {
          return Array.isArray(images) && images.length > 0;
        },
        message: "At least one product image is required",
      },
    },

    // 6. SEO
    seo: {
      type: seoSchema,
      default: {},
    },

    // 7. Status
    status: {
      type: String,
      enum: PRODUCT_STATUS,
      default: "draft",
      index: true,
    },

    visibility: {
      type: String,
      enum: PRODUCT_VISIBILITY,
      default: "public",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    // 8. Ratings and Analytics
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },

    numReviews: {
      type: Number,
      default: 0,
      min: [0, "Number of reviews cannot be negative"],
    },

    viewCount: {
      type: Number,
      default: 0,
      min: [0, "View count cannot be negative"],
    },

    wishlistCount: {
      type: Number,
      default: 0,
      min: [0, "Wishlist count cannot be negative"],
    },

    purchaseCount: {
      type: Number,
      default: 0,
      min: [0, "Purchase count cannot be negative"],
    },

    // 9. Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
    },

    // 10. Audit Fields
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
 * Virtual: finalPrice
 * If discountPrice exists, finalPrice = discountPrice
 * Otherwise finalPrice = price
 */
productSchema.virtual("finalPrice").get(function () {
  return this.discountPrice || this.price;
});

/**
 * Virtual: discountPercentage
 */
productSchema.virtual("discountPercentage").get(function () {
  if (!this.discountPrice || !this.price) return 0;

  return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});

/**
 * Virtual: isInStock
 */
productSchema.virtual("isInStock").get(function () {
  if (!this.trackInventory) return true;

  return this.stock > 0;
});

/**
 * Virtual: isLowStock
 */
productSchema.virtual("isLowStock").get(function () {
  if (!this.trackInventory) return false;

  return this.stock > 0 && this.stock <= this.lowStockThreshold;
});

/**
 * Search index
 */
productSchema.index({
  name: "text",
  shortDescription: "text",
  description: "text",
  sku: "text",
});

/**
 * Common filter indexes
 */
productSchema.index({ category: 1, status: 1, isDeleted: 1 });
productSchema.index({ brand: 1, status: 1, isDeleted: 1 });
productSchema.index({ status: 1, visibility: 1, isDeleted: 1 });
productSchema.index({ isFeatured: 1, status: 1, isDeleted: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ ratings: -1 });
productSchema.index({ sold: -1 });

/**
 * Ensure only one primary image
 */
productSchema.pre("validate", function () {
  if (!this.images || this.images.length === 0) {
    return ;
  }

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
      image.alt = this.name;
    }
  });

});

/**
 * Prevent model overwrite error in development
 */
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;