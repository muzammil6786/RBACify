const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/blacklistedTokenModel");
const logActivity = require("../utils/activityLogger");
const e = require("express");


exports.register = async (req, res) => {
  const { name, email, password ,role ,status } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role,
    status
  });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

//   await logActivity(user._id, "REGISTER", "User registered");

 // TRACK LOGIN ACTIVITY
    await logActivity({
      userId: user._id,
      action: "REGISTER",
      req,
    });

  res.status(201).json({
    message: "User registered",
    token,
    user,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials user not found",
    });
  }

  if (user.status === "Inactive") {
    return res.status(403).json({
      message: "User account inactive",
    });
  } 

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

//   await logActivity(user._id, "LOGIN", "User logged in");

   // TRACK LOGIN ACTIVITY
    await logActivity({
      userId: user._id,
      action: "LOGIN",
      req,
    });
  res.json({
    message: "Login successful",
    token,
    user,
  });
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided for logout",
      });
    }

    await BlacklistedToken.create({
      token,
    });

    // Track activity
    await logActivity({
      userId: req.user?._id,
      action: "LOGOUT",
      req,
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};