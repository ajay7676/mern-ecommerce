import HandleError from "../utils/handleError.js";

export const validateQuery = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const errors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "query";
        errors[field] = issue.message;
      });

      return next(new HandleError("Invalid query parameters", 400, errors));
    }

    req.validatedQuery = result.data;
    next();
  };
};
