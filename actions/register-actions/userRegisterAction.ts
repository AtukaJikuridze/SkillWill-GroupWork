"use server";
import { UserRegisterSchema } from "@lib/userRules";

export const userRegisterAction = async (_: undefined, formData: FormData) => {
  try {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const firstname = formData.get("firstname")?.toString() || "";
    const lastname = formData.get("lastname")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const personalId = formData.get("personalId")?.toString() || "";
    const profilePicture = formData.get("profilePicture") as File | null;
    const lat = formData.get("lat") as string | null;
    const lng = formData.get("lng") as string | null;

    const inputData = {
      email,
      password,
      firstname,
      lastname,
      phone,
      personalId,
      profilePicture,
      lat,
      lng,
    };

    const validatedFields = UserRegisterSchema.safeParse(inputData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        values: inputData,
      };
    }

    // Continue processing (e.g., saving to DB, sending confirmation email, etc.)
    console.log(true);

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
