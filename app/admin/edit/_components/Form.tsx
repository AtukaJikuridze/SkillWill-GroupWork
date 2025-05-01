"use client";
import BaseForm, { Field } from "@/components/form/BaseForm";
import { updateRandomUser } from "@/services/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IAdmin } from "@/interfaces/user.interface";

const fields = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    required: true,
  },
  { name: "pid", label: "Pid", type: "number", required: true },
  { name: "password", label: "Password", type: "password", required: true },
  {
    name: "profileImage",
    label: "Profile Image",
    type: "file",
    required: false,
  },
] as Field[];

interface IForm {
  admin: IAdmin;
}

export default function AdminForm({ admin }: IForm) {
  const [adminData, setAdminData] = useState<IAdmin>(admin);
  const router = useRouter();

  const handleFormSubmit = async (
    updatedData: Record<string, string | number | File>
  ) => {
    const updatedAdmin = {
      ...adminData,
      ...updatedData,
    };
    await updateRandomUser(updatedAdmin as IAdmin);
    router.push("/admin");
  };

  const handleWorkingDaysUpdate = (updatedAdmin: IAdmin) =>
    setAdminData(updatedAdmin);

  return (
    <div className="flex">
      <BaseForm
        fields={fields}
        onSubmit={handleFormSubmit}
        defaultValues={
          adminData as unknown as Record<string, string | number | File>
        }
        handleWorkingDaysUpdate={handleWorkingDaysUpdate}
        className="py-4 px-0 ml-0"
      />
    </div>
  );
}
