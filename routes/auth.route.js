import express from "express";
import { registerSchema } from "../validations/register.validate.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createAdmin, createUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", validate({ body: registerSchema }), createUser);
router.post("/admin", validate({ body: registerSchema }), createAdmin);

export default router;
