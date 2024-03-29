import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import logger from "../logger";
import db from "../models";

export default function () {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const records = await db.Users.findAll({ where: { email } });
          if (records.length) {
            bcrypt.compare(password, records[0].password, (err, isMatch) => {
              if (err) {
                return done(err);
              } else if (!isMatch) {
                return done(null, false);
              } else {
                return done(null, records[0].dataValues);
              }
            });
          } else {
            return done(null, false);
          }
        } catch (err) {
          logger.error(err, "localStrategy");
          return done(err);
        }
      }
    )
  );
}
