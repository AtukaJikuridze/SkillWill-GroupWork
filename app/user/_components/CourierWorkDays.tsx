"use client";
import { generateTimeSlots } from "@/app/courier/_utils/generateTimeSlots";
import { weekDaysOrder } from "@/app/courier/_utils/weekDayOrder";
import { IWeekDays, IWorkingDay } from "@/interfaces/user.interface";
import React, { useState } from "react";

const hours = generateTimeSlots(0, 24);
interface ICourierWorkDays {
  workingDays: { [key: string]: IWorkingDay[] };
  onBook: (updatedWorkingDays: { [key: string]: IWorkingDay[] }) => void;
}
const CourierWorkDays: React.FC<ICourierWorkDays> = ({
  workingDays,
  onBook,
}) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const toggleDay = (day: string) =>
    setExpandedDay(expandedDay === day ? null : day);
  const sortedDays = Object.keys(workingDays).sort(
    (a, b) =>
      weekDaysOrder.indexOf(a as IWeekDays) -
      weekDaysOrder.indexOf(b as IWeekDays)
  );

  const bookWorkingDay = (
    day: string,
    hoursIndex: number,
    updatedHours: IWorkingDay
  ) => {
    const updatedWorkingDays = { ...workingDays };
    updatedWorkingDays[day] = [...workingDays[day]];
    updatedWorkingDays[day][hoursIndex] = { ...updatedHours, booked: true };
    return updatedWorkingDays;
  };

  return (
    <div className="flex gap-4 overflow-x-auto whitespace-nowrap w-full">
      {sortedDays.map((day) => (
        <div key={day} className="mb-4 min-w-[19rem] inline-block">
          <button
            onClick={() => toggleDay(day)}
            className="w-full border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>

          {expandedDay === day && (
            <div className="p-4 bg-gray-100 mt-2 rounded">
              {workingDays[day as IWeekDays].map((workingDay, index) => (
                <div
                  key={index}
                  className="flex gap-4 mb-2 flex-wrap whitespace-normal"
                >
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <select
                      value={workingDay.startHours}
                      disabled
                      className="w-full bg-gray-200 border border-gray-300 rounded px-2 py-1"
                    >
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <select
                      value={workingDay.endHours}
                      disabled
                      className="w-full bg-gray-200 border border-gray-300 rounded px-2 py-1"
                    >
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() =>
                      onBook(bookWorkingDay(day, index, workingDay))
                    }
                    disabled={workingDay.booked}
                    className={`px-4 py-2 text-white rounded transition text-sm ${
                      workingDay.booked
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default CourierWorkDays;
