const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// 🔥 TEST ROUTE (ADD HERE)
app.post("/test", (req, res) => {
  res.send("NEW TEST WORKING 🔥");
});

// ✅ Auth Routes
app.use("/api/auth", require("./routes/auth"));

// ✅ Project Routes
app.use("/api/projects", require("./routes/project"));

// ✅ Task Routes
app.use("/api/tasks", require("./routes/task"));

// Home route
app.get("/", (req, res) => {
  res.send("Server working 🚀");
});
app.get("/api/dashboard", async (req, res) => {
  try {
    const Task = require("./models/Task");

    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "done" });
    const pendingTasks = await Task.countDocuments({ status: "todo" });
    const inProgressTasks = await Task.countDocuments({ status: "in-progress" });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server (ALWAYS LAST)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});