import { ICourier } from "@/interfaces/courier.interface";
import React from "react";
import WorkingDays from "./WorkingDays";

export default function CourierCard({
  courier: { firstName, lastName, pid, workingDays },
}: {
  courier: ICourier;
}) {
  return (
    <div>
      <h1>
        {firstName} {lastName} ({pid})
      </h1>
      <WorkingDays workingDays={workingDays} />
    </div>
  );
}
