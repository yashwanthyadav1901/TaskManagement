const User = require("./../models/User");
const Note = require("./../models/Note");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = User.find().select("-password").lean();

  if (!users) {
    return res.status(400).json({ message: "no users found" });
  }

  res.json(users);
});

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.json({ message: "duplicate username" });
  }

  const hashedpwd = await bcrypt.hash(password, 10);

  const userobj = { username, password: hashedpwd, roles };

  const user = await User.create(userobj);

  if (user) {
    return res
      .status(201)
      .json({ message: `new user ${user.username} created` });
  } else {
    res.status(400).json({ message: "invalid user data received" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active != boolean
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password is required" });
  }

  const dupliate = await User.findOne({ username }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.json({ message: "duplicate username found" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  const updatedUser = await User.save();

  res.json({ message: `user ${user.username} updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "user ID required" });
  }

  const note = await Note.findOne({ user: id }).lean().exec();

  if (note) {
    res.json({ message: "user has assigned notes" });
  }

  const user = await User.findById(id).lean().exec();

  if (!user) {
    res.json({ message: "user not found" });
  }

  const result = await user.deleteOne();

  res.json({ message: `user ${result.username} deleted` });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
