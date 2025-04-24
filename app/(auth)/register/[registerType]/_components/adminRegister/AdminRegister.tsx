"use client";

import React, { useActionState, useState } from "react";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";

import MyForm from "@/components/form/MyForm";
import { adminRegisterAction } from "@/actions/register-actions/adminRegisterAction";
import useAuth from "@/store/useAuth";
const AdminRegister = () => {
  const [state, action, isPending] = useActionState<Promise<any>, any>(
    adminRegisterAction,
    null
  );
  const { selectedProfilePicture, setSelectedProfilePicture } = useAuth();
  const [file, setFile] = useState<File | null>(
    selectedProfilePicture ? selectedProfilePicture : null
  );
  const [picture, setPicture] = useState(null);

  const drawPicture = (selectedFile: File | null) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result as any);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setSelectedProfilePicture(selectedFile);
    drawPicture(selectedFile);
  };

  const inputFields: InputFieldsProps[] = [
    {
      name: "firstname",
      type: "text",
      enterTitle: "Enter Firstname:",
      placeholder: "John",
      errors: state?.errors?.firstname,
      defaultValue: state?.values.firstname || "",
      autoComplete: "given-name",
    },
    {
      name: "lastname",
      type: "text",
      enterTitle: "Enter Lastname (optional)",
      placeholder: "Doe",
      errors: state?.errors?.lastname,
      defaultValue: state?.values.lastname || "",
      autoComplete: "family-name",
    },
    {
      name: "email",
      type: "email",
      enterTitle: "Enter Email:",
      placeholder: "johndoe@gmail.com",
      errors: state?.errors?.email,
      defaultValue: state?.values.email || "",
      autoComplete: "email",
    },
    {
      name: "password",
      type: "password",
      enterTitle: "Enter Password:",
      placeholder: "**********",
      errors: state?.errors?.password,
      defaultValue: state?.values.password || "",
      autoComplete: "new-password",
    },
    {
      name: "personalId",
      type: "number",
      enterTitle: "Enter Personal Id:",
      placeholder: "00000000000",
      errors: state?.errors?.personalId,
      defaultValue: state?.values.personalId || "",
      min: 0,
    },
    {
      name: "phone",
      type: "number",
      enterTitle: "Enter Phone Number:",
      placeholder: "995 000 000 000",
      errors: state?.errors?.phone,
      defaultValue: state?.values.phone || "",
      min: 0,
      autoComplete: "tel",
    },
    {
      name: "profilePicture",
      type: "file",
      enterTitle: "Choose Profile Picture (optional)",
      errors: state?.errors?.profilePicture,
      onChange: handleFileChange,
      file: file as File,
    },
  ];

  return (
    <MyForm
      inputFields={inputFields}
      isPending={isPending}
      myAction={action}
      filePicture={picture}
    />
  );
};

export default AdminRegister;
