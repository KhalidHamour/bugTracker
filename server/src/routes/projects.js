import express from "express";

import {
  getFullProject,
  createProject,
  updateProject,
  deleteProject,
  getUserProjects,
} from "../controllers/projects.js";

const router = express.Router();

router.post("/", getFullProject);
router.post("/fetchUserProjects", getUserProjects);
router.post("/createProject", createProject);
router.put("/updateProject", updateProject);
router.delete("/", deleteProject);

export default router;
