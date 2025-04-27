"use server";
import { IUserTypes } from "@/interfaces/user.interface";
import { supabase } from "@/lib/supabase";

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return data;
};

export const addUser = async (formData: IUserTypes) => {
  const { data, error } = await supabase.from("users").insert([formData]);

  if (error) {
    console.error("Error adding user:", error);
    return null;
  }
  console.log(data);

  return data;
};
