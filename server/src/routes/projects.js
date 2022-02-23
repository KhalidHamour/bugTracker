import express from "express";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getUserProjects,
} from "../controllers/projects.js";

const router = express.Router();

router.post("/", getProjects);
router.post("/fetchUserProjects", getUserProjects);
router.post("/createProject", createProject);
router.put("/:id", updateProject);
router.delete("/", deleteProject);

export default router;
