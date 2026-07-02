import mongoose from "mongoose";

const categoryImageSchema  = new mongoose.Schema(
  {
    public_id: {
      type: String,
      trim: true,
    },

    url: {
      type: String,
      trim: true,
    },

    alt: {
      type: String,
      trim: true,
      maxlength: [120, "Image alt text cannot exceed 120 characters"],
    },
  },
  {
    _id: false,
  }
)

const categorySeoSchema = new mongoose.Schema(
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
)

const categorySchema  = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [80, "Category name cannot exceed 80 characters"],
    },
      slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Category description cannot exceed 1000 characters"],
    },
    image: categoryImageSchema,
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },
     level: {
      type: Number,
      default: 0,
      min: [0, "Category level cannot be negative"],
    },
     sortOrder: {
      type: Number,
      default: 0,
    },
    seo: categorySeoSchema,
     isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
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
)

categorySchema.index({ parentCategory: 1, isActive: 1, isDeleted: 1 });
categorySchema.index({ isFeatured: 1, isActive: 1, isDeleted: 1 });
categorySchema.index({ sortOrder: 1 });
categorySchema.index({ createdAt: -1 });

const Category = mongoose.model("Category", categorySchema);

export default Category;