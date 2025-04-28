import React from "react";
import CourierCard from "./CourierCard";
import { ICourier } from "@/interfaces/user.interface";

export default function CourierList({ couriers }: { couriers: ICourier[] }) {
  return (
    <div className="flex flex-col gap-4">
      {couriers.length ? (
        couriers.map((courier) => (
          <CourierCard key={courier._uuid} courier={courier} />
        ))
      ) : (
        <p>No Couriers Found!</p>
      )}
    </div>
  );
}
