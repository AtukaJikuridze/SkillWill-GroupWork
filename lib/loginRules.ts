import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(50, { message: "Email must be at most 50 characters long" })
    .email({ message: "Please enter a valid email address" })
    .regex(/@.*\.(com|net|org)$/, {
      message: "Email must end with .com, .net, or .org",
    })
    .trim(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50, { message: "Password must be at most 50 characters" })
    .trim(),
});
// .regex(/[a-z]/, {
//   message: "Password must contain at least one lowercase letter",
// })
// .regex(/[A-Z]/, {
//   message: "Password must contain at least one uppercase letter",
// })
// .regex(/[0-9]/, { message: "Password must contain at least one number" })
// .regex(/[^a-zA-Z0-9]/, {
//   message: "Password must contain at least one special character",
// })
