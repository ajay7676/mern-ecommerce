import mongoose from "mongoose";
import { z } from "zod";

import {
  DISCOUNT_TYPE,
  PRODUCT_MODE,
  PRODUCT_STATUS,
  PRODUCT_TYPE,
  PRODUCT_UNITS,
  PUBLISH_OPTION,
  TAX_CLASS,
} from "../constants/product.constants.js";

const objectIdString = (message = "Invalid id") => {
  return requiredString(message).refine(
    (value) => mongoose.isValidObjectId(value),
    {
      message,
    },
  );
};
const optionalObjectIdString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (!value) return null;
    return String(value).trim();
  })
  .refine((value) => !value || mongoose.isValidObjectId(value), {
    message: "Invalid id",
  });

const numberField = (message = "Invalid number") => {
  return z.coerce.number({
    message,
  });
};
const nullableString = z.string().trim().nullable().optional();

const requiredString = (message) => z.string().trim().min(1, message);

const optionalNumber = z.number().min(0).nullable().optional();

const requiredNumber = (message) =>
  z
    .number({
      required_error: message,
      invalid_type_error: message,
    })
    .min(0, message);

const metaKeywordsSchema = z
  .union([
    z.string(),
    z.array(z.string()),
    z.null(),
    z.undefined(),
  ])
  .transform((value) => {
    if (Array.isArray(value)) {
      return value
        .map((item) => String(item).trim())
        .filter(Boolean)
        .join(", ");
    }

    if (value === null || value === undefined) {
      return null;
    }

    const cleanValue = String(value).trim();

    return cleanValue || null;
  });
const cloudinaryImageUrl = requiredString("Image url is required")
  .url("Image url must be valid")
  .refine((value) => !value.startsWith("blob:"), {
    message: "Please upload image before updating product",
  });

const productImageSchema = z.object({
  publicId: requiredString("Image publicId is required"),
  url: cloudinaryImageUrl,
  altText: z.string().trim().optional().default(""),
  isPrimary: z.boolean().optional().default(false),
  sortOrder: z.number().int().min(1).optional(),
});

const productAttributeOptionSchema = z.object({
  optionId: nullableString,
  label: requiredString("Option label is required"),
  value: requiredString("Option value is required"),
  colorCode: nullableString,
  isCustom: z.boolean().optional().default(false),
});

const productAttributeSchema = z.object({
  attributeId: optionalObjectIdString,
  name: requiredString("Attribute name is required"),
  type: requiredString("Attribute type is required"),
  source: z.enum(["existing", "custom"]).optional().default("existing"),
  options: z
    .array(productAttributeOptionSchema)
    .min(1, "Attribute must have at least one option"),
});

const variantAttributeSchema = z.object({
  attributeId: optionalObjectIdString,
  attributeName: requiredString("Attribute name is required"),
  optionId: nullableString,
  label: requiredString("Variant option label is required"),
  value: requiredString("Variant option value is required"),
  colorCode: nullableString,
  isCustom: z.boolean().optional().default(false),
});

const productVariantImageSchema = z.object({
  publicId: requiredString("Variant image publicId is required"),
  url: cloudinaryImageUrl,
  isPrimary: z.boolean().optional().default(false),
  sortOrder: z.number().int().min(1).optional(),
});

const productVariantSchema = z.object({
  variantId: nullableString,
  name: requiredString("Variant name is required"),
  sku: requiredString("Variant SKU is required"),
  price: requiredNumber("Variant price is required"),
  stock: requiredNumber("Variant stock is required"),
  status: z.enum(["active", "inactive"]),
  source: z.enum(["auto", "manual"]).optional().default("auto"),
  sortOrder: z.number().int().min(1).optional(),
  image: z
    .object({
      publicId: requiredString("Variant image publicId is required"),
      url: cloudinaryImageUrl,
    })
    .optional(),
  images: z.array(productVariantImageSchema).optional().default([]),
  attributes: z
    .array(variantAttributeSchema)
    .min(1, "Variant attributes are required"),
});

const customFieldSchema = z.object({
  label: requiredString("Custom field label is required"),
  value: requiredString("Custom field value is required"),
});

