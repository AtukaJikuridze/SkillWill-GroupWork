import React from "react";
import WorkingDays from "./WorkingDays";
import { ICourier } from "@/interfaces/user.interface";

export default function CourierCard({
  courier: { firstName, lastName, pid, workingDays },
}: {
  courier: ICourier;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-[#fcfbbcfd] text-center border border-black border-b-0 p-2">
        <h1>
          {firstName} {lastName} ({pid})
        </h1>
      </div>

      <WorkingDays workingDays={workingDays} />
    </div>
  );
}
