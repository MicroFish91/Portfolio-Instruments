import passport from "passport";

export const requireLogin = passport.authenticate("local", { session: false });
export const requireJwt = passport.authenticate("jwt", { session: false });
