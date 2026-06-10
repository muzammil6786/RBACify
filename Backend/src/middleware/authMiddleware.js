const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BlacklistedToken = require("../models/blacklistedTokenModel");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

     // CHECK BLACKLIST
    const blacklisted = await BlacklistedToken.findOne({token});

    if (blacklisted) {
      return res.status(401).json({
        message:
          "Session expired. Please login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.status === "Inactive") {
      return res.status(403).json({
        message: "User account inactive",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Invalid token",
    });
  }
};