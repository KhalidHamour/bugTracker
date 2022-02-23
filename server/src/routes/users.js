import express from "express";

import {
  signIn,
  signUp,
  getUsers,
  signInwithGoogle,
} from "../controllers/users.js";

const router = express.Router();

router.get("/fetchUsers", getUsers);
router.get("/fetchUser", signIn);
router.post("/", signUp);
router.post("/fetchGoogleUser", signInwithGoogle);
// router.delete("/deleteUser", deleteUser);

export default router;
