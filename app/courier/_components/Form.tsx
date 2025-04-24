import BaseForm, { Field } from "@/app/_components/form/BaseForm";
import { ICourier } from "@/app/_interfaces/courier.interface";

interface IForm {
  formData: Record<string, string | number | File>;
  handleFormSubmit: (
    updatedData: Record<string, string | number | File>
  ) => void;
  courier?: ICourier;
  handleWorkingDaysUpdate?: (updatedCourier: ICourier) => void;
  canSubmit: boolean;
}

export default function CourierForm({
  formData,
  handleFormSubmit,
  canSubmit,
  courier,
  handleWorkingDaysUpdate,
}: IForm) {
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

  return (
    <BaseForm
      fields={fields}
      onSubmit={handleFormSubmit}
      defaultValues={
        formData as unknown as Record<string, string | number | File>
      }
      canSubmit={canSubmit}
      courier={courier}
      handleWorkingDaysUpdate={handleWorkingDaysUpdate}
      className="py-4 px-0 ml-0"
    />
  );
}
