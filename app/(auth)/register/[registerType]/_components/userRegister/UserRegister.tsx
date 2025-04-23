"use client";
import React, { useActionState, useState } from "react";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";
import MyForm from "@/components/form/MyForm";
import { userRegisterAction } from "@/actions/userRegisterAction";
import useAuth from "@/store/useAuth";

const UserRegister = () => {
  const [state, action, isPending] = useActionState<Promise<any>, any>(
    userRegisterAction,
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
  console.log(file);
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
      enterTitle: "Enter Lastname:",
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
    },
    {
      name: "profilePicture",
      type: "file",
      enterTitle: "Choose Profile Picture",
      placeholder: "Upload image...",
      errors: state?.errors?.profilePicture,
      onChange: handleFileChange,
      file: file as File,
      min: 0,
    },
  ];

  return (
    <>
      <MyForm
        inputFields={inputFields}
        isPending={isPending}
        myAction={action}
        filePicture={picture}
      />
    </>
  );
};

export default UserRegister;
