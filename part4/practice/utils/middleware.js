const logger = require("./logger");
const { StatusCodes } = require("http-status-codes");

const handleJsonWebTokenError = require("./customErrorHandlers/handleJsonWebTokenError");
const handleMongooseCastError = require("./customErrorHandlers/handleMongooseCastError");
const handleMongooseValidationError = require("./customErrorHandlers/handleMongooseValidationError");
const handleDuplicateKeyError = require("./customErrorHandlers/handleDuplicateKeyError");

const JWT_ERROR = "JsonWebTokenError";
const EXPIRED_JWT = "TokenExpiredError";
const NO_TOKEN = "UnauthenticatedError";
const MONGOOSE_CAST_ERROR = "CastError";
const MONGOOSE_VALIDATION_ERROR = "ValidationError";
const MONGOOSE_DUPLICATE_KEY_ERROR_CODE = 11000;

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    status: err.status || "Failed",
    msg: err.message || "Something went wrong.",
  };
  //  Cast error
  if (err.name === MONGOOSE_CAST_ERROR) {
    customError = handleMongooseCastError(customError, err);
  }
  // Field validation
  if (err.name === MONGOOSE_VALIDATION_ERROR) {
    customError = handleMongooseValidationError(customError, err);
  }
  // Duplicate register value
  if (err.code && err.code === MONGOOSE_DUPLICATE_KEY_ERROR_CODE) {
    customError = handleDuplicateKeyError(customError, err);
  }
  // JWT invalid token
  if (err.name === JWT_ERROR || EXPIRED_JWT || NO_TOKEN) {
    customError = handleJsonWebTokenError(customError, err);
  }

  // Send the error message
  res
    .status(customError.statusCode)
    .json({ msg: customError.msg, status: customError.status });
};

//! Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};

module.exports = { errorHandlerMiddleware, unknownEndpoint };
