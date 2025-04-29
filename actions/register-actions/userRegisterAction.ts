"use server";
import { IUserTypes } from "@/interfaces/user.interface";
import { addUser } from "@/services/users";
import { UserRegisterSchema } from "@lib/userRules";

export const userRegisterAction = async (_: undefined, formData: FormData) => {
  try {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const firstname = formData.get("firstname")?.toString() || "";
    const lastname = formData.get("lastname")?.toString() || "";
    const phone_number = Number(formData.get("phone") || null);
    const personal_id = Number(formData.get("personalId") || null);
    const profilePicture = formData.get("profilePicture") as File | null;
    const lat = formData.get("lat") as string;
    const lng = formData.get("lng") as string;

    const inputData: IUserTypes = {
      email,
      password,
      firstname,
      lastname,
      phone_number,
      personal_id,
      // profilePicture,
      coordinates: {
        lat,
        lng,
      },
    };
    console.log(inputData);
    const validatedFields = UserRegisterSchema.safeParse(inputData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        values: inputData,
      };
    }

    addUser(inputData);
    console.log("after");
    return {
      success: true,
      errors: {},
      values: inputData,
    };
  } catch (error) {
    console.error("Server error in userRegisterAction:", error);

    return {
      success: false,
      errors: {
        server: ["Something went wrong. Please try again."],
      },
      values: {},
    };
  }
};
