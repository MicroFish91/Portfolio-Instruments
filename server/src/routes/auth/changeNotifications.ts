import { Request, Response } from "express";
import logger from "../../logger";
import { formatValidationError } from "../../logger/formatLogError";
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
  if (error) {
    logger.warn(
      formatValidationError(error.message, "/changeNotifications", id)
    );
    return res.status(400).json({ message: error.message });
  }

  await db.Users.update({ rebalanceThreshold, vpThreshold }, { where: { id } });
  return res.json({ message: "Success." });
};
