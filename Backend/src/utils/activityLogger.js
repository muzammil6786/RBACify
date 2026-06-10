const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({
  userId,
  action,
  req,
}) => {
  try {
    await ActivityLog.create({
      user: userId,

      action,

      ipAddress:
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress,

      userAgent: req.headers["user-agent"],

      device: req.headers["sec-ch-ua-platform"] || "Unknown",
    });
  } catch (error) {
    console.log("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;