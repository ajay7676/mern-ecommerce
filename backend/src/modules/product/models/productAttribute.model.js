import mongoose from "mongoose";

const ATTRIBUTE_TYPES = [
  "text",
  "number",
  "boolean",
  "select",
  "multi_select",
  "color",
];

const selectedOptionSchema = new mongoose.Schema(
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
  {
    _id: false,
  }
);

const productAttributeValueSchema = new mongoose.Schema(
  {
    textValue: {
      type: String,
      trim: true,
    },

    numberValue: {
      type: Number,
    },

    booleanValue: {
      type: Boolean,
    },

    selectedValue: selectedOptionSchema,

    selectedValues: [selectedOptionSchema],
  },
  {
    _id: false,
  }
);

const productAttributeSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },

    categoryAttribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryAttribute",
      required: [true, "Category attribute is required"],
      index: true,
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
      index: true,
    },

    attributeType: {
      type: String,
      enum: ATTRIBUTE_TYPES,
      required: [true, "Attribute type is required"],
    },

    value: {
      type: productAttributeValueSchema,
      required: [true, "Attribute value is required"],
    },

    displayValue: {
      type: String,
      trim: true,
    },

    searchableValue: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },

    isFilterable: {
      type: Boolean,
      default: true,
      index: true,
    },

    isComparable: {
      type: Boolean,
      default: false,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
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
  },
  {
    timestamps: true,
  }
);


/**
 * One product can have one value for one category attribute.
 * Example:
 * Product iPhone 16 cannot have RAM twice.
 */
productAttributeSchema.index(
  { product: 1, categoryAttribute: 1 },
  { unique: true }
);

/**
 * Useful for filtering.
 * Example:
 * Find all products where RAM = 8GB.
 */
productAttributeSchema.index({
  category: 1,
  attributeSlug: 1,
  searchableValue: 1,
});

/**
 * Useful for product detail page.
 */
productAttributeSchema.index({
  product: 1,
  isVisible: 1,
  sortOrder: 1,
});


/**
 * Auto-generate displayValue and searchableValue.
 */

productAttributeSchema.pre("validate", function () {
  const value = this.value || {};

  if (this.attributeType === "text") {
    this.displayValue = value.textValue;
    this.searchableValue = value.textValue?.toLowerCase();
  }

  if (this.attributeType === "number") {
    this.displayValue = String(value.numberValue);
    this.searchableValue = String(value.numberValue);
  }

  if (this.attributeType === "boolean") {
    this.displayValue = value.booleanValue ? "Yes" : "No";
    this.searchableValue = value.booleanValue ? "true" : "false";
  }

  if (this.attributeType === "select" || this.attributeType === "color") {
    this.displayValue = value.selectedValue?.label;
    this.searchableValue = value.selectedValue?.value;
  }

  if (this.attributeType === "multi_select") {
    this.displayValue = value.selectedValues
      ?.map((item) => item.label)
      .join(", ");

    this.searchableValue = value.selectedValues
      ?.map((item) => item.value)
      .join(",");
  }

});

const ProductAttribute =
  mongoose.models.ProductAttribute ||
  mongoose.model("ProductAttribute", productAttributeSchema);

export default ProductAttribute;
