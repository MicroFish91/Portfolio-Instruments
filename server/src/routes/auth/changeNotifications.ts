import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { validateNotifications } from "../../models/validation/users";

// * Route: "/changeNotifications"
// * Change User Notification Settings
export const changeNotifications = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const { rebalanceThreshold, vpThreshold } = req.body as {
    rebalanceThreshold: number;
    vpThreshold: number;
  };

  const { error } = validateNotifications(rebalanceThreshold, vpThreshold);
  if (error) return res.status(400).json({ message: error.message });

  try {
    await db.Users.update(
      { rebalanceThreshold, vpThreshold },
      { where: { id } }
    );
    return res.json({ message: "Success." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
};
