import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { createToken } from "../../auth";
import { secrets, SERVER_BASE_URL } from "../../config";
import logger from "../../logger";
import { formatValidationError } from "../../logger/formatLogError";
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
  } else {
    logger.info({
      message: `Attempted user login on unverified email: ${email}.`,
    });
    return res
      .status(403)
      .json({ message: "Email confirmation link has not been verified." });
  }
};

export const register = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) {
    logger.warn(formatValidationError(error.message, "/register"));
    return res.status(400).json({ message: error.message });
  }

  const { email, password, firstName, lastName } = req.body;
  const encryptedPassword = await bcrypt.hashSync(password, 8);

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
      `Please click on the following link to verify: <a href="${SERVER_BASE_URL}/api/confirmation/${emailToken}">Verify Email</a>`
    );
    return res.json({ message: "Success." });
  } else {
    logger.info({
      message: `Registration initiated on an account that already exists: ${email}`,
    });
    return res.status(422).json({ message: "Email already exists." });
  }
};
