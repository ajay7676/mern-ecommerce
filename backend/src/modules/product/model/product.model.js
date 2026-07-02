
import mongoose from "mongoose";
const PRODUCT_STATUS = ["draft", "published", "archived"];
const PRODUCT_VISIBILITY = ["public", "private"];
const CURRENCIES = ["INR", "USD"];



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

const productSchema = new mongoose.Schema({
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
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
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
          if (!value) return true;
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
      enum: CURRENCIES,
      default: "INR",
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
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
    images: {
      type: [productImageSchema],
      validate: {
        validator: function (images) {
          return images.length > 0;
        },
        message: "At least one product image is required",
      },
    },
    seo: seoSchema,
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
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
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
      min: 0,
    },

    wishlistCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    purchaseCount: {
      type: Number,
      default: 0,
      min: 0,
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

// Virtual final price
productSchema.virtual("finalPrice").get(function () {
  return this.discountPrice || this.price;
});

// Virtual discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (!this.discountPrice || !this.price) return 0;

  return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});

// Virtual stock status
productSchema.virtual("isInStock").get(function () {
  return this.stock > 0;
});

// Text search index
productSchema.index({
  name: "text",
  shortDescription: "text",
  description: "text",
});

// Common filtering indexes
productSchema.index({ category: 1, status: 1, isDeleted: 1 });
productSchema.index({ brand: 1, status: 1, isDeleted: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ ratings: -1 });
productSchema.index({ sold: -1 });

// Ensure only one primary image
productSchema.pre("validate", function (next) {
  if (!this.images || this.images.length === 0) {
    return next();
  }

  const primaryImages = this.images.filter((image) => image.isPrimary);

  if (primaryImages.length === 0) {
    this.images[0].isPrimary = true;
  }

  if (primaryImages.length > 1) {
    this.images = this.images.map((image, index) => ({
      ...image,
      isPrimary: index === 0,
    }));
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;