export const createAdminProductSchema = z
  .object({
    mode: z.enum([PRODUCT_MODE.DRAFT, PRODUCT_MODE.PUBLISH]),

    basicInformation: z.object({
      name: requiredString("Product name is required"),
      sku: requiredString("Product SKU is required"),
      shortDescription: requiredString("Short description is required"),
      description: requiredString("Product description is required"),
      productType: z.enum([PRODUCT_TYPE.SIMPLE, PRODUCT_TYPE.VARIABLE]),
      category: requiredString("Category is required"),
      subCategory: nullableString,
      brand: requiredString("Brand is required"),
    }),

    seo: z.object({
      metaTitle: nullableString,
      metaDescription: nullableString,
      metaKeywords: z.array(z.string()).optional().default([]),
    }),

    pricing: z.object({
      sellingPrice: requiredNumber("Selling price is required"),
      discountType: z.enum([
        DISCOUNT_TYPE.NONE,
        DISCOUNT_TYPE.PERCENTAGE,
        DISCOUNT_TYPE.FIXED,
      ]),
      discountValue: optionalNumber,
      taxClass: z.enum([
        TAX_CLASS.GST_0,
        TAX_CLASS.GST_5,
        TAX_CLASS.GST_12,
        TAX_CLASS.GST_18,
        TAX_CLASS.GST_28,
      ]),
      costPrice: optionalNumber,
      mrp: optionalNumber,
      specialPrice: optionalNumber,
      specialPriceFrom: nullableString,
      specialPriceTo: nullableString,
    }),

    inventory: z.object({
      sku: requiredString("Inventory SKU is required"),
      barcode: nullableString,
      trackInventory: z.boolean(),
      stockQuantity: requiredNumber("Stock quantity is required"),
      lowStockThreshold: optionalNumber,
      units: z.enum([
        PRODUCT_UNITS.PCS,
        PRODUCT_UNITS.KG,
        PRODUCT_UNITS.G,
        PRODUCT_UNITS.LTR,
        PRODUCT_UNITS.ML,
        PRODUCT_UNITS.BOX,
      ]),
      allowBackorders: z.boolean(),
    }),

    media: z.object({
      images: z
        .array(productImageSchema)
        .min(1, "At least one product image is required"),
      imageAltText: nullableString,
      displayOrder: z.enum(["custom", "newest", "oldest"]),
      imageZoom: z.boolean(),
      videoUrl: nullableString,
    }),

    attributesAndVariations: z.object({
      attributes: z.array(productAttributeSchema).optional().default([]),
      variants: z.array(productVariantSchema).optional().default([]),
    }),

    additionalDetails: z.object({
      productTypeDetail: nullableString,
      collection: nullableString,
      tags: z.array(z.string()).optional().default([]),
      hsnCode: nullableString,
      countryOfOrigin: nullableString,
      warrantyInformation: nullableString,
      returnPolicy: nullableString,
      careInstructions: nullableString,
      safetyInformation: nullableString,
      userManual: z.any().nullable().optional(),
      customFields: z.array(customFieldSchema).optional().default([]),
    }),

    publishing: z.object({
      status: z.enum([
        PRODUCT_STATUS.DRAFT,
        PRODUCT_STATUS.ACTIVE,
        PRODUCT_STATUS.INACTIVE,
      ]),
      publishOption: z.enum([
        PUBLISH_OPTION.PUBLISH_NOW,
        PUBLISH_OPTION.SCHEDULE_PUBLISH,
        PUBLISH_OPTION.SAVE_AS_DRAFT,
      ]),
      scheduleDate: nullableString,
      scheduleTime: nullableString,
      visibility: z.object({
        onlineStore: z.boolean(),
        mobileApp: z.boolean(),
        pos: z.boolean(),
      }),
    }),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (
      data.mode === PRODUCT_MODE.PUBLISH &&
      data.publishing.publishOption === PUBLISH_OPTION.SCHEDULE_PUBLISH
    ) {
      if (!data.publishing.scheduleDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["publishing", "scheduleDate"],
          message: "Schedule date is required",
        });
      }

      if (!data.publishing.scheduleTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["publishing", "scheduleTime"],
          message: "Schedule time is required",
        });
      }
    }

    const images = data.media.images || [];
    const primaryImages = images.filter((image) => image.isPrimary);

    if (images.length > 0 && primaryImages.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["media", "images"],
        message: "Exactly one primary image is required",
      });
    }

    if (
      data.basicInformation.productType === PRODUCT_TYPE.VARIABLE &&
      data.attributesAndVariations.variants.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["attributesAndVariations", "variants"],
        message: "Variable product must have at least one variant",
      });
    }
  });

