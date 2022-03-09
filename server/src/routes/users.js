import express from "express";
import { emailLogin, emailSignUp, signInwithGoogle } from "../controllers/users.js";

const router = express.Router();

router.post("/emailLogin", emailLogin);
router.post("/emailSignUp", emailSignUp);
router.post("/fetchGoogleUser", signInwithGoogle);

export default router;
