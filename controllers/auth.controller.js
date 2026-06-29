import * as authService from "../services/auth.service.js";
import { STATUS_CODE } from "../constants.js";

// create user controller
export const createUser = async (req, res) => {
  const user = await authService.createUser(req.body);

  res.status(STATUS_CODE.CREATED).json({
    message: "User registered successfully",
    user: user,
  });
};

// create admin controller
export const createAdmin = async (req, res) => {
  const user = await authService.createAdmin(req.body);

  res.status(STATUS_CODE.CREATED).json({
    message: "User registered successfully",
    user: user,
  });
};

// login user(any type of role)
export const login = async (req, res) => {
  const user = await authService.loginUser(req.body);

  res.status(STATUS_CODE.SUCCESS).json({
    message: "Log in successful",
    user: user,
  });
};

// new access token
export const newToken = async (req, res) => {
  const accessToken = await authService.newToken(req.user);

  res.status(STATUS_CODE.SUCCESS).json({
    message: "New Token Generated Successfully",
    user: { accessToken },
  });
};

// logout
export const logout = async (req, res) => {
  await authService.logoutUser(req.user);

  res.status(STATUS_CODE.SUCCESS).json({ message: "Logout successful" });
};
