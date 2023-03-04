const logger = require("./logger");
const { StatusCodes } = require("http-status-codes");
const {
  handleJsonWebTokenError,
  handleDuplicateKetError,
  handleMongooseCastError,
  handleMongooseValidationError,
  handleBadRequestError,
} = require("./customErrorHandlers/index");

const BadRequestError = require("./customErrors/BadRequestError");

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

  logger.error(err);

  //  Cast error
  if (err.name === MONGOOSE_CAST_ERROR) {
    customError = handleMongooseCastError(customError, err);
  } else if (err instanceof BadRequestError) {
    customError = handleBadRequestError(customError, err);
  }
  // Field validation
  else if (err.name === MONGOOSE_VALIDATION_ERROR) {
    customError = handleMongooseValidationError(customError, err);
  }
  // Duplicate register value
  else if (err.code === MONGOOSE_DUPLICATE_KEY_ERROR_CODE) {
    customError = handleDuplicateKetError(customError, err);
  }
  // JWT invalid token
  else if (
    err.name === JWT_ERROR ||
    err.name === EXPIRED_JWT ||
    err.name === NO_TOKEN
  ) {
    customError = handleJsonWebTokenError(customError, err);
  }

  // Send the error message
  res
    .status(customError.statusCode)
    .json({ msg: customError.msg, status: customError.status });
};

//! Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "Unknown endpoint" });
};

module.exports = { errorHandlerMiddleware, unknownEndpoint };
