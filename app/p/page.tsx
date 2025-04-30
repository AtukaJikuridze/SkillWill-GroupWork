// "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@/app/user/components/UserContext"; 
// import { IWorkingDay, IWeekDays } from "@/interfaces/courier.interface";
// import { generateTimeSlots } from "../courier/_utils/generateTimeSlots";
// import WeekdaySchedule from "../courier/_components/WeeklySchedule";
// import WorkingDays from "../courier/_components/WorkingDays";

// // აქვე UserData
// export interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   workingDays?: { [key in IWeekDays]: IWorkingDay[] };
// }

// const hours = generateTimeSlots(8, 24);

// const WorkingDaysPage = () => {
//   const { user } = useUser() as { user: UserData | null }; // <-- აქ ეს!

//   const [workingDays, setWorkingDays] = useState<{ [key in IWeekDays]: IWorkingDay[] }>({
//     monday: [],
//     tuesday: [],
//     wednesday: [],
//     thursday: [],
//     friday: [],
//     saturday: [],
//     sunday: [],
//   });

//   useEffect(() => {
//     if (user?.workingDays) {
//       setWorkingDays((prevState) => ({
//         ...prevState,
//         ...user.workingDays,
//       }));
//     }
//   }, [user]);

//   const handleTimeChange = (
//     day: IWeekDays,
//     index: number,
//     startTime: string,
//     endTime: string
//   ) => {
//     setWorkingDays((prevState) => {
//       const updatedDay = [...(prevState[day] || [])];
//       updatedDay[index] = { startHours: startTime, endHours: endTime, booked: false };
//       return { ...prevState, [day]: updatedDay };
//     });
//   };

//   const addWorkingDay = (day: IWeekDays) => {
//     setWorkingDays((prevState) => {
//       const updatedDay = [...(prevState[day] || [])];
//       updatedDay.push({ startHours: "08:00", endHours: "12:00", booked: false });
//       return { ...prevState, [day]: updatedDay };
//     });
//   };

//   const deleteWorkingDay = (day: IWeekDays, index: number) => {
//     setWorkingDays((prevState) => {
//       const updatedDay = [...(prevState[day] || [])];
//       updatedDay.splice(index, 1);
//       return { ...prevState, [day]: updatedDay };
//     });
//   };

//   if (!user) {
//     return <div className="text-center p-10">Გთხოვთ დარეგისტრირდეთ...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">Მუშაობის განრიგი ({user.name})</h1>

//       <WeekdaySchedule
//         workingDays={workingDays}
//         handleTimeChange={handleTimeChange}
//         addWorkingDay={addWorkingDay}
//         deleteWorkingDay={deleteWorkingDay}
//       />

//       <h2 className="text-lg font-semibold mt-6">შეკვეთის დღე და დრო :</h2>
//       <WorkingDays workingDays={workingDays} />
//     </div>
//   );
// };

// export default WorkingDaysPage;
// "use client";

// import React, { useEffect } from "react";
// import { useUser } from "@/app/user/components/UserContext";
// import { useRouter } from "next/navigation";
// import CourierInfo from "../Users/page";

// const ProfilePage = () => {
//   const { user } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push("/register");
//     }
//   }, [user, router]);

//   if (!user) {
//     return null;  
//   }

//   return (
//     <>
//       <div className="p-6 max-w-xl mx-auto">
//         <h1 className="text-2xl font-bold">Პროფილი</h1>
//         <p><strong>სახელი:</strong> {user.name}</p>
//         <p><strong>ელფოსტა:</strong> {user.email}</p>
//         <p><strong>ტელეფონი:</strong> {user.phone}</p>
//       </div>
//       <CourierInfo user={user} />
//     </>
//   );
// };

// export default ProfilePage;       ეს ინფორმაცია გდაიტანე აქ დინამიურად 
"use client";
import { useEffect, useState } from "react";
import { IWorkingDay, IWeekDays, ICourier } from "@/interfaces/courier.interface";
import { generateTimeSlots } from "../courier/_utils/generateTimeSlots";
import WeekdaySchedule from "../courier/_components/WeeklySchedule";
import WorkingDays from "../courier/_components/WorkingDays";
import DUMMYCOURIERS from "../courier/_utils/DUMMYCOURIERS";

const hours = generateTimeSlots(8, 24);

const WorkingDaysPage = () => {
  const [workingDays, setWorkingDays] = useState<{ [key in IWeekDays]: IWorkingDay[] }>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const couriers: ICourier[] = DUMMYCOURIERS;
  const mainCourier = couriers[0];

  useEffect(() => {
   
    setWorkingDays((prevState) => ({
      ...prevState,
      ...mainCourier.workingDays,
    }));
  }, [mainCourier]);

  const handleTimeChange = (
    day: IWeekDays,
    index: number,
    startTime: string,
    endTime: string
  ) => {
    setWorkingDays((prevState) => {
      const updatedDay = [...(prevState[day] || [])];
      updatedDay[index] = { startHours: startTime, endHours: endTime, booked: false };
      return { ...prevState, [day]: updatedDay };
    });
  };

  const addWorkingDay = (day: IWeekDays) => {
    setWorkingDays((prevState) => {
      const updatedDay = [...(prevState[day] || [])];
      updatedDay.push({ startHours: "08:00", endHours: "12:00", booked: false });
      return { ...prevState, [day]: updatedDay };
    });
  };

  const deleteWorkingDay = (day: IWeekDays, index: number) => {
    setWorkingDays((prevState) => {
      const updatedDay = [...(prevState[day] || [])];
      updatedDay.splice(index, 1);
      return { ...prevState, [day]: updatedDay };
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Working Days Schedule (Main Courier)</h1>

      <WeekdaySchedule
        workingDays={workingDays}
        handleTimeChange={handleTimeChange}
        addWorkingDay={addWorkingDay}
        deleteWorkingDay={deleteWorkingDay}
      />

      <h2 className="text-lg font-semibold mt-6">შეკვეთის დღე და დრო :</h2>
      <WorkingDays workingDays={workingDays} />

      <h2 className="text-lg font-semibold mt-10">Couriers</h2>
      {couriers
        .filter((courier) => courier._uuid !== mainCourier._uuid)
        .map((courier) => (
          <div key={courier._uuid} className="mt-6">
            <h3 className="font-semibold text-md mb-2">
              {courier.firstName} {courier.lastName} ({courier.pid})
            </h3>
            <WorkingDays workingDays={courier.workingDays} />
          </div>
        ))}
    </div>
  );
};

export default WorkingDaysPage;