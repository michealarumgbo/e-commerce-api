import express from "express";
import { authorise } from "../middlewares/authorise.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createProduct,
  editProduct,
  getProduct,
  getProducts,
  getProductsAdmin,
} from "../controllers/product.controller.js";
import {
  createProductSchema,
  editProductSchema,
} from "../validations/product.validate.js";

const router = express.Router();

router.post(
  "/",
  auth(),
  authorise("admin"),
  validate({ body: createProductSchema }),
  createProduct,
);

router.patch(
  "/:id",
  auth(),
  authorise("admin"),
  validate({ body: editProductSchema }),
  editProduct,
);

router.get("/", auth(), getProducts);
router.get("/admin", auth(), authorise("admin"), getProductsAdmin);
router.get("/:slug", auth(), getProduct);
router.delete("/:id", auth(), authorise("admin"), getProduct);

export default router;
