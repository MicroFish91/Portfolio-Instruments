import { Request } from "express";
import passport from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  VerifiedCallback,
} from "passport-jwt";
import { secrets } from "../config";
import logger from "../logger";
import { formatLogError } from "../logger/formatLogError";
import db from "../models";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secrets.JWT_SECRET,
  passReqToCallback: true,
};

export default function () {
  passport.use(
    new JwtStrategy(
      jwtOptions,
      async (_req: Request, payload: any, done: VerifiedCallback) => {
        try {
          const user = await db.Users.findByPk(payload.sub);
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          logger.error(formatLogError(err, "jwtStrategy"));
          return done(err);
        }
      }
    )
  );
}
