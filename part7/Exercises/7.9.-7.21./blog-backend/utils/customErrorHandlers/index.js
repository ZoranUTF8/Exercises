const handleJsonWebTokenError = require("./handleJsonWebTokenError");
const handleDuplicateKetError = require("./handleDuplicateKeyError");
const handleMongooseCastError = require("./handleMongooseCastError");
const handleMongooseValidationError = require("./handleMongooseValidationError");
const handleBadRequestError = require("./handleBadRequestError");
module.exports = {
  handleJsonWebTokenError,
  handleDuplicateKetError,
  handleMongooseCastError,
  handleMongooseValidationError,
  handleBadRequestError,
};
