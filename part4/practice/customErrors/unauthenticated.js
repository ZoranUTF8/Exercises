const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./CustomApiError");

class UnauthenticatedError extends CustomApiError {
  constructor(message, status) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.status = status;
    this.name = "UnauthenticatedError";
  }
}

module.exports = UnauthenticatedError;
