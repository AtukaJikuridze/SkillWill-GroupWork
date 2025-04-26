"use client";
import React, { useActionState, useState, useRef, useEffect } from "react";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";
import { userRegisterAction } from "@/actions/register-actions/userRegisterAction";
import useAuth from "@/store/useAuth";
import useApp from "@/store/useApp";
import MyForm from "@/components/register-form/MyForm";

const UserRegister = () => {
  const [state, action, isPending] = useActionState<Promise<any>, any>(
    userRegisterAction,
    null
  );
  const stateRef = useRef<any>(null);
  const coordinates = useAuth((state) => state.coordinates);

  useEffect(() => {
    if (state !== null) {
      stateRef.current = state;
      console.log(state);
    }
  }, [state, coordinates]);

  const currentState = state || stateRef.current;

  const setModal = useApp((state) => state.setModal);

  const selectedProfilePicture = useAuth(
    (state) => state.selectedProfilePicture
  );
  const setSelectedProfilePicture = useAuth(
    (state) => state.setSelectedProfilePicture
  );

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
      errors: currentState?.errors?.firstname,
      defaultValue: currentState?.values?.firstname || "",
      autoComplete: "given-name",
    },
    {
      name: "lastname",
      type: "text",
      enterTitle: "Enter Lastname (optional)",
      placeholder: "Doe",
      errors: currentState?.errors?.lastname,
      defaultValue: currentState?.values?.lastname || "",
      autoComplete: "family-name",
    },
    {
      name: "email",
      type: "email",
      enterTitle: "Enter Email:",
      placeholder: "johndoe@gmail.com",
      errors: currentState?.errors?.email,
      defaultValue: currentState?.values?.email || "",
      autoComplete: "email",
    },
    {
      name: "password",
      type: "password",
      enterTitle: "Enter Password:",
      placeholder: "**********",
      errors: currentState?.errors?.password,
      defaultValue: currentState?.values?.password || "",
      autoComplete: "new-password",
    },
    {
      name: "personalId",
      type: "number",
      enterTitle: "Enter Personal Id:",
      placeholder: "00000000000",
      errors: currentState?.errors?.personalId,
      defaultValue: currentState?.values?.personalId || "",
      min: 0,
    },
    {
      name: "phone",
      type: "number",
      enterTitle: "Enter Phone Number:",
      placeholder: "995 000 000 000",
      errors: currentState?.errors?.phone,
      defaultValue: currentState?.values?.phone || "",
      min: 0,
      autoComplete: "tel",
    },
    {
      name: "lng",
      type: "text",
      enterTitle: "Lng",
      value: coordinates.lng || "",
      placeholder: "Open map to generate LNG",
      errors: currentState?.errors?.lng,
      isReadOnly: true,
    },
    {
      name: "lat",
      type: "text",
      enterTitle: "Lat",
      value: coordinates.lat || "",
      placeholder: "Open map to generate LAT",
      errors: currentState?.errors?.lat,
      isReadOnly: true,
    },
    {
      name: "chooseCoordinates",
      type: "button",
      enterTitle: "Choose Coordinates",
      value: "Generate My Coordinates",
      onClick: () => setModal("map"),
    },
    {
      name: "profilePicture",
      type: "file",
      enterTitle: "Choose Profile Picture (optional)",
      errors: currentState?.errors?.profilePicture,
      onChange: handleFileChange,
      file: file as File,
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
      {currentState?.success === true && (
        <h1 className="bg-green-300 text-white my-2 text-center p-1">
          Account Created Successfully
        </h1>
      )}
      {currentState?.success === false && (
        <h1 className="bg-red-600 text-white my-2 text-center p-1">
          Something went wrong
        </h1>
      )}
    </>
  );
};

export default UserRegister;
