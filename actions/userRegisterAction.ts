"use server";
import { UserRegisterSchema } from "@lib/userRules";

export const userRegisterAction = async (
  prevState: IUser,
  formData: FormData
) => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const firstname = formData.get("firstname")?.toString() || "";
  const lastname = formData.get("lastname")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const personalId = formData.get("personalId")?.toString() || "";
  const profilePicture = formData.get("profilePicture")?.toString() || "";

  const inputData = {
    email,
    password,
    firstname,
    lastname,
    phone,
    personalId,
    profilePicture,
  };
  console.log(inputData);

  const validatedFields = UserRegisterSchema.safeParse(inputData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: inputData,
    };
  }

  return {
    success: true,
    errors: {},
    values: inputData,
  };
};
