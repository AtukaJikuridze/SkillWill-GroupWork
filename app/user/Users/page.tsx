import React from "react";
import Info from "../../courier/_components/Info";
import DUMMYCOURIERS from "../../courier/_utils/DUMMYCOURIERS";
import WorkingDays from "../../courier/_components/WorkingDays";

// უფრო დეტალურად უნდა ჩავამატოთ user prop
interface CourierInfoProps {
  user: {
    name: string;
    email: string;
    phone?: string;
  };
}

const CourierInfo = ({ user }: CourierInfoProps) => {
  const couriers = DUMMYCOURIERS;
  const courier = couriers[0];

  return (
    <div className="flex flex-col gap-[2rem] my-0 mx-auto w-[70dvw] py-[1rem] px-[2rem] border-2 border-s-black rounded-sm">
      <div>
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
};

export default CourierInfo;
