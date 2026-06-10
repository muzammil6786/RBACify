const ActivityLog = require("../models/ActivityLog");

exports.getLogs = async (req, res) => {
  const logs = await ActivityLog.find()
    .populate("user", "name email role")
    .sort({ createdAt: -1 });

  res.json(logs);
};