const objectIdOrAllSchema = z
  .string()
  .trim()
  .optional()
  .default("all")
  .refine(
    (value) => value === "all" || mongoose.isValidObjectId(value),
    "Invalid id",
  );

export const getAdminProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),

  limit: z.coerce.number().int().min(1).max(100).optional().default(10),

  search: z.string().trim().optional().default(""),

  status: z
    .enum(["draft", "active", "inactive", "all"])
    .optional()
    .default("all"),

  productType: z.enum(["simple", "variable", "all"]).optional().default("all"),

  category: objectIdOrAllSchema,

  brand: objectIdOrAllSchema,

  stockStatus: z
    .enum(["inStock", "lowStock", "outOfStock", "all"])
    .optional()
    .default("all"),

  sortBy: z
    .enum(["createdAt", "name", "price", "stock"])
    .optional()
    .default("createdAt"),

  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const adminProductIdParamSchema = z.object({
  productId: z
    .string()
    .trim()
    .refine((value) => mongoose.isValidObjectId(value), {
      message: "Invalid product id",
    }),
});

const optionalString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (value === null || value === undefined) return null;

    const cleanValue = String(value).trim();

    return cleanValue || null;
  });

const nonNegativeNumberField = (
  message = "Value must be greater than or equal to 0",
) => {
  return z.coerce.number().min(0, message);
};

const dateStringOrNull = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (!value) return null;

    const cleanValue = String(value).trim();

    return cleanValue || null;
  });
const productVisibilitySchema = z.object({
  onlineStore: z.boolean().optional().default(true),
  mobileApp: z.boolean().optional().default(true),
  pos: z.boolean().optional().default(false),
});

const updateBasicInformationSchema = z.object({
  name: requiredString("Product name is required"),

  shortDescription: requiredString("Short description is required"),

  description: requiredString("Description is required"),

  productType: z.enum(["simple", "variable"], {
    message: "Product type must be simple or variable",
  }),

  category: objectIdString("Category is required"),

  subCategory: optionalObjectIdString.optional().default(null),

  brand: objectIdString("Brand is required"),

  status: z.enum(["draft", "active", "inactive"]).optional().default("draft"),

  visibility: productVisibilitySchema.optional().default({
    onlineStore: true,
    mobileApp: true,
    pos: false,
  }),
});

const updateSeoSchema = z.object({
  metaTitle: optionalString.optional().default(null),
  metaDescription: optionalString.optional().default(null),
  metaKeywords: metaKeywordsSchema.optional().default(null),
});

const updatePricingSchema = z.object({
  sellingPrice: nonNegativeNumberField("Selling price is required"),

  costPrice: nonNegativeNumberField("Cost price must be valid")
    .optional()
    .default(0),

  mrp: nonNegativeNumberField("MRP must be valid").optional().default(0),

  discountType: z
    .enum(["none", "percentage", "fixed"])
    .optional()
    .default("none"),

  discountValue: nonNegativeNumberField("Discount value must be valid")
    .optional()
    .default(0),

  taxClass: z
    .enum(["gst0", "gst5", "gst12", "gst18", "gst28"])
    .optional()
    .default("gst18"),

  specialPrice: z
    .union([z.coerce.number().min(0), z.null(), z.undefined(), z.literal("")])
    .transform((value) => {
      if (value === "" || value === null || value === undefined) return null;
      return Number(value);
    }),

  specialPriceFrom: dateStringOrNull.optional().default(null),

  specialPriceTo: dateStringOrNull.optional().default(null),
});

