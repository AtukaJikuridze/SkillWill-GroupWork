import { ICourier, IWeekDays } from "@/interfaces/courier.interface";
import WeekdaySchedule from "@/app/courier/_components/WeeklySchedule";
import { checkMinimumWorkingDays } from "@/app/courier/_utils/checkMinimumWorkingDays";
import React from "react";

interface IWorkingDaysInput {
  courier: ICourier;
  handleWorkingDaysUpdate: (updatedCourier: ICourier) => void;
}

export default function WorkingDaysInput({
  courier,
  handleWorkingDaysUpdate,
}: IWorkingDaysInput) {
  const handleTimeChange = (
    day: IWeekDays,
    index: number,
    startTime: string,
    endTime: string
  ) => {
    const updatedWorkingDays = {
      ...courier.workingDays,
      [day]: [...courier.workingDays[day]],
    };

    updatedWorkingDays[day][index] = {
      startHours: startTime,
      endHours: endTime,
      booked: false,
    };

    handleWorkingDaysUpdate({ ...courier, workingDays: updatedWorkingDays });
  };

  const addThirtySeconds = (time: string) => {
    let [startHours, startMinutes] = time.split(":").map(Number);

    startMinutes += 30;

    if (startMinutes >= 60) {
      startMinutes -= 60;
      startHours += 1;
    }

    if (startHours >= 24) startHours = 0;

    return `${startHours.toString().padStart(2, "0")}:${startMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  const addWorkingDay = (day: IWeekDays) => {
    const lastWorkingDay =
      courier.workingDays[day]?.length > 0
        ? courier.workingDays[day][courier.workingDays[day].length - 1].endHours
        : "23:30";
    const newStartHours = addThirtySeconds(lastWorkingDay);
    const newEndHours = addThirtySeconds(newStartHours);

    const updatedWorkingDays = {
      ...courier.workingDays,
      [day]: [
        ...courier.workingDays[day],
        {
          startHours: newStartHours,
          endHours: newEndHours,
          booked: false,
        },
      ],
    };

    handleWorkingDaysUpdate({ ...courier, workingDays: updatedWorkingDays });
  };

  const deleteWorkingDay = (day: IWeekDays, index: number) => {
    const updatedWorkingDays = {
      ...courier.workingDays,
      [day]: courier.workingDays[day].filter((_, idx) => idx !== index),
    };
    handleWorkingDaysUpdate({ ...courier, workingDays: updatedWorkingDays });
  };

  return (
    <div className="w-[1000px]">
      <div className="flex flex-col gap-4 mt-6 h-full">
        <WeekdaySchedule
          workingDays={courier.workingDays}
          handleTimeChange={handleTimeChange}
          addWorkingDay={addWorkingDay}
          deleteWorkingDay={deleteWorkingDay}
        />
      </div>
      {!checkMinimumWorkingDays(courier.workingDays) && (
        <p className="text-[#fb1010]">Please Add Atleast 5 working Days</p>
      )}
    </div>
  );
}
