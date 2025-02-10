const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign({ userID: user._id, name: user.name }, "jwtsecret", {
    expiresIn: "30d",
  });

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
