"use client";
import BaseForm, { Field } from "@/components/form/BaseForm";
import { updateCourier } from "@/services/courier";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { checkMinimumWorkingDays } from "../../_utils/checkMinimumWorkingDays";
import { ICourier } from "@/interfaces/user.interface";

const fields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
  },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    required: true,
  },
  { name: "pid", label: "PID", type: "number", required: true },
  {
    name: "vehicle",
    label: "Vehicle",
    type: "text",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    name: "profileImage",
    label: "Profile Image",
    type: "file",
  },
] as Field[];

interface IForm {
  courier: ICourier;
}

export default function CourierForm({ courier }: IForm) {
  const [courierData, setCourierData] = useState<ICourier>(courier);
  const router = useRouter();

  const handleFormSubmit = async (
    updatedData: Record<string, string | number | File>
  ) => {
    const updatedCourier = {
      ...courierData,
      ...updatedData,
      workingDays: courierData.workingDays,
    };
    await updateCourier(updatedCourier as ICourier);
    router.push("/courier");
  };

  const handleWorkingDaysUpdate = (updatedCourier: ICourier) =>
    setCourierData(updatedCourier);

  return (
    <BaseForm
      fields={fields}
      onSubmit={handleFormSubmit}
      defaultValues={
        courierData as unknown as Record<string, string | number | File>
      }
      canSubmit={!checkMinimumWorkingDays(courierData.workingDays)}
      courier={courierData}
      handleWorkingDaysUpdate={handleWorkingDaysUpdate}
      className="py-4 px-0 ml-0"
    />
  );
}
