import { z } from "zod";

export const CourierRegisterSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(15, { message: "First name must be at most 15 characters" })
    .trim(),


  phone: z.string().regex(/^\+?\d{9,15}$/, {
    message:
      "Phone number must be between 9 and 15 digits and can start with +",
  }),
  personalId: z
    .string()
    .length(12, { message: "Personal ID must be exactly 12 digits" })
    .regex(/^\d+$/, { message: "Personal ID must contain only digits" }),
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
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .trim(),
  vehichle: z.string().min(1, { message: "This Field Cannot be empty" }).trim(),
});
