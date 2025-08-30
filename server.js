// backend/server.js
import express from "express";
import cors from "cors";
import projectsRoute from "./routes/projects.js";
import reportsRoute from "./routes/reports.js"; // <-- handles /api/reports
import db from "./db.js"; // ✅ import db so queries work

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// Debug logger
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// Routes
app.use("/api/projects", projectsRoute);
app.use("/api/reports", reportsRoute); // ✅ delegate to reports.js

// Root test
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);