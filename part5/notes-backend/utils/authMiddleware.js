const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const UnauthenticatedError = require("../customErrors/unauthenticated");
const BadRequestError = require("../customErrors/BadRequestError");

const authenticateJWT = async (req, res, next) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return next(new UnauthenticatedError());
  }
  const token = authorizationHeader.split(" ")[1];

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return next(new BadRequestError("No such user."));
  }

  req.user = user;
  next();
};

module.exports = authenticateJWT;
