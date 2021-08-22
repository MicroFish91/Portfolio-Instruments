import express from "express";
import { requireJwt, requireLogin } from "../../auth";
import { changeNotifications } from "./changeNotifications";
import { confirmEmail, resendConfirmEmail } from "./email";
import { changePassword, resetPassword } from "./password";
import { login, register } from "./signIn";

const router = express.Router();

// Sign-In
router.post("/login", requireLogin, login);
router.post("/register", register);

// Auth Misc
router.get("/confirmation/:emailToken", confirmEmail);
router.post("/confirmation", resendConfirmEmail);
router.post("/resetPassword", resetPassword);
router.post("/changePassword", requireJwt, changePassword);
router.post("/changeNotifications", requireJwt, changeNotifications);

export default router;
