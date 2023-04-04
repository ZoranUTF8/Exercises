const BadRequestError = require("./BadRequestError");
const JsonWebTokenError = require("./JsonWebTokenError");
const UnauthenticatedError = require("./UnauthenticatedError");
const WrongCredentialsError = require("./WrongCredentialsError");
const CustomAPIError = require("./CustomAPIError");
module.exports = {
  BadRequestError,
  JsonWebTokenError,
  UnauthenticatedError,
  WrongCredentialsError,
  CustomAPIError,
};
