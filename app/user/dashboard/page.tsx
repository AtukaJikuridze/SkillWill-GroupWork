"use client";
import React from "react";
import { useUser } from "@/app/user/components/UserContext";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { user, deleteUser } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/register");
    return null;
  }

  const handleDelete = () => {
    deleteUser(); 
    router.push("/register"); 
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">მოგესალმები, {user.name}</h1>
      <p>Email: {user.email}</p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => router.push("/user/edit-profile")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Პროფილის რედაქტირება
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Პროფილის წაშლა
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
