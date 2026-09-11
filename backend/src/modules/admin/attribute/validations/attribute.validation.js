import mongoose from "mongoose";
import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const objectIdSchema = z
  .string()
  .refine((value) => mongoose.isValidObjectId(value), {
    message: "Invalid attribute id",
  });

const optionalNumber = z
  .number()
  .optional()
  .nullable();

const attributeValueSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Value label is required")
    .max(50, "Value label must not exceed 50 characters"),

  value: z
    .string()
    .trim()
    .min(1, "Value is required")
    .max(50, "Value must not exceed 50 characters"),

  colorCode: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color code")
    .optional()
    .nullable(),

  sortOrder: z
    .number()
    .int()
    .min(0)
    .optional(),
});

const baseAttributeSchema = {
  name: z
    .string()
    .trim()
    .min(2, "Attribute name must be at least 2 characters")
    .max(80, "Attribute name must not exceed 80 characters"),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(slugRegex, "Invalid slug format"),

  type: z.enum(["dropdown", "switch", "text", "number", "boolean"]),

  values: z.array(attributeValueSchema).optional().default([]),

  placeholder: z.string().trim().optional().nullable(),

  defaultValue: z.any().optional().nullable(),

  minValue: optionalNumber,
  maxValue: optionalNumber,
  step: optionalNumber,

  unit: z.string().trim().optional().nullable(),

  maxLength: z
    .number()
    .int()
    .min(1)
    .optional()
    .nullable(),

  trueLabel: z.string().trim().optional().nullable(),

  falseLabel: z.string().trim().optional().nullable(),

  isRequired: z.boolean().optional().default(false),

  showInFilter: z.boolean().optional().default(true),

  showOnProductPage: z.boolean().optional().default(true),

  status: z.enum(["active", "inactive"]).optional().default("active"),

  sortOrder: z.number().int().min(0).optional().default(0),
};

const validateAttributeByType = (data, ctx) => {
  if (["dropdown", "switch"].includes(data.type)) {
    if (!data.values || data.values.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["values"],
        message: "Please add at least one value",
      });
    }
  }

  if (data.type === "switch") {
    data.values?.forEach((item, index) => {
      if (!item.colorCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values", index, "colorCode"],
          message: "Color code is required for switch type",
        });
      }
    });
  }

  if (["text", "number", "boolean"].includes(data.type)) {
    if (data.values?.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["values"],
        message: `${data.type} type should not have option values`,
      });
    }
  }

  if (data.type === "number") {
    if (
      data.minValue !== null &&
      data.maxValue !== null &&
      data.minValue !== undefined &&
      data.maxValue !== undefined &&
      data.minValue > data.maxValue
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxValue"],
        message: "Max value must be greater than min value",
      });
    }

    if (data.step !== null && data.step !== undefined && data.step <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["step"],
        message: "Step must be greater than 0",
      });
    }
  }

  if (data.type === "boolean") {
    if (!data.trueLabel?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["trueLabel"],
        message: "True label is required",
      });
    }

    if (!data.falseLabel?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["falseLabel"],
        message: "False label is required",
      });
    }
  }

  const valueSet = new Set();

  data.values?.forEach((item, index) => {
    const key = item.value.toLowerCase();

    if (valueSet.has(key)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["values", index, "value"],
        message: "Duplicate attribute value is not allowed",
      });
    }

    valueSet.add(key);
  });
};

export const createAttributeSchema = z
  .object(baseAttributeSchema)
  .strict()
  .superRefine(validateAttributeByType);

export const updateAttributeSchema = z
  .object(baseAttributeSchema)
  .partial()
  .strict()
  .superRefine((data, ctx) => {
    if (data.type) {
      validateAttributeByType(data, ctx);
    }
  });

export const updateAttributeStatusSchema = z
  .object({
    status: z.enum(["active", "inactive"]),
  })
  .strict();

export const attributeParamsSchema = z.object({
  attributeId: objectIdSchema,
});

export const bulkDeleteAttributesSchema = z
  .object({
    attributeIds: z
      .array(objectIdSchema)
      .min(1, "Please provide at least one attribute id")
      .max(50, "You can delete maximum 50 attributes at once"),
  })
  .strict();

export const getAttributesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional().default(""),

  type: z
    .enum(["dropdown", "switch", "text", "number", "boolean", "all"])
    .optional()
    .default("all"),

  status: z.enum(["active", "inactive", "all"]).optional().default("all"),

  sortBy: z
    .enum(["createdAt", "name", "sortOrder"])
    .optional()
    .default("createdAt"),

  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});