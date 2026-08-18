const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = field
      ? `${field} already exists`
      : "Duplicate value already exists";
  }
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode,
     ...(err.errors && {
      errors: err.errors,
    }),
  });
};

export default errorHandler;
