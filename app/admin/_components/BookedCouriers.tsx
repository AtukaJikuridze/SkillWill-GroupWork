import { ICourier } from "@/interfaces/user.interface";
import React from "react";

interface IBookedCouriers {
  couriers: ICourier[];
}

export default function BookedCouriers({ couriers }: IBookedCouriers) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">User Details</h2>
      <h3 className="text-md font-semibold mb-2">Requested Couriers:</h3>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Courier Name</th>
            <th className="p-3 border">Vehicle</th>
            <th className="p-3 border">Working Days</th>
          </tr>
        </thead>
        <tbody>
          {couriers.map((courier) => (
            <tr key={courier._uuid} className="border-t">
              <td className="p-3 border">
                {courier.firstName} {courier.lastName}
              </td>
              <td className="p-3 border">{courier.vehicle}</td>
              <td className="p-3 border space-y-1">
                {Object.keys(courier.workingDays)
                  .filter((day) =>
                    courier.workingDays[day].some((wd) => wd.booked)
                  )
                  .map((day) => {
                    const dayName = day.charAt(0).toUpperCase() + day.slice(1);
                    return (
                      <div key={day}>
                        <strong>{dayName}:</strong>{" "}
                        {courier.workingDays[day]
                          .filter((wd) => wd.booked)
                          .map((wd, index) => (
                            <div key={index}>
                              {wd.startHours} - {wd.endHours}
                            </div>
                          ))}
                      </div>
                    );
                  })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
