import express from "express";

import {
  addTeamMember,
  editTeamMemberRole,
  removeTeamMember,
} from "../controllers/team.js";
import {
  addTeamRole,
  editTeamRole,
  removeTeamRole,
} from "../controllers/team.js";

const router = express.Router();

router.post("/addTeamMember", addTeamMember);
router.put("/editTeamMemberRole", editTeamMemberRole);
router.delete("/removeTeamMember", removeTeamMember);

router.post("/addRole", addTeamRole);
router.put("/editRole", editTeamRole);
router.delete("/removeRole", removeTeamRole);

export default router;
