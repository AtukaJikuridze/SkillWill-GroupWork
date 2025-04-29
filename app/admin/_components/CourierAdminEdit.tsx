"use client";
import WeekdaySchedule from "@/app/courier/_components/WeeklySchedule";
import { ICourier, IWeekDays } from "@/interfaces/user.interface";
import { updateRandomUser } from "@/services/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ICourierAdminEdit {
  courier: ICourier;
  onSubmit: (updatedCourier: ICourier) => void;
}
const CourierAdminEdit = ({ courier }: ICourierAdminEdit) => {
  const [courierData, setCourierData] = useState<ICourier>({ ...courier });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleTimeChange = (
    day: IWeekDays,
    index: number,
    startTime: string,
    endTime: string
  ) => {
    const updatedWorkingDays = {
      ...courierData.workingDays,
      [day]: [...courierData.workingDays[day]],
    };
    updatedWorkingDays[day][index] = {
      startHours: startTime,
      endHours: endTime,
      booked: false,
    };
    setCourierData({ ...courierData, workingDays: updatedWorkingDays });
  };

  const addWorkingDay = (day: IWeekDays) => {
    const lastWorkingDay =
      courierData.workingDays[day]?.length > 0
        ? courierData.workingDays[day][courierData.workingDays[day].length - 1]
            .endHours
        : "23:30";
    const newStartHours = addThirtySeconds(lastWorkingDay);
    const newEndHours = addThirtySeconds(newStartHours);
    const updatedWorkingDays = {
      ...courierData.workingDays,
      [day]: [
        ...courierData.workingDays[day],
        {
          startHours: newStartHours,
          endHours: newEndHours,
          booked: false,
        },
      ],
    };
    setCourierData({ ...courierData, workingDays: updatedWorkingDays });
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

  const deleteWorkingDay = (day: IWeekDays, index: number) => {
    const updatedWorkingDays = {
      ...courierData.workingDays,
      [day]: courierData.workingDays[day].filter((_, idx) => idx !== index),
    };
    setCourierData({ ...courierData, workingDays: updatedWorkingDays });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await updateRandomUser(courierData);
      router.push("/admin");
    } catch {
      setError("Error saving changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h6 className="text-lg font-semibold mb-2">
            Edit Working Days for {courier.firstName} {courier.lastName}
          </h6>
          <WeekdaySchedule
            workingDays={courierData.workingDays}
            handleTimeChange={handleTimeChange}
            addWorkingDay={addWorkingDay}
            deleteWorkingDay={deleteWorkingDay}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-600">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};
export default CourierAdminEdit;
