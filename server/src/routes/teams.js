import express from "express";

import { addTeamMember } from "../controllers/team.js";

const router = express.Router();

router.put("/addTeamMember", addTeamMember);

export default router;
