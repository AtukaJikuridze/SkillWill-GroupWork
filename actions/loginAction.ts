"use server";
import { RegisterFormSchema } from "@lib/loginRules";
interface ILogin {
  email: string;
  password: string;
}

export const registerAction = async (prevState: ILogin, formData: FormData) => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const validatedFields = RegisterFormSchema.safeParse({ email, password });

  const values = { email, password };

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values,
    };
  }

  return {
    success: true,
    errors: {},
    values,
  };
};
