const { StatusCodes } = require("http-status-codes");

const handleBadRequestError = (customError, err) => {
  customError.msg = err.message;

  customError.statusCode = StatusCodes.BAD_REQUEST;

  return customError;
};

module.exports = handleBadRequestError;
