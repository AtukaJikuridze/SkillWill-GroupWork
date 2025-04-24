"use server";
import { CourierRegisterSchema } from "@/lib/courierRules";

export const courierRegisterAction = async (
  _: undefined,
  formData: FormData
) => {
  try {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const firstname = formData.get("firstname")?.toString() || "";
    const lastname = formData.get("lastname")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const personalId = formData.get("personalId")?.toString() || "";
    const vehichle = formData.get("vehichle")?.toString() || "";
    const profilePicture = formData.get("profilePicture") as File | null;
    const inputData = {
      email,
      password,
      firstname,
      lastname,
      phone,
      personalId,
      vehichle,
      profilePicture,
    };

    const validatedFields = CourierRegisterSchema.safeParse(inputData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        values: inputData,
      };
    }

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
