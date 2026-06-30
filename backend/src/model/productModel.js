import mongoose from "mongoose";
import validator from "validator";

const variantSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: [true, "Variant color is required"],
      trim: true,
    },
    colorCode: {
      type: String,
      trim: true,
      default: "",
    },
    size: {
      type: String,
      required: [true, "Variant size is required"],
      trim: true,
      uppercase: true,
    },
    stock: {
      type: Number,
      required: [true, "Variant stock is required"],
      min: [0, "Variant stock cannot be negative"],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      trim: true,
      uppercase: true,
    },
  },
  { _id: false },
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
      unique: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
      maxlength: [100, "Price cannot be exced more than 7 digit"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function (value) {
          return !value || value < this.price;
        },
        message: "Discount price must be less than original price",
      },
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
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
        validator: function (variants) {
          return variants && variants.length > 0;
        },
        message: "At least one product variant is required",
      },
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
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

productSchema.pre("save" , function (next){
  if(this.variants && this.variants.length > 0){
    this.stock = this.variants.reduce((total, variant) => {
      return total +(variant.stock || 0);
    },0)
  }

  next();

});

productSchema.index({ name: "text", description: "text", brand: "text", category: "text" });
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ isActive: 1, isDeleted: 1 });

const ProductModel = mongoose.model("ProductModel", productSchema);

export default ProductModel;
