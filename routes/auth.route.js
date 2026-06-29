import express from "express";
import dotenv from "dotenv";

import { registerSchema } from "../validations/register.validate.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createAdmin,
  createUser,
  login,
  newToken,
} from "../controllers/auth.controller.js";
import { loginSchema } from "../validations/login.validate.js";
import { auth } from "../middlewares/auth.middleware.js";

dotenv.config();

const router = express.Router();

router.post("/", validate({ body: registerSchema }), createUser);
router.post("/admin", validate({ body: registerSchema }), createAdmin);
router.post("/login", validate({ body: loginSchema }), login);
router.get("/new-token", auth(process.env.JWT_REFRESH_SECRET), newToken);

export default router;
