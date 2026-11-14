const AppError = require("../utils/AppError");
const env = require("../config/env");

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const normalizeError = (err) => {
  if (err.type === "entity.parse.failed") {
    return new AppError("Invalid JSON in request body", 400);
  }

  
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return new AppError(messages.join(". "), 400);
  }

  
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "value";
    return new AppError(`${field} is already registered`, 409);
  }

  return err;
};

const errorHandler = (err, req, res, next) => {
  const error = normalizeError(err);

  const statusCode = error.statusCode || 500;
  const isExpected = error.isOperational === true;

  if (!isExpected) {
    console.error(error);
  }

  const response = {
    success: false,
    message: isExpected ? error.message : "Something went wrong",
  };

  if (env.nodeEnv === "development") {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };