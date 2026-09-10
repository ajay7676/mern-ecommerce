import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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

export const createAttributeSchema = z
  .object({
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

    type: z.enum(["dropdown", "switch", "text", "number", "boolean"], {
      message: "Invalid attribute type",
    }),

    values: z.array(attributeValueSchema).optional().default([]),

    unit: z.string().trim().optional().nullable(),

    placeholder: z.string().trim().optional().nullable(),

    defaultValue: z.any().optional().nullable(),

    minValue: z.number().optional().nullable(),

    maxValue: z.number().optional().nullable(),

    minLength: z.number().int().min(0).optional().nullable(),

    maxLength: z.number().int().min(1).optional().nullable(),

    isRequired: z.boolean().optional().default(false),

    showInFilter: z.boolean().optional().default(true),

    showOnProductPage: z.boolean().optional().default(true),

    status: z.enum(["active", "inactive"]).optional().default("active"),

    sortOrder: z.number().int().min(0).optional().default(0),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (["dropdown", "switch"].includes(data.type)) {
      if (!data.values || data.values.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: "Please add at least one value",
        });
      }
    }

    if (["text", "number", "boolean"].includes(data.type)) {
      if (data.values?.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: `${data.type} attribute should not have option values`,
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
    }

    if (data.type === "text") {
      if (
        data.minLength !== null &&
        data.maxLength !== null &&
        data.minLength !== undefined &&
        data.maxLength !== undefined &&
        data.minLength > data.maxLength
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["maxLength"],
          message: "Max length must be greater than min length",
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
  });