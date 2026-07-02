import mongoose from 'mongoose';

const ATTRIBUTE_TYPES = [
  "text",
  "number",
  "boolean",
  "select",
  "multi_select",
  "color",
];

const categoryAttributeSchema  =  new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },
     name: {
      type: String,
      required: [true, "Attribute name is required"],
      trim: true,
      maxlength: [80, "Attribute name cannot exceed 80 characters"],
    },

    slug: {
      type: String,
      required: [true, "Attribute slug is required"],
      lowercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ATTRIBUTE_TYPES,
      required: [true, "Attribute type is required"],
      default: "text",
    },
    options: [
      {
        label: {
          type: String,
          trim: true,
        },

        value: {
          type: String,
          trim: true,
          lowercase: true,
        },

        colorCode: {
          type: String,
          trim: true,
        },
      },
    ],
     unit: {
      type: String,
      trim: true,
    },

    isRequired: {
      type: Boolean,
      default: false,
    },

    isFilterable: {
      type: Boolean,
      default: true,
    },

    isComparable: {
      type: Boolean,
      default: false,
    },

    showOnProductPage: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
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
  }
);

categoryAttributeSchema.index(
  { category: 1, slug: 1 },
  { unique: true }
);

categoryAttributeSchema.index({
  category: 1,
  isActive: 1,
  isDeleted: 1,
});

categoryAttributeSchema.index({
  isFilterable: 1,
  isActive: 1,
  isDeleted: 1,
});

const CategoryAttribute = mongoose.model(
  "CategoryAttribute",
  categoryAttributeSchema
);

export default CategoryAttribute;