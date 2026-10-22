import express from "express";
import { handleLogout, loginUser, registerUser } from "../controller/auth.controllers.js";
import { loginAccountIpLimiter, loginIpLimiter } from "../middleware/loginRateLimit.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginIpLimiter, loginAccountIpLimiter, loginUser);
router.post("/logout", handleLogout);

export default router;
