import React from "react";
import { getCourier, getCouriers } from "@/services/courier";
import Details from "./_components/Details";
import { cookies } from "next/headers";
import CouriersDisplay from "./_components/CouriersDisplay";

export default async function CourierPage() {
  const cookieStore = await cookies();
  const uuid = cookieStore.get("uuid")?.value;
  const courier = await getCourier(uuid as string);
  const couriers = await getCouriers();

  return (
    <div className="flex flex-col gap-[2rem] my-0 mx-auto w-[70dvw] py-[1rem] px-[2rem] border-2 border-s-black rounded-sm">
      <Details courier={courier} />
      <CouriersDisplay couriers={couriers} />
    </div>
  );
}
