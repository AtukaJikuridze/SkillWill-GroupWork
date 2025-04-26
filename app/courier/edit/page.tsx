"use client";
import { useState } from "react";
import CourierForm from "./_components/Form";
import { checkMinimumWorkingDays } from "../_utils/checkMinimumWorkingDays";
import { IBaseCourier, ICourier } from "@/interfaces/courier.interface";
import DUMMYCOURIERS from "../_utils/DUMMYCOURIERS";
<<<<<<< HEAD
import { updateCourier } from "@/services/courier";
=======
import { ICourier } from "@/interfaces/courier.interface";
>>>>>>> 6b1430efc1f0da104b0088e99e47d71cb10caf3f

export default function EditPage() {
  const courier = DUMMYCOURIERS[0];
  const [courierData, setCourierData] = useState<IBaseCourier>({ ...courier });

  const handleFormSubmit = (
    updatedData: Record<string, string | number | File>
  ) => {
    const updatedCourier = {
      ...courierData,
      ...updatedData,
      workingDays: courierData.workingDays,
    };
    updateCourier(updatedCourier as ICourier);
  };

  const handleWorkingDaysUpdate = (updatedCourier: ICourier) =>
    setCourierData(updatedCourier);

  return (
    <div className="max-w-[1200px] mx-auto p-2">
      <div className="flex mx-auto justify-center">
        <div className="w-[1000px]">
          <h6>Edit Courier Information</h6>
          <CourierForm
            formData={
              courierData as unknown as Record<string, string | number | File>
            }
            handleFormSubmit={handleFormSubmit}
            canSubmit={!checkMinimumWorkingDays(courierData.workingDays)}
            courier={courierData as ICourier}
            handleWorkingDaysUpdate={handleWorkingDaysUpdate}
          />
        </div>
      </div>
    </div>
  );
}
