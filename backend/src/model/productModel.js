import mongoose from "mongoose";
import validator from "validator";

const imageSchema  = new mongoose.Schema(
  {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
   { _id: false }
)

const  variantAttributeSchema  = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    displayValue: {
      type: String,
      trim: true,
    },
    colorCode: {
      type: String,
      trim: true,
      match: [/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color code"],
    },
 },
  { _id: false }
)

const variantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, "SKU is required"],
      trim: true,
      uppercase: true,
    },

    attributes: {
      type: [variantAttributeSchema],
      validate: {
        validator: (attributes) => attributes && attributes.length > 0,
        message: "At least one variant attribute is required",
      },
    },

    price: {
      type: Number,
      required: [true, "Variant price is required"],
      min: [0, "Variant price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      min: [0, "Variant discount price cannot be negative"],
      validate: {
        validator(value) {
          return value == null || value < this.price;
        },
        message: "Variant discount price must be less than variant price",
      },
    },

    stock: {
      type: Number,
      required: [true, "Variant stock is required"],
      min: [0, "Variant stock cannot be negative"],
      default: 0,
    },

    images: [imageSchema],

    isDefault: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the Product Name"],
      trim: true,
      maxlength: [100, "Product name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter the Product Description"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    images: [imageSchema],
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Product brand is required"],
      trim: true,
    },
    variants: {
      type: [variantSchema],
      validate: {
        validator: (variants) => variants && variants.length > 0,
        message: "At least one product variant is required",
      },
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    minPrice: {
      type: Number,
      default: 0,
    },
    maxPrice: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("save" , function() {
    const activeVariants = this.variants?.filter((v) => v.isActive) || [];

    this.stock = activeVariants.reduce((total, variant) => {
      return total + variant.stock;
    }, 0);
    const prices = activeVariants.map((variant) => {
      return variant.discountPrice || variant.price;
    });

    this.minPrice = prices.length ? Math.min(...prices) : 0;
    this.maxPrice = prices.length ? Math.max(...prices) : 0;

});

productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  category: "text",
});

productSchema.index({ category: 1, brand: 1 });
productSchema.index({ isActive: 1, isDeleted: 1 });
productSchema.index(
  { "variants.sku": 1 }, 
  { 
    unique: true,
    partialFilterExpression: {
      "variants.sku": { $exists: true, $type: "string" },
    },
   });

const ProductModel = mongoose.model("ProductModel", productSchema);

export default ProductModel;
