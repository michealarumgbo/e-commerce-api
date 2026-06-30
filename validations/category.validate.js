import z from "zod";

export const categorySchema = z.object({
  name: z.string("Category name is required").trim(),
  parent: z.string("Parent Category is required").trim().optional(),
});

export const editCategorySchema = z.object({
  name: z.string("Category name is required").trim().optional(),
  parent: z.string("Parent Category is required").trim().optional(),
});
