const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body || {};

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

module.exports = { register };