const updateInventorySchema = z.object({
  sku: requiredString("Product SKU is required"),

  barcode: optionalString.optional().default(null),

  trackInventory: z.boolean().optional().default(true),

  stockQuantity: nonNegativeNumberField("Stock quantity must be valid")
    .optional()
    .default(0),

  lowStockThreshold: nonNegativeNumberField("Low stock threshold must be valid")
    .optional()
    .default(0),

  units: z
    .enum(["pcs", "kg", "g", "ltr", "ml", "box"])
    .optional()
    .default("pcs"),

  allowBackorders: z.boolean().optional().default(false),
});

const updateProductImageSchema = z.object({
  imageId: optionalString.optional().default(null),

  publicId: requiredString("Image publicId is required"),

  url: cloudinaryImageUrl,

  altText: optionalString.optional().default(null),

  isPrimary: z.boolean().optional().default(false),

  sortOrder: z.coerce.number().int().min(1).optional().default(1),

  // edit mode metadata
  isExisting: z.boolean().optional().default(false),
  isTemporary: z.boolean().optional().default(false),

  assetState: z
    .enum(["temporary", "permanent"])
    .optional()
    .default("permanent"),
});

const updateMediaSchema = z
  .object({
    images: z
      .array(updateProductImageSchema)
      .min(1, "Please upload at least one product image")
      .max(8, "Maximum 8 product images are allowed"),

    imageAltText: optionalString.optional().default(null),

    displayOrder: z
      .enum(["custom", "newest", "oldest"])
      .optional()
      .default("custom"),

    imageZoom: z.boolean().optional().default(true),

    videoUrl: z
      .union([z.string().url(), z.literal(""), z.null(), z.undefined()])
      .transform((value) => {
        if (!value) return null;
        return value;
      }),
  })
  .superRefine((value, ctx) => {
    const primaryImages = value.images.filter((image) => image.isPrimary);

    if (primaryImages.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["images"],
        message: "Please select exactly one primary image",
      });
    }
  });

const updateAttributeOptionSchema = z.object({
  optionId: optionalString.optional().default(null),

  label: requiredString("Option label is required"),

  value: requiredString("Option value is required"),

  colorCode: optionalString.optional().default(null),

  isCustom: z.boolean().optional().default(false),
});

const updateProductAttributeSchema = z.object({
  attributeId: optionalObjectIdString.optional().default(null),

  name: requiredString("Attribute name is required"),

  slug: optionalString.optional().default(null),

  type: z.enum(["dropdown", "switch", "text", "number", "boolean"], {
    message: "Invalid attribute type",
  }),

  source: z.enum(["existing", "custom"]).optional().default("existing"),

  options: z
    .array(updateAttributeOptionSchema)
    .min(1, "Attribute must have at least one option"),
});

const updateVariantImageSchema = z
  .object({
    publicId: optionalString.optional().default(null),
    url: z
      .union([z.string().url(), z.literal(""), z.null(), z.undefined()])
      .transform((value) => {
        if (!value) return null;
        return value;
      }),

    isExisting: z.boolean().optional().default(false),
    isTemporary: z.boolean().optional().default(false),

    assetState: z
      .enum(["temporary", "permanent"])
      .optional()
      .default("permanent"),
  })
  .optional()
  .nullable();

const updateVariantAttributeSchema = z.object({
  attributeId: optionalObjectIdString.optional().default(null),

  attributeName: requiredString("Variant attribute name is required"),

  optionId: optionalString.optional().default(null),

  label: requiredString("Variant option label is required"),

  value: requiredString("Variant option value is required"),

  colorCode: optionalString.optional().default(null),

  isCustom: z.boolean().optional().default(false),
});

const variantAttributeValuesSchema = z.union([
  z.array(updateVariantAttributeSchema),

  z
    .record(z.string(), updateVariantAttributeSchema)
    .transform((value) => Object.values(value)),
]);

