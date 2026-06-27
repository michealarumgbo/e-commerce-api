import { UnauthourizedError } from "../errors";

export const authrise = (...roles) => {
  return async (req, res, next) => {
    const user = req.user;

    // check user has the correct role
    if (!roles.includes(user.role)) {
      throw UnauthourizedError(`Invalid role. ${roles.join(", ")} only route`);
    }
    next();
  };
};
