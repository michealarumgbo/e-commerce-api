import Product from "../models/product.model.js";
import { BadRequestError, NotFoundError } from "../errors.js";
import { createSlug } from "../utils/functions.js";
import Category from "../models/category.model.js";

// create a product
export const createProduct = async (body) => {
  // create slug
  const brandSlug = createSlug(body.brand);
  let slug = createSlug(body.name);
  if (!slug.startsWith(`${brandSlug}-`)) {
    slug = `${brandSlug}-${slug}`;
  }

  // check if product already exists
  const productExists = await Product.findOne({ slug });
  if (productExists) {
    throw BadRequestError("Product already exists, you can add variant");
  }

  // check if category exists
  const category = await Category.findOne({ name: body.category });
  if (!category) {
    throw NotFoundError("Specified category not found");
  }
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

// edit a product
// if category - check it exists
export const editProduct = async (body = {}, id) => {
  if (!id) {
    throw BadRequestError("id param is required");
  }
  if (Object.keys(body).length == 0) {
    throw BadRequestError("At least one detail to change must be present");
  }

  // const hasEmptyValue = Object.values(body).some((value) => value === "");

  // if (hasEmptyValue) {
  //   throw new BadRequestError("Fields cannot be empty strings");
  // }

  // check if product exists
  const product = await Product.findById(id);
  if (!product) {
    throw NotFoundError("Product was either deleted or does not exists");
  }

  if (body.name) {
    const nameExists = await Product.findOne({ name: body.name });
    if (nameExists) {
      throw BadRequestError("Product name already taken");
    }
    product = body.name;
  }
  if (body.description) {
    product.description = body.description;
  }
  if (body.brand) {
    product.brand = body.brand;
  }
  if (body.category) {
    // check category exists
    const category = await Category.findOne({ name: category });
    if (!category) {
      throw NotFoundError("Specifid category does not exists");
    }

    product.categoryId = category._id;
  }

  await product.save();

  return product;
};

// get products and append category name
export const getProducts = async () => {
  const products = await Product.find({ status: "active" })
    .populate("categoryId", "name")
    .lean();

  return products;
};
// get products and append category name - admin
export const getProductsAdmin = async () => {
  const products = await Product.find().populate("categoryId", "name").lean();

  return products;
};

// get a specific product
export const getProduct = async (slug) => {
  const product = await Product.findOne({ slug: slug }).populate("categoryId");

  if (!product) {
    throw NotFoundError("Product not found");
  }

  return product;
};

// delete a product
export const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw NotFoundError("Product not found");
  }

  const name = product.name;

  product.status = "archived";
  await product.save;

  return name;
};
