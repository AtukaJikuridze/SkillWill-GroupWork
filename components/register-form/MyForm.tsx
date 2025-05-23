"use client";

import React from "react";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";
import { v4 as uuidv4 } from "uuid";
import SubmitButton from "@/components/SubmitButton";
import { IForm } from "@/interfaces/my-form.interface";
import FormField from "./FormField";
const MyForm = ({ inputFields, myAction, isPending, filePicture }: IForm) => {
  return (
    <form action={myAction} className="w-full">
      {inputFields.map(
        ({
          enterTitle,
          name,
          placeholder,
          type,
          errors,
          defaultValue,
          value,
          min,
          onChange,
          file,
          onClick,
          isReadOnly,
        }: InputFieldsProps) => (
          <FormField
            defaultValue={defaultValue}
            value={value}
            enterTitle={enterTitle}
            errors={errors}
            name={name}
            placeholder={placeholder}
            type={type}
            key={uuidv4()}
            min={min}
            onChange={onChange}
            file={file}
            filePicture={filePicture}
            onClick={onClick}
            isReadOnly={isReadOnly}
          />
        )
      )}
      <SubmitButton>{isPending ? "Submitting..." : "Submit"}</SubmitButton>
    </form>
  );
};

export default MyForm;
