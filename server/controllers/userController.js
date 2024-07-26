const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");
const userModel = require("../modals/userModel");
const asyncHandler = require("express-async-handler");

const loginController = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await userModel.findOne({ name });
  if (!user) {
    res.status(400).json({ error: "user not found" });
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ error: "password is incorrect" });
    throw new Error("password is incorrect");
  }
});

const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "All fields are necessary" });
    throw Error("All fields are necessary");
  }
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.status(400).json({ error: "User already exist" });
    throw Error("User already exist");
  }

  const nameExist = await userModel.findOne({ name });
  if (nameExist) {
    res.status(400).json({ error: "Username already taken" });
    throw Error("Username already taken");
  }

  const user = await userModel.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ error: "registration Error" });
    throw new Error("registration Error");
  }
});

const fetchAllUsers = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await userModel.find({ _id: { $ne: userId } }).select("-password")
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = { loginController, registerController, fetchAllUsers };
