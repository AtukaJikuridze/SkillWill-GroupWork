"use client";

import { authAction } from "@/actions/authAction";
import React, { useActionState } from "react";
import ErrorsList from "./ErrorsList";
import ILoginForm from "@/interfaces/login-form.interface";
import { InputFieldsProps } from "@/interfaces/login/login-form-fields.interface";

const Register = () => {
  const [state, action, isPending] = useActionState<Promise<ILoginForm>>(
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
    <form action={action} className="w-full ">
      {inputFields.map(
        ({
          enterTitle,
          name,
          placeholder,
          type,
          errors,
          defaultValue,
        }: InputFieldsProps) => (
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
        )
      )}
      <button
        type="submit"
        className="border px-5 py-1 mx-auto block w-full cursor-pointer"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Register;
