const User = require("../models/User");
const Task = require("../models/Task");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted",
  });
};

exports.updateUserStatus = async (req, res) => {
  const { status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(user);
};

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("createdBy", "name email");

  res.json(tasks);
};

exports.deleteAnyTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task deleted by admin",
  });
};