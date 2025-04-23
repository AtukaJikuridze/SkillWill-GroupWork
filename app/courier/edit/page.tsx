"use client";
import { ICourier } from "@/app/_interfaces/courier.interface";
import { useState } from "react";
import CourierForm from "../_components/Form";
import { checkMinimumWorkingDays } from "../_utils/checkMinimumWorkingDays";
import DUMMYCOURIERS from "../_utils/DUMMYCOURIERS";

export default function EditPage() {
  const courier = DUMMYCOURIERS[0];
  const [courierData, setCourierData] = useState<ICourier>({ ...courier });

  const handleFormSubmit = (
    updatedData: Record<string, string | number | File>
  ) => {
    const updatedCourier = {
      ...courierData,
      ...updatedData,
      workingDays: courierData.workingDays,
    };
    console.log(updatedCourier);
    // submit courier to API
    // onSubmit(updatedCourier);
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
            courier={courierData}
            handleWorkingDaysUpdate={handleWorkingDaysUpdate}
          />
        </div>
      </div>
    </div>
  );
}
