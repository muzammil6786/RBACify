const User = require("../models/User");
const Task = require("../models/Task");
const logActivity = require("../utils/activityLogger");
const ActivityLog = require("../models/ActivityLog");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  await logActivity({
      userId: req.user?._id,
      action: "USER_DELETED by admin",
      req,
    });

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

  await logActivity({
      userId: req.user?._id,
      action: `USER_STATUS_UPDATED to ${user.status} by admin`,
      req,
    });

  res.json(user);
};

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("createdBy", "name email");

  res.json(tasks);
};

exports.deleteAnyTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  await logActivity({
      userId: req.user?._id,
      action: "TASK_DELETED by admin",
      req,
    });

  res.json({
    message: "Task deleted by admin",
  });
};

exports.getActivityLogs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const logs = await ActivityLog.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalLogs = await ActivityLog.countDocuments();

  res.json({
    logs,
    totalPages: Math.ceil(totalLogs / limit),
  });
};