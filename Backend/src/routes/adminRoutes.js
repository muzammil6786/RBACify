const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/roleMiddleware");

router.use(protect, adminOnly);

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUser);

router.put("/users/:id/status", updateUserStatus);

router.get("/tasks", getAllTasks);

router.delete("/tasks/:id", deleteAnyTask);

module.exports = router;