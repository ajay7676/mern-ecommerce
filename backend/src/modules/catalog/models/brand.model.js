import mongoose from 'mongoose';

 const brandLogoSchema = new mongoose.Schema(
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
      maxlength: [120, "Logo alt text cannot exceed 120 characters"],
    },
  },
    {
    _id: false,
  }
 )

const brandSeoSchema = new mongoose.Schema(
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

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      minlength: [2, "Brand name must be at least 2 characters"],
      maxlength: [80, "Brand name cannot exceed 80 characters"],
    },

    slug: {
      type: String,
      required: [true, "Brand slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Brand description cannot exceed 1000 characters"],
    },

    logo: brandLogoSchema,

    website: {
      type: String,
      trim: true,
    },

    seo: brandSeoSchema,

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
);


brandSchema.index({ isActive: 1, isDeleted: 1 });
brandSchema.index({ isFeatured: 1, isActive: 1, isDeleted: 1 });
brandSchema.index({ createdAt: -1 });

const BrandModel = mongoose.model("Brand", brandSchema);

export default BrandModel;