import jwtStrategy from "./jwtStrategy";
import localStrategy from "./localStrategy";

export { createToken } from "./createToken";
export { requireJwt, requireLogin } from "./middleware";

export const passportAuthInit = () => {
  localStrategy();
  jwtStrategy();
};
