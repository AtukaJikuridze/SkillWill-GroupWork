import React from "react";
import { ICourier } from "@/interfaces/courier.interface";
import Info from "./Info";
import WorkingDays from "./WorkingDays";

export default function Details({ courier }: { courier: ICourier }) {
  console.log(courier.workingDays);
  return (
    <>
      <Info courier={courier} />
      <div>
        <h1>My Schedule</h1>
        <WorkingDays workingDays={courier.workingDays} />
      </div>
    </>
  );
}
