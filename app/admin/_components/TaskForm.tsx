import { generateTimeSlots } from "@/app/courier/_utils/generateTimeSlots";
import BaseForm, { Field } from "@/components/form/BaseForm";
import { ICourier, ITask } from "@/interfaces/user.interface";
import { updateCourier } from "@/services/courier";
import React from "react";

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    required: true,
  },
  {
    name: "time",
    label: "Time",
    type: "select",
    options: generateTimeSlots(0.5, 24),
    required: true,
  },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: ["Low", "Mid", "High"],
    required: true,
  },
] as Field[];

export default function TaskForm({
  onTaskSubmit,
  courier,
}: {
  onTaskSubmit: () => void;
  courier: ICourier;
}) {
  const handleFormSubmit = async (
    formData: Record<string, string | number | File>
  ) => {
    try {
      const res = await updateCourier({
        ...courier,
        tasks: [...courier.tasks, formData as unknown as ITask],
      });
      onTaskSubmit();
      if (!res) console.log("Error submitting form");
    } catch (error) {
      onTaskSubmit();
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      <div>
        <h1 className="font-bold text-xl">
          Add Task ({courier.firstName} {courier.lastName})
        </h1>
      </div>

      <BaseForm
        fields={fields}
        defaultValues={{
          name: "",
          description: "",
          time: "00:30",
          priority: "Low",
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
