"use client";
import React, { useState } from "react";
import CourierSearch from "./CourierSearch";
import CourierList from "./CourierList";
import { ICourier } from "@/interfaces/user.interface";

interface ICouriersDisplay {
  couriers: ICourier[];
}

export default function CouriersDisplay({ couriers }: ICouriersDisplay) {
  const [couriersData, setCouriersData] = useState<ICourier[]>(couriers);

  const searchCouriers = (newCouriers: ICourier[]) =>
    setCouriersData(newCouriers);

  return (
    <div className="flex flex-col border border-black p-4 gap-4">
      <CourierSearch setCouriers={searchCouriers} />
      <CourierList couriers={couriersData} />
    </div>
  );
}
