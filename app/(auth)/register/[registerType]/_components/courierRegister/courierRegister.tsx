"use client";

import React, { useActionState } from "react";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";

import MyForm from "@/components/MyForm";
import { registerAction } from "@/actions/loginAction";
const CourierRegister = () => {
  const [state, action, isPending] = useActionState<Promise<any>, any>(
    registerAction,
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
    <MyForm inputFields={inputFields} isPending={isPending} myAction={action} />
  );
};

export default CourierRegister;
