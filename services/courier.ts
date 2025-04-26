import { supabase } from "@/lib/supabase";
import { ICourier } from "@/interfaces/courier.interface";

export const getCouriers = async (): Promise<ICourier[]> => {
  const { data, error } = await supabase.from("couriers").select("*");

  if (error) {
    console.error("Error fetching courier:", error.message);
    return [];
  }

  return data;
};

export const getCourier = async (id: string): Promise<ICourier> => {
  const { data, error } = await supabase
    .from("couriers")
    .select("*")
    .eq("_uuid", id)
    .single();

  if (error) {
    console.error("Error fetching couriers:", error.message);
  }

  return data;
};

export const createCourier = async (courier: ICourier) => {
  const { data, error } = await supabase
    .from("couriers")
    .insert([courier])
    .select();

  if (error) {
    console.error("Error Creating Courier:", error.message);
    return [];
  }

  return data;
};

export const updateCourier = async (courier: ICourier) => {
  const { data, error } = await supabase
    .from("couriers")
    .update(courier)
    .eq("_uuid", courier._uuid)
    .select();

  if (error) {
    console.error("Error Creating Courier:", error.message);
    return [];
  }

  return data;
};

export const deleteCourier = async (uuid: string) => {
  const { data, error } = await supabase
    .from("couriers")
    .delete()
    .eq("_uuid", uuid);

  if (error) {
    console.error("Error Deleting Courier:", error.message);
    return [];
  }

  return data;
};

export const searchCouriers = async (search: string): Promise<ICourier[]> => {
  const { data, error } = await supabase
    .from("couriers")
    .select("*")
    .or(
      `firstName.ilike.%${search}%,lastName.ilike.%${search}%,email.ilike.%${search},vehicle.ilike.%${search}%`
    );

  if (error) {
    console.error("Error Searching Courier:", error.message);
    return [];
  }

  return data;
};
