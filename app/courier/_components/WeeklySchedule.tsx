"use client";
import React, { useState } from "react";
import TimeSelect from "./TimeSelect";
import { generateTimeSlots } from "../_utils/generateTimeSlots";
import { weekDaysOrder } from "../_utils/weekDayOrder";
import { IWeekDays, IWorkingDay } from "@/interfaces/courier.interface";

const hours = generateTimeSlots(8, 24);

interface IWeekdaySchedule {
  workingDays: { [key: string]: IWorkingDay[] };
  handleTimeChange: (
    day: IWeekDays,
    index: number,
    startTime: string,
    endTime: string
  ) => void;
  addWorkingDay: (day: IWeekDays) => void;
  deleteWorkingDay: (day: IWeekDays, index: number) => void;
}

export default function WeekdaySchedule({
  workingDays,
  handleTimeChange,
  addWorkingDay,
  deleteWorkingDay,
}: IWeekdaySchedule) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleDay = (day: string) =>
    setExpandedDay(expandedDay === day ? null : day);

  const isOverlapping = (
    newStartTime: string,
    newEndTime: string,
    day: IWeekDays,
    index: number
  ): boolean => {
    if (!index) return false;

    const lastWorkingHour = workingDays[day][index - 1].endHours;
    const nextWorkingHour = workingDays[day][index + 1]?.startHours;
    if (nextWorkingHour && newEndTime >= nextWorkingHour) return true;
    if (newStartTime <= lastWorkingHour) return true;
    return false;
  };

  const handleStartChange = (
    day: IWeekDays,
    index: number,
    newStartTime: string,
    newEndTime: string
  ) => {
    if (isOverlapping(newStartTime, newEndTime, day, index))
      setError("Selected hours overlap with existing hours.");
    else {
      setError(null);
      handleTimeChange(day, index, newStartTime, newEndTime);
    }
  };

  const handleEndChange = (
    day: IWeekDays,
    index: number,
    newStartTime: string,
    newEndTime: string
  ) => {
    if (isOverlapping(newStartTime, newEndTime, day, index))
      setError("Selected hours overlap with existing hours.");
    else {
      setError(null);
      handleTimeChange(day, index, newStartTime, newEndTime);
    }
  };

  const sortedDays = Object.keys(workingDays).sort(
    (a, b) =>
      weekDaysOrder.indexOf(a as IWeekDays) -
      weekDaysOrder.indexOf(b as IWeekDays)
  );

  return (
    <div className="flex flex-col gap-4">
      {sortedDays.map((day) => (
        <div className="relative mb-6" key={day}>
          <button
            type="button"
            onClick={() => toggleDay(day)}
            className="cursor-pointer w-full border border-gray-400  text-gray-800 rounded px-0 py-[6px] hover:bg-gray-100 transition-colors duration-200"
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
          {expandedDay === day && (
            <div className="absolute w-full p-4 bg-gray-100 z-10">
              {workingDays[day as IWeekDays].map((workingDay, index) => (
                <div className="flex items-center gap-4 mb-2" key={index}>
                  <TimeSelect
                    workingDay={workingDay}
                    day={day}
                    index={index}
                    hours={hours}
                    handleStartChange={handleStartChange}
                    handleEndChange={handleEndChange}
                  />
                  <button
                    type="button"
                    onClick={() => deleteWorkingDay(day as IWeekDays, index)}
                    className="cursor-pointer border border-red-500 text-red-600 px-4 py-2 h-9 mt-1 flex items-center rounded hover:bg-red-50 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="relative">
                {error && (
                  <p className="absolute bottom-1 text-xs text-red-500">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => addWorkingDay(day as IWeekDays)}
                className="cursor-pointer border border-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                disabled={
                
                  parseInt(
                    workingDays[day][
                      workingDays[day].length - 1
                    ].endHours.replace(":", ""),
                    10
                  ) >= 2300
                }
              >
                Add Working Hour
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
