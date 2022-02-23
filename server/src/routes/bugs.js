import express from "express";

import {
  getProjectBugs,
  createProjectBug,
  deleteBug,
  updateBug,
} from "../controllers/bugs.js";

const router = express.Router();

router.post("/fetchProjectBugs", getProjectBugs);
router.post("/createProjectBug", createProjectBug);
router.put("/", updateBug);
router.delete("/", deleteBug);

export default router;
