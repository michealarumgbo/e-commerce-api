import { BadRequestError } from "../errors.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { newAccessToken, newRefreshToken } from "../utils/functions.js";
import RefreshToken from "../models/refreshToken.model.js";

// create a user
export const createUser = async (data = {}) => {
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw BadRequestError("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 13);

  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
    role: "user",
  });
  await user.save();
  //   get tokens
  const accessToken = newAccessToken(user);
  const refreshToken = newRefreshToken(user);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
  });
  const userData = user.toObject();
  delete userData.password;

  return { user: userData, accessToken, refreshToken };
};

// create admin
export const createAdmin = async (data = {}) => {
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw BadRequestError("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 13);

  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
    role: "admin",
  });
  await user.save();
  //   get tokens
  const accessToken = newAccessToken(user);
  const refreshToken = newRefreshToken(user);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
  });
  const userData = user.toObject();
  delete userData.password;

  return { user: userData, accessToken, refreshToken };
};
