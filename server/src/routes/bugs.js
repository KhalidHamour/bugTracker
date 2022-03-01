import express from "express";

import {
  getProjectBugs,
  createProjectBug,
  deleteBug,
  updateBug,
  assignBug,
} from "../controllers/bugs.js";

const router = express.Router();

router.post("/fetchProjectBugs", getProjectBugs);
router.post("/createProjectBug", createProjectBug);
router.put("/", updateBug);
router.put("/assign", assignBug);
router.delete("/deleteBug", deleteBug);

export default router;
