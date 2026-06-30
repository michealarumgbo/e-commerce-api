import { STATUS_CODE } from "../constants.js";
import * as categoryService from "../services/category.service.js";

// create category
export const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(STATUS_CODE.CREATED).json({ category });
};

// edit category
export const editCategory = async (req, res) => {
  const category = await categoryService.editCategory({
    name: req.body.name,
    parent: req.body.parent,
    id: req.params.id,
  });

  res.status(STATUS_CODE.SUCCESS).json({ category });
};

// get all categories
export const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();

  res.status(STATUS_CODE.SUCCESS).json({ categories });
};

// get a category
export const getCategory = async (req, res) => {
  const category = await categoryService.getCategory(req.params.id);

  res.status(STATUS_CODE.SUCCESS).json({ category });
};

// delete a category
export const deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  res
    .status(STATUS_CODE.SUCCESS)
    .json({ message: "Category deleted successfully" });
};
