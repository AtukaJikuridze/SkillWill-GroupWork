"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function EditBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/admin/edit")}
      className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Edit
    </button>
  );
}
