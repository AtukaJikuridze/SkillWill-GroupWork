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
  onChange,
  file,
  filePicture,
}: InputFieldsProps) => {
  return (
    <div className="flex flex-col gap-2 mb-2 ">
      <label htmlFor="repeat-password" className="text-lg">
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
        onChange={onChange}
      />
      {file && filePicture && (
        <div className="flex h-20 gap-5">
          <p>{file.name}</p>
          <img
            src={filePicture}
            alt={file.name}
            className="w-[100px] object-cover h-[80px]"
          />
        </div>
      )}
      {errors && <ErrorsList name={name} errors={errors} />}
    </div>
  );
};

export default FormField;
