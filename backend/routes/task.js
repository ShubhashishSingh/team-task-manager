const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Create task
router.post("/", auth, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Get tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find().populate("assignedTo project");
  res.json(tasks);
});

// Update status
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(task);
});

module.exports = router;