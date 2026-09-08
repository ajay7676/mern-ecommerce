import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 25 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// const isValidDateOnly = (value) => {
//   const [year, month, day] = value.split("-").map(Number);

//   const date = new Date(Date.UTC(year, month - 1, day));

//   return (
//     date.getUTCFullYear() === year &&
//     date.getUTCMonth() === month - 1 &&
//     date.getUTCDate() === day
//   );
// };

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .optional(),

    phone: z
      .string()
      .trim()
      .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .optional()
      .nullable(),

    dateOfBirth: z.string().refine(
      (value) => {
        if (!value) return true;

        const date = new Date(value);

        return !Number.isNaN(date.getTime()) && date <= new Date();
      },
      {
        message: "Date of birth cannot be in the future",
      },
    ),

    gender: z
      .string()
      .refine(
        (value) => ["", "male", "female", "other"].includes(value),
        "Please select a valid gender",
      ),
  })
  .strict();
