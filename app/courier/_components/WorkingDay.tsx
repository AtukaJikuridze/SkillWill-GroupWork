import React from "react";

interface IWorkingDay {
  startHours: string;
  endHours: string;
  booked: boolean;
}

export default function WorkingDay({
  startHours,
  endHours,
  booked,
}: IWorkingDay) {
  return (
    <>
      <td className="text-center px-4 py-2">
        {startHours} - {endHours}
      </td>
      <td className="text-center px-4 py-2">
        {booked ? "Booked" : "Available"}
      </td>
    </>
  );
}
