import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getProjectBugs,
  getUserBugs,
  createProjectBug,
  deleteBug,
  updateBug,
  assignBug,
} from "../controllers/bugs.js";

const router = express.Router();

router.post("/fetchProjectBugs", auth, getProjectBugs);
router.post("/fetchUserBugs", auth, getUserBugs);
router.post("/createProjectBug", auth, createProjectBug);
router.put("/", auth, updateBug);
router.put("/assign", auth, assignBug);
router.delete("/deleteBug", auth, deleteBug);

export default router;
