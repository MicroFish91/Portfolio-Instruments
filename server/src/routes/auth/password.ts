import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import generator from "generate-password";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { validatePassword } from "../../models/validation/users";
import { sendEmail } from "../../utils";

// * Route: "/resetPassword"
// * Send an email with new password to user
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const user = await db.Users.findOne({ where: { email: req.body.email } });

    const newPassword = generator.generate({
      length: 15,
      numbers: true,
    });
    const encryptedPassword = await bcrypt.hashSync(newPassword, 8);

    await db.Users.update(
      { password: encryptedPassword },
      { where: { id: user.id } }
    );

    await sendEmail(
      user.email,
      "Portfolio Instruments - Reset Password",
      `Your new password is: ${newPassword}`
    );

    return res.json({ message: "Success" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
};

// * Route: /changePassword"
// * sChange Existing Password
export const changePassword = async (req: Request, res: Response) => {
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
};
