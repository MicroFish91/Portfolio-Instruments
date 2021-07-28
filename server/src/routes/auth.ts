import bcrypt from "bcryptjs";
import express from "express";
import { createToken, requireLogin } from "../auth";
import db from "../models";
import { UserAttributes as User } from "../models/users";
import { validateUser } from "../models/validation";

const router = express.Router();

router.post("/login", requireLogin, async (req, res) => {
  const { email, firstName, lastName } = req.user as User;
  res.json({
    token: createToken(req.user as User),
    currentUser: { email, firstName, lastName },
  });
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
      });
      const jwtToken = createToken(user.dataValues);
      return res.json({ token: jwtToken });
    } else {
      return res.status(422).json({ message: "Email already exists." });
    }
  } catch (err) {
    return res.status(423).json({ message: "Can't access database." });
  }
});

export default router;
