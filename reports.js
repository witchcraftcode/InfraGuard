import express from "express";
import multer from "multer";
import db from "../db.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ GET all reports
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT r.id, r.date, r.project_id, p.status, p.projectname
      FROM reports r
      JOIN projects p ON r.project_id = p.id
      ORDER BY r.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST new report with file upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { projectId, fileType } = req.body;
    const filePath = `/uploads/${req.file.filename}`;

    const result = await db.query(
      "INSERT INTO reports (project_id, filetype, linktothefile) VALUES ($1, $2, $3) RETURNING *",
      [projectId, fileType, filePath]
    );

    res.status(201).json({ message: "Report created", report: result.rows[0] });
  } catch (err) {
    console.error("❌ Error creating report:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;