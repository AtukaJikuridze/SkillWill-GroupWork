import { InputFieldsProps } from "@/interfaces/login/login-form-fields.interface";
import React from "react";
import ErrorsList from "./ErrorsList";

const FormField = ({
  defaultValue,
  enterTitle,
  errors,
  name,
  placeholder,
  type,
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
      />
      {errors && <ErrorsList errors={errors} />}
    </div>
  );
};

export default FormField;
