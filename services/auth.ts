"use server";
import { IRandomUser } from "@/interfaces/user.interface";
import { supabase } from "@/lib/supabase";
import { unstable_cacheTag as revalidateTag } from "next/cache";

export const loginUser = async (
  email: string,
  password: string
): Promise<IRandomUser> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
  }

  return data;
};

export const registerUser = async (
  user: IRandomUser
): Promise<IRandomUser | null> => {
  "use cache";
  const { data, error } = await supabase.from("users").insert([user]).select();

  if (error) {
    console.error("Error Creating Courier:", error.message);
    return null;
  }

  if (data && Array.isArray(data) && data.length > 0) {
    revalidateTag("random-users");
    revalidateTag("random-user-by-id");
    return data[0];
  }

  return null;
};
