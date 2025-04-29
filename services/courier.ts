"use server";
import { IBaseCourier, ICourier } from "@/interfaces/user.interface";
import { supabase } from "@/lib/supabase";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

export const getCouriers = async (): Promise<ICourier[]> => {
  "use cache";
  cacheTag("couriers");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "courier");

  if (error) {
    console.error("Error fetching courier:", error.message);
    return [];
  }

  return data;
};

export const getCourier = async (id: string): Promise<ICourier> => {
  "use cache";
  cacheTag("courier-by-id");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("_uuid", id)
    .single();

  if (error) {
    console.error("Error fetching couriers:", error.message);
  }

  return data;
};

export const createCourier = async (courier: IBaseCourier) => {
  const { data, error } = await supabase
    .from("users")
    .insert([courier])
    .select();

  if (error) {
    console.error("Error Creating Courier:", error.message);
    return [];
  }

  revalidateTag("couriers");

  return data;
};

export const updateCourier = async (courier: ICourier) => {
  const { data, error } = await supabase
    .from("users")
    .update(courier)
    .eq("_uuid", courier._uuid)
    .select();

  if (error) {
    console.error("Error Updating Courier:", error.message);
    return [];
  }

  revalidateTag("couriers");
  revalidateTag("courier-by-id");

  return data;
};

export const deleteCourier = async (uuid: number) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("_uuid", uuid);

  if (error) {
    console.error("Error Deleting Courier:", error.message);
    return [];
  }

  revalidateTag("couriers");
  revalidateTag("courier-by-id");

  return data;
};

export const searchCouriers = async (search: string): Promise<ICourier[]> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(
      `firstName.ilike.%${search}%,lastName.ilike.%${search}%,email.ilike.%${search},vehicle.ilike.%${search}%`
    )
    .eq("role", "courier");

  if (error) {
    console.error("Error Searching Courier:", error.message);
    return [];
  }

  return data;
};
