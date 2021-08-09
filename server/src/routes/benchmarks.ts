import express from "express";
import { requireJwt } from "../auth";
import db from "../models";
import { UserAttributes as User } from "../models/users";

const router = express.Router();

router.get("/", requireJwt, async (req, res) => {
  try {
    const { id } = req.user as User;
    const user = await db.Users.findOne({ where: { id } });
    return res.json({ benchmark: user.benchmark });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error - could not process request." });
  }
});

router.post("/", requireJwt, async (req, res) => {
  try {
    const { id } = req.user as User;
    await db.Users.update({ benchmark: req.body.benchmark }, { where: { id } });
    return res.json({ message: "Benchmark posted." });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error - could not process request.",
    });
  }
});

export default router;
