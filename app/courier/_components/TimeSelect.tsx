import { IWeekDays } from "@/interfaces/courier.interface"; 
import { generateTimeSlots } from "../_utils/generateTimeSlots";
import timeStringToDecimal from "../_utils/timeStringToDecimal";

interface ITimeSelect {
  workingDay: {
    startHours: string;
    endHours: string;
    booked: boolean;
  };
  day: string;
  index: number;
  hours: string[];
  handleStartChange: (
    day: IWeekDays,
    index: number,
    value: string,
    endHours: string
  ) => void;
  handleEndChange: (
    day: IWeekDays,
    index: number,
    startHours: string,
    value: string
  ) => void;
}

export default function TimeSelect({
  workingDay,
  day,
  index,
  hours,
  handleStartChange,
  handleEndChange,
}: ITimeSelect) {
  return (
    <>
      <div className="w-full mb-4">
        <label
          htmlFor={`start-${day}-${index}`}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Start Time
        </label>
        <select
          id={`start-${day}-${index}`}
          value={workingDay.startHours}
          onChange={(e) =>
            handleStartChange(
              day as IWeekDays,
              index,
              e.target.value,
              workingDay.endHours
            )
          }
          disabled={workingDay.booked}
          className={`cursor-pointer w-full border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2`}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor={`end-${day}-${index}`}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          End Time
        </label>
        <select
          id={`end-${day}-${index}`}
          value={workingDay.endHours}
          onChange={(e) =>
            handleEndChange(
              day as IWeekDays,
              index,
              workingDay.startHours,
              e.target.value
            )
          }
          disabled={workingDay.booked}
          className={`cursor-pointer w-full border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 `}
        >
          {generateTimeSlots(timeStringToDecimal(workingDay.startHours), 24)
            .slice(1)
            .map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
