import { supabase } from "@/lib/supabase";

export const uploadImg = async (filePath: string, file: File) => {
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatar")
    .upload(filePath, file);

  return { uploadData, uploadError };
};

export const getImg = (filePath: string) => {
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatar").getPublicUrl(filePath);

  return { publicUrl };
};

export const deleteImg = async (filePath: string) => {
  await supabase.storage.from("avatar").remove([filePath]);
};
