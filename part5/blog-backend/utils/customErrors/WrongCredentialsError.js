const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomApiError");

class WrongCredentialsError extends CustomAPIError {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = WrongCredentialsError;
