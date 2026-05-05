const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// Create project
router.post("/", auth, async (req, res) => {
  const project = await Project.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.json(project);
});

// Get all projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find().populate("members");
  res.json(projects);
});

module.exports = router;