const updateVariantSchema = z.object({
  variantId: optionalString.optional().default(null),

  name: requiredString("Variant name is required"),

  sku: requiredString("Variant SKU is required"),

  price: nonNegativeNumberField("Variant price must be valid"),

  stock: nonNegativeNumberField("Variant stock must be valid"),

  status: z
    .union([z.enum(["active", "inactive"]), z.boolean()])
    .transform((value) => {
      if (value === true) return "active";
      if (value === false) return "inactive";
      return value;
    }),

  source: z.enum(["auto", "manual"]).optional().default("auto"),

  image: updateVariantImageSchema.default(null),

  images: z.array(updateProductImageSchema).optional().default([]),

  attributeValues: variantAttributeValuesSchema.default([]),

  optionSignature: optionalString.optional().default(null),

  sortOrder: z.coerce.number().int().min(1).optional().default(1),

  isExisting: z.boolean().optional().default(false),
});

const updateAttributesAndVariationsSchema = z.object({
  attributes: z.array(updateProductAttributeSchema).optional().default([]),

  variants: z.array(updateVariantSchema).optional().default([]),
});

const updateAdditionalDetailsSchema = z.object({
  productTypeDetail: optionalString.optional().default(null),

  collection: optionalString.optional().default(null),

  tags: z
    .union([z.string(), z.array(z.string()), z.null(), z.undefined()])
    .transform((value) => {
      if (Array.isArray(value)) return value;

      if (!value) return [];

      return String(value)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }),

  hsnCode: optionalString.optional().default(null),

  countryOfOrigin: optionalString.optional().default(null),

  warrantyInformation: optionalString.optional().default(null),

  returnPolicy: optionalString.optional().default(null),

  careInstructions: optionalString.optional().default(null),

  userManual: z.any().optional().nullable(),

  safetyInformation: optionalString.optional().default(null),

  customFields: z
    .array(
      z.object({
        id: optionalString.optional().default(null),
        label: optionalString.optional().default(null),
        value: optionalString.optional().default(null),
      }),
    )
    .optional()
    .default([]),
});

const updatePublishingSchema = z
  .object({
    publishOption: z
      .enum(["publishNow", "schedulePublish", "saveAsDraft"])
      .optional()
      .default("publishNow"),

    scheduleDate: optionalString.optional().default(null),

    scheduleTime: optionalString.optional().default(null),
  })
  .superRefine((value, ctx) => {
    if (value.publishOption === "schedulePublish") {
      if (!value.scheduleDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["scheduleDate"],
          message: "Schedule date is required",
        });
      }

      if (!value.scheduleTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["scheduleTime"],
          message: "Schedule time is required",
        });
      }
    }
  });
export const updateAdminProductSchema = z
  .object({
    mode: z.enum(["draft", "publish"]).optional().default("publish"),

    basicInformation: updateBasicInformationSchema,

    seo: updateSeoSchema,

    pricing: updatePricingSchema,

    inventory: updateInventorySchema,

    media: updateMediaSchema,

    attributesAndVariations: updateAttributesAndVariationsSchema,

    additionalDetails: updateAdditionalDetailsSchema,

    publishing: updatePublishingSchema,
  })
  .superRefine((value, ctx) => {
    const { basicInformation, attributesAndVariations } = value;

    if (basicInformation.productType === "variable") {
      if (!attributesAndVariations.attributes.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["attributesAndVariations", "attributes"],
          message: "Variable product must have at least one attribute",
        });
      }

      if (!attributesAndVariations.variants.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["attributesAndVariations", "variants"],
          message: "Variable product must have at least one variant",
        });
      }
    }

    const variantSkus = attributesAndVariations.variants
      .map((variant) => variant.sku)
      .filter(Boolean);

    const uniqueVariantSkus = new Set(variantSkus);

    if (variantSkus.length !== uniqueVariantSkus.size) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["attributesAndVariations", "variants"],
        message: "Variant SKUs must be unique",
      });
    }

    const signatures = attributesAndVariations.variants
      .map((variant) => variant.optionSignature)
      .filter(Boolean);

    const uniqueSignatures = new Set(signatures);

    if (signatures.length !== uniqueSignatures.size) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["attributesAndVariations", "variants"],
        message: "Variant combinations must be unique",
      });
    }
  });
