import jwt from "jsonwebtoken";
import { UserAttributes as User } from "../models/users";

export type JwtPayload = {
  sub: number;
  iat: number;
};

export const createToken = (
  user: User,
  secret: string,
  expiresIn: string
): string => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp } as JwtPayload, secret, {
    expiresIn,
  });
};
