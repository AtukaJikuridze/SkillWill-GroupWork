"use server";

import { IUserRulesType, IUserTypes } from "@/interfaces/user.interface";
import { addUser } from "@/services/users";
import { UserRegisterSchema } from "@lib/userRules";

export const userRegisterAction = async (_: undefined, formData: FormData) => {
  try {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const firstname = formData.get("firstname")?.toString() || "";
    const lastname = formData.get("lastname")?.toString() || "";
    const phone_number = formData.get("phone_number")?.toString() || "";
    const personal_id = formData.get("personal_id")?.toString() || "";
    const profile_picture = formData.get("profile_picture") as File | null;
    const lat = formData.get("lat")?.toString() || "";
    const lng = formData.get("lng")?.toString() || "";

    const inputData: IUserTypes = {
      email,
      password,
      firstname,
      lastname,
      phone_number,
      personal_id,
      profile_picture,
      coordinates: {
        lat,
        lng,
      },
    };
    const inputDataForRules: IUserRulesType = {
      email,
      password,
      firstname,
      lastname,
      phone_number,
      personal_id,
      profile_picture,
      lat,
      lng,
    };

    const validatedFields = UserRegisterSchema.safeParse(inputDataForRules);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        values: inputData,
      };
    }

    await addUser({
      ...inputData,
      phone_number: parseInt(phone_number),
      personal_id: parseInt(personal_id),
    });
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
