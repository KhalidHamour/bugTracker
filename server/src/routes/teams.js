import express from "express";
import { auth } from "../middleware/auth.js";

import { addTeamMember, editTeamMemberRole, removeTeamMember } from "../controllers/team.js";
import { addTeamRole, editTeamRole, deleteTeamRole } from "../controllers/team.js";

const router = express.Router();

router.post("/addTeamMember", auth, addTeamMember);
router.put("/editTeamMemberRole", auth, editTeamMemberRole);
router.delete("/removeTeamMember", auth, removeTeamMember);

router.post("/addRole", auth, addTeamRole);
router.put("/editRole", auth, editTeamRole);
router.delete("/deleteRole", auth, deleteTeamRole);

export default router;
