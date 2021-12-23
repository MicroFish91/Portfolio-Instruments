import express from "express";
import { asyncMiddleware, requireJwt, requireLogin } from "../../middleware";
import { changeNotifications } from "./changeNotifications";
import { deleteUser } from "./deleteUser";
import { confirmEmail, resendConfirmEmail } from "./email";
import { changePassword, resetPassword } from "./password";
import { login, register } from "./signIn";

const router = express.Router();

// Sign-In
router.post("/login", requireLogin, asyncMiddleware(login));
router.post("/register", asyncMiddleware(register));

// Auth Misc
router.get("/confirmation/:emailToken", confirmEmail);
router.post("/confirmation", resendConfirmEmail);
router.post("/resetPassword", asyncMiddleware(resetPassword));
router.post("/changePassword", requireJwt, asyncMiddleware(changePassword));
router.post(
  "/changeNotifications",
  requireJwt,
  asyncMiddleware(changeNotifications)
);

// Delete Account
router.delete("/deleteUser", requireJwt, asyncMiddleware(deleteUser));

export default router;
