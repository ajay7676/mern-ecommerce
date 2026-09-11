import { z } from "zod";

const attributeValueSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Value is required")
    .max(100, "Value must be less than 100 characters"),

  value: z
    .string()
    .trim()
    .min(1, "Value is required")
    .max(100, "Value must be less than 100 characters"),

  isDefault: z.boolean().default(false),

  sortOrder: z.number().int().min(0),
});

export const attributeSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Attribute name must be at least 2 characters")
      .max(100, "Attribute name must be less than 100 characters"),

    slug: z
      .string()
      .trim()
      .min(2, "Slug must be at least 2 characters")
      .max(100, "Slug must be less than 100 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug can only contain lowercase letters, numbers and hyphens",
      ),

    type: z.enum(["dropdown", "switch", "text", "boolean", "number"]),

    unit: z
      .string()
      .trim()
      .max(20, "Unit must be less than 20 characters")
      .optional()
      .or(z.literal("")),

    description: z
      .string()
      .trim()
      .max(500, "Description must be less than 500 characters")
      .optional()
      .or(z.literal("")),

    values: z.array(attributeValueSchema),

    defaultValue: z.string().trim().optional().or(z.literal("")),

    status: z.enum(["active", "inactive"]),

    showInFilter: z.boolean(),

    showOnProductPage: z.boolean(),

    // Text configuration
    placeholder: z
      .string()
      .trim()
      .max(150, "Placeholder must be less than 150 characters")
      .optional()
      .or(z.literal("")),

    isRequired: z.boolean(),

    maxLength: z
      .number()
      .int()
      .min(1, "Maximum length must be greater than 0")
      .optional()
      .nullable(),

    // Number configuration
    minValue: z.number().optional().nullable(),

    maxValue: z.number().optional().nullable(),

    stepValue: z
      .number()
      .positive("Step value must be greater than 0")
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    /**
     * ------------------------------------------------
     * DROPDOWN
     * ------------------------------------------------
     */

    if (data.type === "dropdown") {
      if (data.values.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: "Add at least one dropdown value",
        });
      }

      const values = data.values.map((item) => item.value.toLowerCase());

      const uniqueValues = new Set(values);

      if (values.length !== uniqueValues.size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: "Duplicate values are not allowed",
        });
      }

      const defaultValues = data.values.filter((item) => item.isDefault);

      if (defaultValues.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: "Only one default value is allowed",
        });
      }

      if (
        data.defaultValue &&
        !values.includes(data.defaultValue.toLowerCase())
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["defaultValue"],
          message: "Default value must exist in attribute values",
        });
      }
    }

    /**
     * ------------------------------------------------
     * SWITCH
     * ------------------------------------------------
     */

    if (data.type === "switch") {
      if (data.values.length !== 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: "Switch must have exactly two values",
        });
      }
    }

    /**
     * ------------------------------------------------
     * BOOLEAN
     * ------------------------------------------------
     */

    if (data.type === "boolean") {
      if (data.values.length !== 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: "Boolean must have exactly two values",
        });
      }
    }

    /**
     * ------------------------------------------------
     * TEXT
     * ------------------------------------------------
     */

    if (data.type === "text") {
      if (data.maxLength !== null && data.maxLength !== undefined) {
        if (data.maxLength > 5000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["maxLength"],
            message: "Maximum length cannot exceed 5000",
          });
        }
      }
    }

    /**
     * ------------------------------------------------
     * NUMBER
     * ------------------------------------------------
     */

    if (data.type === "number") {
      if (
        data.minValue !== null &&
        data.maxValue !== null &&
        data.minValue !== undefined &&
        data.maxValue !== undefined
      ) {
        if (data.minValue >= data.maxValue) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["minValue"],
            message: "Minimum value must be less than maximum value",
          });
        }
      }

      if (
        data.stepValue !== null &&
        data.stepValue !== undefined &&
        data.stepValue <= 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stepValue"],
          message: "Step value must be greater than 0",
        });
      }
    }
  });

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const optionalNumber = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  return Number(value);
}, z.number().nullable());

const valueSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Value label is required")
    .max(50, "Value must not exceed 50 characters"),

  value: z.string().trim().optional(),

  colorCode: z.string().trim().optional().nullable(),
});

export const attributeFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Attribute name is required")
      .max(80, "Attribute name must not exceed 80 characters"),      
    status: z.enum(["active", "inactive"], {
      message: "Please select valid status",
    }),
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .min(2, "Slug is required")
      .regex(slugRegex, "Use lowercase letters, numbers and hyphen only"),
    type: z.enum(["dropdown", "switch", "text", "number", "boolean"]),

    values: z.array(valueSchema).default([]),

    placeholder: z.string().trim().optional().nullable(),

    defaultValue: z.any().optional().nullable(),

    minValue: optionalNumber.optional(),
    maxValue: optionalNumber.optional(),
    step: optionalNumber.optional(),

    unit: z.string().trim().optional().nullable(),

    maxLength: optionalNumber.optional(),

    trueLabel: z.string().trim().optional().nullable(),

    falseLabel: z.string().trim().optional().nullable(),

    isRequired: z.boolean(),
    showInFilter: z.boolean(),
    showOnProductPage: z.boolean(),

    status: z.enum(["active", "inactive"]),
    sortOrder: z.coerce.number().default(0),
  })
  .superRefine((data, ctx) => {
    if (["dropdown", "switch"].includes(data.type)) {
      if (!data.values || data.values.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: "Please add at least one value",
        });
      }

      data.values.forEach((item, index) => {
        if (!item.label?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["values", index, "label"],
            message: "Value is required",
          });
        }

        if (data.type === "switch" && !item.colorCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["values", index, "colorCode"],
            message: "Color is required",
          });
        }
      });
    }

    if (data.type === "text") {
      if (data.maxLength !== null && data.maxLength < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["maxLength"],
          message: "Max length must be greater than 0",
        });
      }
    }

    if (data.type === "number") {
      if (
        data.minValue !== null &&
        data.maxValue !== null &&
        data.minValue > data.maxValue
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["maxValue"],
          message: "Max value must be greater than min value",
        });
      }

      if (data.step !== null && data.step <= 0) {
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
  });
