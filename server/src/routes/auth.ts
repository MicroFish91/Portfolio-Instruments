import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { createToken, requireJwt, requireLogin } from "../auth";
import { secrets, SERVER_BASE_URL } from "../config";
import db from "../models";
import { UserAttributes as User } from "../models/users";
import { validateUser } from "../models/validation";
import { validatePassword } from "../models/validation/users";
import { sendEmail } from "../utils";

const router = express.Router();

// Set Confirmed to true
router.get("/confirmation/:emailToken", async (req, res) => {
  try {
    const { sub: userId } = jwt.verify(
      req.params.emailToken,
      secrets.EMAIL_SECRET
    );
    await db.Users.update({ confirmed: true }, { where: { id: userId } });
    res.send("Verification successful.");
  } catch (err) {
    res.send("Expired verification token, please reverify.");
  }
});

// Resernd Confirmation Email
router.post("/confirmation", async (req, _res) => {
  try {
    const user = await db.Users.findOne({ where: { email: req.body.email } });
    const emailToken = createToken(user as User, secrets.EMAIL_SECRET, "15m");
    await sendEmail(
      user.email,
      "Portfolio Instruments - Verify Email",
      `Please click on the following link to verify: <a href="${SERVER_BASE_URL}/confirmation/${emailToken}">Verify Email</a>`
    );
  } catch (err) {
    console.log(err);
  }
});

// Change Existing Password
router.post("/changePassword", requireJwt, async (req, res) => {
  try {
    const { id } = req.user as User;
    const { currentPassword, newPassword } = req.body as {
      currentPassword: string;
      newPassword: string;
    };
    const user = await db.Users.findOne({ where: { id } });
    if (user) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (isMatch) {
        const { error } = validatePassword(newPassword);
        if (error) return res.status(400).json({ message: error.message });

        const encryptedPassword = await bcrypt.hashSync(newPassword, 8);
        await db.Users.update(
          { password: encryptedPassword },
          { where: { id: user.id } }
        );
        return res.json({ message: "Success." });
      } else {
        return res.status(403).json({
          message: "Cannot change password. Invalid password provided.",
        });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Account with the provided email was not found." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
});

router.post("/login", requireLogin, async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    confirmed,
    rebalanceThreshold,
    vpThreshold,
  } = req.user as User;
  if (confirmed) {
    res.json({
      token: createToken(req.user as User, secrets.JWT_SECRET, "1d"),
      currentUser: {
        email,
        firstName,
        lastName,
        rebalanceThreshold,
        vpThreshold,
      },
    });
  } else {
    res
      .status(403)
      .json({ message: "Email confirmation link has not been verified." });
  }
});

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { email, password, firstName, lastName } = req.body;
  const encryptedPassword = await bcrypt.hashSync(password, 8);

  try {
    const records = await db.Users.findAll({
      where: {
        email,
      },
    });

    if (records.length === 0) {
      // Unique user, add to db
      const user = await db.Users.create({
        email,
        password: encryptedPassword,
        firstName,
        lastName,
        confirmed: false,
        rebalanceThreshold: 10,
        vpThreshold: 0,
      });
      const emailToken = createToken(user as User, secrets.EMAIL_SECRET, "15m");
      await sendEmail(
        user.email,
        "Portfolio Instruments - Verify Email",
        `Please click on the following link to verify: <a href="${SERVER_BASE_URL}/confirmation/${emailToken}">Verify Email</a>`
      );
      return res.json({ message: "Success." });
    } else {
      return res.status(422).json({ message: "Email already exists." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
});

export default router;
