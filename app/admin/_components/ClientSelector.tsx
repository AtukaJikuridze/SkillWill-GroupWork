"use client";
import React, { useState } from "react";
import { IUser, ICourier, IAdmin } from "@/interfaces/user.interface";
import UserList from "./UserList";
import CourierList from "./CourierList";
import AdminDashboard from "./AdminDashboard";

interface IClientSelector {
  users: IUser[];
  couriers: ICourier[];
  admin: IAdmin;
}

export default function ClientSelector({
  users,
  couriers,
  admin,
}: IClientSelector) {
  const [selectedPage, setSelectedPage] = useState("admin");

  return (
    <div className="max-w-[80rem] flex flex-col mx-auto gap-4">
      <div className="mx-auto space-x-4">
        <button
          onClick={() => setSelectedPage("admin")}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Admin
        </button>
        <button
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setSelectedPage("users")}
        >
          Users
        </button>
        <button
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setSelectedPage("couriers")}
        >
          Couriers
        </button>
      </div>

      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto px-4">
          {selectedPage === "admin" && <AdminDashboard admin={admin} />}
          {selectedPage === "users" && (
            <UserList users={users} couriers={couriers} />
          )}
          {selectedPage === "couriers" && <CourierList couriers={couriers} />}
        </div>
      </main>
    </div>
  );
}
