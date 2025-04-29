"use client";
import { deleteRandomUser } from "@/services/admin";
import { useRouter } from "next/navigation";
import React from "react";

interface IDeleteBtn {
  uuid: number;
}

export default function DeleteBtn({ uuid }: IDeleteBtn) {
  const router = useRouter();

  const onDelete = async () => {
    await deleteRandomUser(uuid);
    document.cookie = "uuid=; Max-Age=0; path=/;";
    router.push("register");
  };

  return (
    <button
      onClick={onDelete}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Delete
    </button>
  );
}
