"use server";
import { IUser, IUserTypes } from "@/interfaces/user.interface";
import { supabase } from "@/lib/supabase";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

export const addUser = async (formData: IUserTypes) => {
  const { data, error } = await supabase.from("users").insert([formData]);

  if (error) {
    console.error("Error adding user:", error.message);
    return null;
  }
  console.log(data);

  return data;
};

export const getUsers = async (): Promise<IUser[]> => {
  "use cache";
  cacheTag("users");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "user");

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return data;
};

export const getUser = async (id: string): Promise<IUser> => {
  "use cache";
  cacheTag("user-by-id");

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

export const updateUser = async (user: IUser) => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("_uuid", user._uuid)
    .select();

  if (error) {
    console.error("Error Updating User:", error.message);
    return [];
  }

  revalidateTag("user");
  revalidateTag("user-by-id");

  return data;
};

export const deleteIser = async (uuid: number) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("_uuid", uuid);

  if (error) {
    console.error("Error Deleting User:", error.message);
    return [];
  }

  revalidateTag("user");
  revalidateTag("user-by-id");

  return data;
};
