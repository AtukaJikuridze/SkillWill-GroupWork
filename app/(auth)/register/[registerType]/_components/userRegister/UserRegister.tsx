"use client";

import React, { useActionState } from "react";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";

import MyForm from "@/components/form/MyForm";
import { userRegisterAction } from "@/actions/userRegisterAction";
const UserRegister = () => {
  const [state, action, isPending] = useActionState<Promise<any>, any>(
    userRegisterAction,
    null
  );
  const inputFields: InputFieldsProps[] = [
    {
      name: "firstname",
      type: "text",
      enterTitle: "Enter Firstname:",
      placeholder: "John",
      errors: state?.errors?.firstname,
      defaultValue: state?.values.firstname || "",
    },
    {
      name: "lastname",
      type: "text",
      enterTitle: "Enter Email:",
      placeholder: "Doe",
      errors: state?.errors?.lastname,
      defaultValue: state?.values.lastname || "",
    },
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
      name: "personalId",
      type: "number",
      enterTitle: "Enter personal Id:",
      placeholder: "00000000000",
      errors: state?.errors?.personalId,
      defaultValue: state?.values.personalId || "",
      min: 0,
    },
    {
      name: "phone",
      type: "number",
      enterTitle: "Enter phone number:",
      placeholder: "995 000 000 000",
      errors: state?.errors?.phone,
      defaultValue: state?.values.phone || "",
      min: 0,
    },
  ];

  return (
    <MyForm inputFields={inputFields} isPending={isPending} myAction={action} />
  );
};

export default UserRegister;
