import z from "zod";

export const registerSchema = z.object({
  firstName: z.string("First Name is required").trim(),
  lastName: z.string("Last Name is required").trim(),
  email: z.email("Email is required").trim(),
  password: z.string("First Name is required").min(8).trim(),
});
