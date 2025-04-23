"use client";

import React from "react";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";
import { v4 as uuidv4 } from "uuid";
import SubmitButton from "@/components/SubmitButton";
import FormField from "@/app/(auth)/login/_components/FormField";
import { IForm } from "@/interfaces/my-form.interface";
const MyForm = ({ inputFields, myAction, isPending }: IForm) => {
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
        }: InputFieldsProps) => (
          <FormField
            defaultValue={defaultValue}
            enterTitle={enterTitle}
            errors={errors}
            name={name}
            placeholder={placeholder}
            type={type}
            key={uuidv4()}
          />
        )
      )}
      <SubmitButton>{isPending ? "Submitting..." : "Submit"}</SubmitButton>
    </form>
  );
};

export default MyForm;
