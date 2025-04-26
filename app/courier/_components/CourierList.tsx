import { ICourier } from "@/interfaces/courier.interface";
import React from "react";
import CourierCard from "./CourierCard";

export default function CourierList({ couriers }: { couriers: ICourier[] }) {
  return (
    <>
      {couriers.map((courier) => (
        <CourierCard key={courier._uuid} courier={courier} />
      ))}
    </>
  );
}
