import ErrorsList from "@/components/form/ErrorsList";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";
import React from "react";

const FormField = ({
  defaultValue,
  enterTitle,
  errors,
  name,
  placeholder,
  type,
  min,
}: InputFieldsProps) => {
  return (
    <div className="flex flex-col gap-2 mb-3 ">
      <label htmlFor="repeat-password" className="text-xl">
        {enterTitle}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        className={`border px-3 py-2 rounded-md outline-none ${
          errors && "border-red-500"
        }`}
        min={min}
      />
      {errors && <ErrorsList name={name} errors={errors} />}
    </div>
  );
};

export default FormField;
