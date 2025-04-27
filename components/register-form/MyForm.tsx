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
      {inputFields.map((field: InputFieldsProps) => (
        <FormField key={uuidv4()} {...field} filePicture={filePicture} />
      ))}
      <SubmitButton>{isPending ? "Submitting..." : "Submit"}</SubmitButton>
    </form>
  );
};

export default MyForm;
