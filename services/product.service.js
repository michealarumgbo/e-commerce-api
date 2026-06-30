import Product from "../models/product.model.js";
import { BadRequestError, NotFoundError } from "../errors.js";
import { createSlug } from "../utils/functions.js";
import Category from "../models/category.model.js";

// create a product
export const createProduct = async (body) => {
  const slug = createSlug(body.name);
  const category = await Category.findOne({ name: body.category });
  const product = new Product({
    name: body.name,
    slug,
    description: body.description,
    brand: body.brand,
    categoryId: category._id,
    status: "draft",
  });
  await product.save();

  return product;
};
