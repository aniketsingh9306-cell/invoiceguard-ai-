const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const env = require("../config/env");

const protect = async (req, res, next) => {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    throw new AppError("Please log in to access this route", 401);
  }

  const token = header.split(" ")[1];

  const decoded = jwt.verify(token, env.jwtSecret);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("The user for this token no longer exists", 401);
  }

  req.user = user;
  next();
};

module.exports = { protect };