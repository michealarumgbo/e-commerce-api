import * as productService from "../services/product.service.js";
import { STATUS_CODE } from "../constants.js";

// create a product
export const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(STATUS_CODE.CREATED).json({ product });
};

// edit products
export const editProduct = async (req, res) => {
  const product = await productService.editProduct(req.body, req.params.id);

  res.status(STATUS_CODE.SUCCESS).json({ product });
};

// get all products - everyone
export const getProducts = async (req, res) => {
  const products = await productService.getProducts();

  res.status(STATUS_CODE.SUCCESS).json({ products });
};
// get all products - admin
export const getProductsAdmin = async (req, res) => {
  const products = await productService.getProductsAdmin();

  res.status(STATUS_CODE.SUCCESS).json({ products });
};

// get a product
export const getProduct = async (req, res) => {
  const product = await productService.getProduct(req.params.slug);

  res.status(STATUS_CODE.SUCCESS).json({ product });
};

// delete a product
export const deleteProduct = async (req, res) => {
  const prroductName = await productService.deleteProduct(req.params.id);

  res
    .status(STATUS_CODE.SUCCESS)
    .json({ message: `${prroductName} has been archived` });
};
