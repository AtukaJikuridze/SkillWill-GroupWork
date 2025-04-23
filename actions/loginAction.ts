"use server";
interface ILogin {
  email: string;
  password: string;
}

export const loginAction = async (prevState: ILogin, formData: FormData) => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const values = { email, password };

  return {
    success: true,
    errors: {},
    values,
  };
};
