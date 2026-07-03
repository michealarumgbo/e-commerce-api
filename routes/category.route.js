import express from "express";
import dotenv from "dotenv";
import { auth } from "../middlewares/auth.middleware.js";
import { authorise } from "../middlewares/authorise.middleware.js";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
  getCategoryBySlug,
} from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  categorySchema,
  editCategorySchema,
} from "../validations/category.validate.js";

dotenv.config();

const router = express.Router();

router.patch(
  "/:id",
  auth(),
  authorise("admin"),
  validate({ body: editCategorySchema }),
  editCategory,
);
router.post(
  "/",
  auth(),
  authorise("admin"),
  validate({ body: categorySchema }),
  createCategory,
);
router.get("/", auth(), authorise("admin", "super_admin"), getCategories);
router.get("/id/:id", auth(), authorise("admin", "super_admin"), getCategory);
router.get("/slug/:slug", auth(), getCategoryBySlug);
router.delete("/:id", auth(), authorise("admin"), deleteCategory);
export default router;
