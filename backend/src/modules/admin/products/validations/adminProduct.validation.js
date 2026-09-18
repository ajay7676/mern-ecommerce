
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

const objectIdString = z
  .string()
  .trim()
  .min(1, "Id is required");

const optionalObjectIdString = z
  .string()
  .trim()
  .optional()
  .nullable();  

const nullableString = z
  .string()
  .trim()
  .nullable()
  .optional();

const requiredString = (message) =>
  z.string().trim().min(1, message);

const optionalNumber = z
  .number()
  .min(0)
  .nullable()
  .optional();

const requiredNumber = (message) =>
  z.number({
    required_error: message,
    invalid_type_error: message,
  }).min(0, message);

const productImageSchema = z.object({
  publicId: nullableString,
  url: requiredString("Image url is required"),
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
  publicId: nullableString,
  url: requiredString("Variant image url is required"),
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
      publicId: nullableString,
      url: nullableString,
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
    mode: z.enum([
      PRODUCT_MODE.DRAFT,
      PRODUCT_MODE.PUBLISH,
    ]),

    basicInformation: z.object({
      name: requiredString("Product name is required"),
      sku: requiredString("Product SKU is required"),
      shortDescription: requiredString("Short description is required"),
      description: requiredString("Product description is required"),
      productType: z.enum([
        PRODUCT_TYPE.SIMPLE,
        PRODUCT_TYPE.VARIABLE,
      ]),
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