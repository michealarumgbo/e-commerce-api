import z from "zod";

export const loginSchema = z.object({
  email: z.email("Email is required").trim(),
  password: z.string("First Name is required").min(8).trim(),
});
