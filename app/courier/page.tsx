"use client";
import React, { useEffect, useState } from "react";
import { getCouriers } from "@/services/courier";
import CourierSearch from "./_components/CourierSearch";
import { ICourier } from "@/interfaces/courier.interface";

import CourierList from "./_components/CourierList";
import DUMMYCOURIERS from "./_utils/DUMMYCOURIERS";
import Details from "./_components/Details";

export default function CourierPage() {
  const [couriers, setCouriers] = useState<ICourier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCouriers = async () => {
      const data = await getCouriers();
      setCouriers(data);
      setLoading(false);
    };

    fetchCouriers();
  }, []);

  const searchCouriers = (newCouriers: ICourier[]) => {
    setCouriers(newCouriers);
  };

  const courier = DUMMYCOURIERS[0] as ICourier;

  return (
    <div className="flex flex-col gap-[2rem] my-0 mx-auto w-[70dvw] py-[1rem] px-[2rem] border-2 border-s-black rounded-sm">
      <Details courier={courier} />
      <CourierSearch setCouriers={searchCouriers} />
      {loading ? (
        <p>Loading couriers...</p>
      ) : !couriers.length ? (
        <p>Couldn Find Any Couriers</p>
      ) : (
        <>
          <CourierList
            couriers={couriers.filter(({ _uuid }) => courier._uuid !== _uuid)}
          />
        </>
      )}
    </div>
  );
}
