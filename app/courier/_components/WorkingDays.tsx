import { IWorkingDays } from "@/interfaces/courier.interface";
import { weekDaysOrder } from "../_utils/weekDayOrder";
import WorkingDay from "./WorkingDay";

export default function WorkingDays({
  workingDays,
}: {
  workingDays: IWorkingDays;
}) {
  const sortedWorkingDays = weekDaysOrder.map((day) => {
    return {
      day,
      data: workingDays[day] || [],
    };
  });

  return (
    <div className="w-full border border-gray-400 rounded-sm ">
      <div className="max-h-[300px] overflow-y-scroll scrollbar-none touch-auto">
        <table className="min-w-full" aria-label="working days table">
          <thead>
            <tr>
              <th className="text-center font-bold">Day</th>
              <th className="text-center font-bold">Hours</th>
              <th className="text-center font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedWorkingDays.map(({ day, data }) =>
              data.map(({ startHours, endHours, booked }) => (
                // key later
                <tr key={startHours}>
                  <td className="text-center">{day}</td>
                  <WorkingDay
                    startHours={startHours}
                    endHours={endHours}
                    booked={booked}
                  />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
