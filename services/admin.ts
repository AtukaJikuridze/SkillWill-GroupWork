"use server";
import { IRandomUser } from "@/interfaces/user.interface";
import { supabase } from "@/lib/supabase";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

export const getRandomUsers = async (): Promise<IRandomUser[]> => {
  "use cache";
  cacheTag("random-users");

  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return data;
};

export const getUser = async (id: string): Promise<IRandomUser> => {
  "use cache";
  cacheTag("random-user-by-id");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("_uuid", id)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
  }

  return data;
};

export const updateRandomUser = async (user: IRandomUser) => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("_uuid", user._uuid)
    .select();

  if (error) {
    console.error("Error updating user:", error.message);
    return [];
  }

  revalidateTag("user");
  revalidateTag("user-by-id");
  revalidateTag("random-users");
  revalidateTag("random-user-by-id");

  return data;
};

export const deleteRandomUser = async (uuid: number) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("_uuid", uuid);

  if (error) {
    console.error("Error Deleting User:", error.message);
    return [];
  }

  revalidateTag("random-users");
  revalidateTag("random-user-by-id");

  return data;
};

export const searchRandomUsers = async (
  search: string
): Promise<IRandomUser[]> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(
      `firstName.ilike.%${search}%,lastName.ilike.%${search}%,email.ilike.%${search},vehicle.ilike.%${search}%`
    );

  if (error) {
    console.error("Error searching user:", error.message);
    return [];
  }

  return data;
};
