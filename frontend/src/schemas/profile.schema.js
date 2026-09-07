import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  phone: z
    .string()
    .trim()
    .regex(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits"
    )
    .or(z.literal("")),

  dateOfBirth: z
    .string()
    .or(z.literal("")),

  gender: z
    .enum(["male", "female", "other"])
    .or(z.literal("")),
});