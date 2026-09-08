import { ZodError } from "zod";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = {};

        error.issues.forEach((issue) => {
          const field = issue.path[0];

          if (field) {
            fieldErrors[field] = issue.message;
          }
        });

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: fieldErrors,
          statusCode: 400,
        });
      }

      next(error);
    }
  };
};