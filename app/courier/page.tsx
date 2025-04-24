import React from "react";
import Info from "./_components/Info";
import WorkingDays from "./_components/WorkingDays";
import DUMMYCOURIERS from "./_utils/DUMMYCOURIERS";

export default function CourierPage() {
  const couriers = DUMMYCOURIERS;
  const courier = couriers[0];

  return (
    <div className="flex flex-col gap-[2rem] my-0 mx-auto w-[70dvw] py-[1rem] px-[2rem] border-2 border-s-black rounded-sm">
      <Info courier={courier} />
      <div>
        <h1>My Schedule</h1>
        <WorkingDays workingDays={courier.workingDays} />
      </div>
      {couriers
        .filter(({ _uuid }) => courier._uuid !== _uuid)
        .map(({ _uuid, firstName, lastName, pid, workingDays }) => (
          <div key={_uuid}>
            <h1>
              {firstName} {lastName} ({pid})
            </h1>
            <WorkingDays workingDays={workingDays} />
          </div>
        ))}
    </div>
  );
}
