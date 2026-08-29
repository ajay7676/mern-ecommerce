const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || null;

  if (err.name === "CastError") {
    statusCode = 400;

    message = `Invalid ${err.path}: ${err.value}`;

    errors = {
      [err.path]: message,
    };
  }

  if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists`;

    errors = {
      [field]: message,
    };
  }

  if (err.name === "ValidationError") {
    statusCode = 400;

    errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, error]) => [
        field,
        error.message,
      ])
    );

    message = "Validation failed";
  }
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
     ...(err.errors && {
      errors: err.errors,
    }),
  });
};

export default errorHandler;
