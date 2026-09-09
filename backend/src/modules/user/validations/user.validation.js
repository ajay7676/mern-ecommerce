import { z } from "zod";

const isValidDateOnly = (value) => {
  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const avatarSchema = z.object({
  publicId: z.string().trim().min(1, "Avatar publicId is required"),

  url: z.string().url("Please provide a valid avatar URL"),
});

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

    dateOfBirth: z
      .string()
      .refine(isValidDateOnly, {
        message: "Please provide a valid date of birth",
      })
      .refine((date) => new Date(`${date}T00:00:00.000Z`) <= new Date(), {
        message: "Date of birth cannot be in the future",
      })
      .optional()
      .nullable(),

    gender: z.enum(["male", "female", "other"]).optional().nullable(),
    avatar: avatarSchema.optional().nullable(),
  })
  .strict();

export const deleteTemporaryAvatarSchema = z
  .object({
    publicIds: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Avatar publicId is required")
      )
      .min(1, "Please provide at least one avatar publicId")
      .max(5, "You can delete maximum 5 temporary avatars at once"),
  })
  .strict();
