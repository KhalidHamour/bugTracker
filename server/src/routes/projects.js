import express from "express";
import { auth } from "../middleware/auth.js";

import {
  getFullProject,
  createProject,
  updateProject,
  deleteProject,
  getUserProjects,
} from "../controllers/projects.js";

const router = express.Router();

router.post("/", auth, getFullProject);
router.post("/fetchUserProjects", auth, getUserProjects);
router.post("/createProject", auth, createProject);
router.put("/updateProject", auth, updateProject);
router.delete("/", auth, deleteProject);

export default router;
