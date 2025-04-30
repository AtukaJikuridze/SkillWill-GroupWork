"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/user/components/UserContext";
import { useRouter } from "next/navigation";

const EditProfilePage = () => {
  const { user, updateUser, deleteUser } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form);
    router.push("/user/profile");
  };

  const handleDelete = () => {
    deleteUser();
    router.push("/register");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Პროფილის რედაქტირება</h1>
      <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">განახლება</button>
      <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">პროფილის წაშლა</button>
    </form>
  );
};

export default EditProfilePage;
