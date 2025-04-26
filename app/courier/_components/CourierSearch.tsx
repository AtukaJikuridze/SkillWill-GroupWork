"use client";
import React, { useState } from "react";
import { searchCouriers } from "@/services/courier";
import { ICourier } from "@/interfaces/courier.interface";

export default function CourierSearch({
  setCouriers,
}: {
  setCouriers: (couriers: ICourier[]) => void;
}) {
  const [searchText, setSearchText] = useState("");

  const onSearch = async () => {
    const couriers = await searchCouriers(searchText);
    setCouriers(couriers);
  };

  return (
    <div className="flex">
      <input
        className="bg-[#fcfbbcfd] border-none w-sm p-2 focus:bg-[#fcfbbc]"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && onSearch()}
        placeholder="Search"
      />

      <button
        className="cursor-pointer bg-[#f93e00b8] border-none py-2 px-4 hover:bg-[#f93e00] transition duration-400 active:translate-y-[0.5px]"
        onClick={onSearch}
      >
        <p>Search</p>
      </button>
    </div>
  );
}
