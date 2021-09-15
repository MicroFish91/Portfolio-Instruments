import { Request, Response } from "express";
import db from "../../models";
import { UserAttributes as User } from "../../models/users";
import { sendEmail } from "../../utils";

export const getLogs = async (req: Request, _res: Response) => {
  const { id } = req.user as User;
  const user = await db.Users.findOne({ where: { id } });

  if (user.email === "mwfisher91@gmail.com") {
    sendEmail(
      "mwfisher91@gmail.com",
      "PI - Log Data",
      "Please see attached.",
      "combined.log",
      "./combined.log"
    );
  }
};
