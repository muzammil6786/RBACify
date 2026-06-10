const Task = require("../models/Task");
const logActivity = require("../utils/activityLogger");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    createdBy: req.user._id,
  });

  await logActivity(
    req.user._id,
    "TASK_CREATED",
    `Task created: ${task.title}`
  );

  res.status(201).json(task);
};

exports.getMyTasks = async (req, res) => {
  const tasks = await Task.find({
    createdBy: req.user._id,
  });

  res.json(tasks);
};
exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (
    task.createdBy.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (
    task.createdBy.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  Object.assign(task, req.body);

  await task.save();

  await logActivity(
    req.user._id,
    "TASK_UPDATED",
    `Task updated: ${task.title}`
  );

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (
    task.createdBy.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  await task.deleteOne();

  await logActivity(
    req.user._id,
    "TASK_DELETED",
    `Task deleted: ${task.title}`
  );

  res.json({
    message: "Task deleted",
  });
};