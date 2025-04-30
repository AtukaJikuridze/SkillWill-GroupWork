"use client";
import React from "react";

export default function LogoutBtn() {
  const handleLogout = () => {
    document.cookie = "uuid=; Max-Age=0; path=/;";
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
