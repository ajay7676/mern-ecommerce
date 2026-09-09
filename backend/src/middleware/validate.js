import { ZodError } from "zod";
import HandleError from "../utils/handleError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body ?? {});
    
    if (!result.success) {
      const errors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "body";
        errors[field] = issue.message;
      });

      return next(
        new HandleError(
          "Validation failed",
          400,
          errors
        )
      );
    }

    req.body = result.data;
    next();
  };
};