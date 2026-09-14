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

const imageSchema = z.object({
  imageId: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  previewUrl: z.string(),
  altText: z.string().optional(),
  isPrimary: z.boolean(),
  sortOrder: z.number(),
  file: z.any().optional(),
});


const productAttributeOptionSchema = z.object({
  optionId: z.string().optional(),
  label: z.string().trim().min(1, "Option label is required"),
  value: z.string().trim().min(1, "Option value is required"),
  colorCode: z.string().optional().nullable(),
});

const productAttributeSchema = z.object({
  attributeId: z.string().optional(),
  name: z.string().trim().min(1, "Attribute name is required"),
  type: z.enum(["dropdown", "color", "text", "number", "boolean"]),
  source: z.enum(["existing", "custom"]).optional(),
  options: z
    .array(productAttributeOptionSchema)
    .min(1, "Please add at least one option"),
});

const productVariantSchema = z.object({
  variantId: z.string().optional(),
  name: z.string().trim().min(1, "Variant name is required"),
  sku: z.string().trim().min(1, "Variant SKU is required"),
  price: z.string().trim().min(1, "Price is required"),
  stock: z.string().trim().min(1, "Stock is required"),
  status: z.boolean(),
  source: z.enum(["auto", "manual"]).optional(),
  imageUrl: z.string().optional(),
  images: z.array(z.any()).optional(),
  attributeValues: z.any().optional(),
});

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

  // Step 3: Images & Media
images: z
  .array(imageSchema)
  .min(1, "Please upload at least one product image")
  .max(8, "You can upload maximum 8 images"),

imageAltText: z
  .string()
  .trim()
  .max(120, "Image alt text cannot exceed 120 characters")
  .optional(),

displayOrder: z.enum(["custom", "newest", "oldest"]),

imageZoom: z.boolean(),

videoUrl: z
  .union([
    z.literal(""),
    z.string().url("Please enter a valid video URL"),
  ])
  .optional(),

  attributes: z
  .array(productAttributeSchema)
  .min(1, "Please select at least one attribute"),

  variants: z
  .array(productVariantSchema)
  .min(1, "Please create at least one variant"),

});