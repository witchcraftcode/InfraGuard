// backend/routes/projects.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Get only ongoing projects (status = 'Pending')
router.get("/ongoing", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM projects WHERE status = 'Pending'");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching ongoing projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { projectname, contractor, location, budget, spent, status, user_id } = req.body;

    const result = await db.query(
      "INSERT INTO projects (projectname, contractor, location, budget, spent, status, user_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [projectname, contractor, location, budget, spent, status, user_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error creating project:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get projects by user_id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(
      "SELECT * FROM projects WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/projects/:id/reschedule
// Update next_inspection for a project
router.put("/:projectId/reschedule", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { next_inspection } = req.body;

    const result = await db.query(
      "UPDATE projects SET next_inspection = $1 WHERE id = $2 RETURNING *",
      [next_inspection, projectId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error updating next_inspection:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;