
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
  onClick,
  value,
  autoComplete,
  isReadOnly,
}: InputFieldsProps) => {
  const className = `border px-3 py-2 rounded-md outline-none ${
    errors && "border-red-500"
  }
  ${onClick ? "cursor-pointer transition-all hover:bg-blue-100 " : ""}
  `;

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
        className={className}
        min={min}
        onClick={onClick}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        readOnly={isReadOnly}
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
    </div>
  );
};

export default FormField;
