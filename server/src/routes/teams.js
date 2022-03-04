import express from "express";

import { addTeamMember, editTeamMemberRole, removeTeamMember } from "../controllers/team.js";
import { addTeamRole, editTeamRole, deleteTeamRole } from "../controllers/team.js";

const router = express.Router();

router.post("/addTeamMember", addTeamMember);
router.put("/editTeamMemberRole", editTeamMemberRole);
router.delete("/removeTeamMember", removeTeamMember);

router.post("/addRole", addTeamRole);
router.put("/editRole", editTeamRole);
router.delete("/deleteRole", deleteTeamRole);

export default router;
