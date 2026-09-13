import { z } from "zod";

const emptyToUndefined = (value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return Number(value);
};

const requiredNumber = (message) =>
  z.preprocess(
    emptyToUndefined,
    z
      .number({
        message,
      })
      .min(0, message)
  );

const optionalNumber = z.preprocess(
  (value) => {
    if (value === "" || value === null || value === undefined) {
      return null;
    }

    return Number(value);
  },
  z.number().min(0).nullable()
);

export const addProductSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(150, "Product name cannot exceed 150 characters"),

  sku: z
    .string()
    .trim()
    .min(3, "SKU is required")
    .max(100, "SKU cannot exceed 100 characters"),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description cannot exceed 200 characters"),

  productType: z.enum(["simple", "variable"], {
    message: "Please select product type",
  }),

  category: z
    .string()
    .trim()
    .min(1, "Category is required"),

  subCategory: z
    .string()
    .trim()
    .optional(),

  brand: z
    .string()
    .trim()
    .min(1, "Brand is required"),

  description: z
    .string()
    .trim()
    .min(20, "Product description must be at least 20 characters")
    .max(5000, "Product description cannot exceed 5000 characters"),

  metaTitle: z
    .string()
    .trim()
    .max(60, "Meta title cannot exceed 60 characters")
    .optional(),

  metaDescription: z
    .string()
    .trim()
    .max(160, "Meta description cannot exceed 160 characters")
    .optional(),

  metaKeywords: z
    .string()
    .trim()
    .optional(),

  status: z.enum(["active", "draft"]),

  visibility: z.object({
    onlineStore: z.boolean(),
    mobileApp: z.boolean(),
    pos: z.boolean(),
  }),

   // Step 2
  sellingPrice: requiredNumber("Selling price is required"),

  discountType: z.enum(["none", "percentage", "fixed"]),

  discountValue: optionalNumber,

  taxClass: z.enum([
    "gst0",
    "gst5",
    "gst12",
    "gst18",
    "gst28",
  ]),

  costPrice: optionalNumber,

  mrp: optionalNumber,

  specialPrice: optionalNumber,

  specialPriceFrom: z.string().optional(),
  specialPriceTo: z.string().optional(),

  barcode: z.string().trim().optional(),

  trackInventory: z.boolean(),

  stockQuantity: requiredNumber("Stock quantity is required"),

  lowStockThreshold: optionalNumber,

  units: z.enum(["pcs", "kg", "g", "ltr", "ml", "box"]),

  allowBackorders: z.boolean(),
});