import { BadRequestError, NotFoundError } from "../errors.js";
import { createSlug } from "../utils/functions.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

// create category
export const createCategory = async (body = {}) => {
  const slug = createSlug(body.name);
  const existing = await Category.findOne({
    slug,
  });

  if (existing) {
    throw BadRequestError("Category already exists.");
  }

  const category = new Category({
    name: body.name,
  });

  if (body.parent) {
    const parent = await Category.findOne({ name: body.parent });
    if (!parent)
      throw BadRequestError("Enter a valid category as parent category");

    //   check if combination (parent - child) exists
    const parentChildExists = await Category.findOne({
      name: body.name,
      parentCategoryId: parent._id,
    });

    if (parentChildExists)
      throw BadRequestError("Category already exists for this parent");

    const parentSlug = createSlug(body.parent);
    category.slug = parentSlug + "-" + slug;
    category.parentCategoryId = parent._id;
  } else {
    category.slug = slug;
  }

  await category.save();

  return category;
};

// name
// parent
// if parent exists
// check the category is not a parent it self so u dont put it under a child
// check the new parent exists

// edit (patch) category
export const editCategory = async (body = {}) => {
  const name = body.name;
  const parent = body.parent;
  const id = body.id;

  if (!name && !parent) {
    throw BadRequestError("At least one param must be present");
  }
  //   check if category exists
  const category = await Category.findById(id);
  if (!category) {
    throw NotFoundError("Requested category dosen't exists");
  }
  if (name) {
    // check if category exists
    const exists = await Category.findOne({ name });
    if (exists) {
      throw BadRequestError("Category name already taken");
    }

    category.name = name;
  }

  if (parent) {
    const parentData = await Category.findOne({ name: parent });
    // makes sure the parent exists
    if (!parentData) {
      throw NotFoundError("Parent dosen't exist");
    }
    // makes sure a category dosent parent it self
    if (category._id == parentData._id) {
      throw BadRequestError("A category can't be a parent to itself");
    }

    // make sure the category isn't a parent
    if (!(category.parentCategoryId == null)) {
      const slug = `${createSlug(parentData.name)}-${createSlug(category.name)}`;
      category.slug = slug;
      category.parentCategoryId = parentData._id;
    }
  }

  await category.save();

  return category;
};

// get all categories
export const getCategories = async () => {
  const categories = await Category.find();

  return categories;
};

// get a category
export const getCategory = async (id) => {
  const category = Category.findById(id);
  if (!category) {
    throw NotFoundError("Category not found");
  }

  return category;
};

// delete  a category
// if it has children - reject
export const deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw BadRequestError("Category dosen't exists");
  }

  // check if it has children
  const children = await Category.exists({ parentCategoryId: id });
  if (children) {
    throw BadRequestError(
      "To delete this category delete or move the child category",
    );
  }

  const productExists = await Product.exists({
    categoryId: id,
  });

  if (productExists) {
    throw BadRequestError("Cannot delete a category that contains products.");
  }

  await category.deleteOne();

  return;
};

// get a category by its slug
export const getCategoryBySlug = async (slug) => {
  const category = Category.findOne({ slug: slug });
  if (!category) {
    throw NotFoundError("Category not found");
  }

  return category;
};
