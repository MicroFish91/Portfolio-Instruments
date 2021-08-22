import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { createToken } from "../../auth";
import { secrets, SERVER_BASE_URL } from "../../config";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { validateUser } from "../../models/validation";
import { sendEmail } from "../../utils";

export const login = async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    confirmed,
    rebalanceThreshold,
    vpThreshold,
  } = req.user as User;
  if (confirmed) {
    try {
      await db.Users.update({ lastLoggedIn: new Date() }, { where: { email } });

      return res.json({
        token: createToken(req.user as User, secrets.JWT_SECRET, "1d"),
        currentUser: {
          email,
          firstName,
          lastName,
          rebalanceThreshold,
          vpThreshold,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error - could not process request.",
      });
    }
  } else {
    return res
      .status(403)
      .json({ message: "Email confirmation link has not been verified." });
  }
};

export const register = async (req: Request, res: Response) => {
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
};
