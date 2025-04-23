"use client";

import { authAction } from "@/actions/authAction";
import React, { useActionState } from "react";
import { InputFieldsProps } from "@/interfaces/login/login-form-fields.interface";
import { v4 as uuidv4 } from "uuid";
import FormField from "../../../_components/FormField";
import SubmitButton from "@/components/SubmitButton";
const AdminRegister = () => {
  const [state, action, isPending] = useActionState<Promise<any>, any>(
    authAction,
    null
  );

  const inputFields: InputFieldsProps[] = [
    {
      name: "email",
      type: "email",
      enterTitle: "Enter Email:",
      placeholder: "johndoe@gmail.com",
      errors: state?.errors?.email,
      defaultValue: state?.values.email || "",
    },
    {
      name: "password",
      type: "password",
      enterTitle: "Enter Password:",
      placeholder: "**********",
      errors: state?.errors?.password,
      defaultValue: state?.values.password || "",
    },
  ];

  return (
    <form action={action} className="w-full">
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

export default AdminRegister;
