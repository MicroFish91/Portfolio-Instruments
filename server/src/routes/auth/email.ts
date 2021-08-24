import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createToken } from "../../auth";
import { secrets, SERVER_BASE_URL } from "../../config";
import logger from "../../logger";
import { formatLogError } from "../../logger/formatLogError";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { sendEmail } from "../../utils";

// * Route: "/confirmation/:emailToken"
// * Sets Confirmed to true
export const confirmEmail = async (req: Request, res: Response) => {
  const { sub: userId } = jwt.verify(
    req.params.emailToken,
    secrets.EMAIL_SECRET
  );
  try {
    await db.Users.update({ confirmed: true }, { where: { id: userId } });
    res.send("Verification successful.");
  } catch (err) {
    logger.warn({ message: `${userId} attemped to verify email but failed.` });
    res.send("Expired verification token, please reverify.");
  }
};

// * Route: "/confirmation"
// * Resend Confirmation Email
export const resendConfirmEmail = async (req: Request, _res: Response) => {
  try {
    const user = await db.Users.findOne({ where: { email: req.body.email } });
    const emailToken = createToken(user as User, secrets.EMAIL_SECRET, "15m");
    await sendEmail(
      user.email,
      "Portfolio Instruments - Verify Email",
      `Please click on the following link to verify: <a href="${SERVER_BASE_URL}/confirmation/${emailToken}">Verify Email</a>`
    );
  } catch (err) {
    logger.warn(formatLogError(err, "/confirmation"));
  }
};
