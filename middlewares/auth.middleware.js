import User from "../models/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.model.js";

import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  UnauthourizedError,
} from "../errors";

dotenv.config();

export const auth = (jwt_secret = process.env.JWT_ACCESS_SECRET) => {
  return async (req, res, next) => {
    // extract token from authorization haeder
    const authHeader = req.get("Authorization");

    //   check if token is not like "Bearer uefif..."
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Invalid Token" });
    }

    //   get and modify token
    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, jwt_secret);
    if (!decoded || !decoded.id) {
      throw UnauthourizedError("Invalid or expired token");
    }
    // add user to req body
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw NotFoundError("User no longer exists");
    }

    // user has to be logged in
    const isLoggedIn = await RefreshToken.findOne({
      user: decoded.id,
    }).select("token");
    if (!isLoggedIn || !isLoggedIn.token) {
      throw UnauthourizedError("User is already logged out");
    }

    req.user = user;
    next();
  };
};
