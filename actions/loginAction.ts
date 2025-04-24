"use server";

export const loginAction = async (_: undefined, formData: FormData) => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const values = { email, password };

  return {
    success: true,
    errors: {},
    values,
  };
};
