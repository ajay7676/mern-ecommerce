import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    public_id: { type: String, trim: true },
    url: { type: String, trim: true },
  },
  { _id: false },
);

const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
         type: String, trim: true, maxlength: 70
    },
    metaDescription: {
         type: String, trim: true, maxlength: 160 
    },
    metaKeywords: [
        { type: String, trim: true }
    ],
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    image: imageSchema,

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,

    seo: seoSchema,

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
  },
  { timestamps: true }
);

categorySchema.index({ parentCategory: 1 });
categorySchema.index({ isActive: 1, isDeleted: 1 });

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
