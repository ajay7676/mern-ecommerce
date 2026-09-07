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
        "Slug can only contain lowercase letters, numbers and hyphens"
      ),

    type: z.enum([
      "dropdown",
      "switch",
      "text",
      "boolean",
      "number",
    ]),

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

    defaultValue: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

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

      const values = data.values.map((item) =>
        item.value.toLowerCase()
      );

      const uniqueValues = new Set(values);

      if (values.length !== uniqueValues.size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["values"],
          message: "Duplicate values are not allowed",
        });
      }

      const defaultValues = data.values.filter(
        (item) => item.isDefault
      );

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