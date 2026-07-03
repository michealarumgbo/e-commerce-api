import z from "zod";

export const createProductSchema = z.object({
  name: z.string("Product name is required").trim(),
  description: z.string("Product description is required").trim(),
  brand: z.string("Product brand is required").trim(),
  category: z.string("Product category is required").trim(),
});

export const editProductSchema = z.object({
  name: z.string("Product name is required").trim().optional(),
  description: z.string("Product description is required").trim().optional(),
  brand: z.string("Product brand is required").trim().optional(),
  category: z.string("Product category is required").trim().optional(),
});
