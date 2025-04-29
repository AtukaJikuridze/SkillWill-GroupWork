"use client";
import React, { useState } from "react";
import { IUser, ICourier } from "@/interfaces/user.interface";
import UserList from "./UserList";
import CourierList from "./CourierList";

interface IClientSelector {
  users: IUser[];
  couriers: ICourier[];
}

export default function ClientSelector({ users, couriers }: IClientSelector) {
  const [selectedPage, setSelectedPage] = useState("users");

  return (
    <div className="max-w-[80rem] flex flex-col mx-auto gap-4">
      <div className="mx-auto space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setSelectedPage("users")}
        >
          Users
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setSelectedPage("couriers")}
        >
          Couriers
        </button>
      </div>

      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto px-4">
          {selectedPage === "users" && (
            <UserList users={users} couriers={couriers} />
          )}
          {selectedPage === "couriers" && <CourierList couriers={couriers} />}
        </div>
      </main>
    </div>
  );
}
