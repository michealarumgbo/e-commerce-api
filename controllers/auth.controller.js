import * as authService from "../services/auth.service.js";
import { STATUS_CODE } from "../constants.js";

// create user controller
export const createUser = async (req, res) => {
  const user = await authService.createUser(req.body);

  res.status(STATUS_CODE.CREATED).json({
    message: "User registered successfully",
    data: user,
  });
};

// create admin controller
export const createAdmin = async (req, res) => {
  const user = await authService.createAdmin(req.body);

  res.status(STATUS_CODE.CREATED).json({
    message: "User registered successfully",
    data: user,
  });
};
