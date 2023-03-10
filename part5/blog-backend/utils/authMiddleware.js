const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { UnauthenticatedError, CustomAPIError } = require("./customErrors");

const authenticateUserRequest = async (req, res, next) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return next(new UnauthenticatedError());
  }

  const token = authorizationHeader.split(" ")[1];

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return next(
      new CustomAPIError(
        `No user found  for the provided id ${decodedToken.id}`,
        404
      )
    );
  }

  req.user = user;
  next();
};

module.exports = authenticateUserRequest;
