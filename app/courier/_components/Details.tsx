import React from "react";
import Info from "./Info";
import WorkingDays from "./WorkingDays";
import { ICourier } from "@/interfaces/user.interface";

export default function Details({ courier }: { courier: ICourier }) {
  const taskPriority = (priority: "High" | "Mid" | "Low") => {
    if (priority === "High") return "border-red-600";
    if (priority === "Mid") return "border-amber-500";
    return "border-emerald-800";
  };

  return (
    <>
      <Info courier={courier} />
      <div>
        <h1>Tasks</h1>
        <div className="flex flex-col border border-b gap-2 p-4 max-h-[200px] overflow-y-auto">
          <div className="grid grid-cols-3 place-items-center text-center">
            <h1>Name</h1>
            <h2>Description</h2>
            <p>Time</p>
          </div>
          {courier.tasks.map(({ name, description, priority, time }) => (
            <div
              key={description}
              className="grid grid-cols-3 place-items-center text-center"
            >
              <h1 className={`w-full border ${taskPriority(priority)} p-2`}>
                {name}
              </h1>
              <h2
                className={`w-full border-t border-b ${taskPriority(
                  priority
                )} p-2`}
              >
                {description}
              </h2>
              <p className={`w-full border ${taskPriority(priority)} p-2`}>
                {time}
              </p>
            </div>
          ))}
          {!courier.tasks.length && (
            <div className="p-2">No Tasks Available . . .</div>
          )}
        </div>
      </div>
      <div>
        <h1>My Schedule</h1>
        <WorkingDays workingDays={courier.workingDays} />
      </div>
    </>
  );
}
