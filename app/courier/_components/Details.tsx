import React from "react";
import Info from "./Info";
import WorkingDays from "./WorkingDays";
import { ICourier } from "@/interfaces/user.interface";

export default function Details({ courier }: { courier: ICourier }) {
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
