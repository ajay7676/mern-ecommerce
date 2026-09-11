import HandleError from '../utils/handleError.js';


export const validateParams = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const errors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "params";
        errors[field] = issue.message;
      });

      return next(new HandleError("Invalid route parameters", 400, errors));
    }

    req.params = result.data;
    next();
  };
};