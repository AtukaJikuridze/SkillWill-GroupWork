"use client";
import React, { useState, useEffect, useRef, useActionState } from "react";
import { InputFieldsProps } from "@/interfaces/login-form-fields.interface";
import { userRegisterAction } from "@/actions/register-actions/userRegisterAction";
import useAuth from "@/store/useAuth";
import useApp from "@/store/useApp";
import MyForm from "@/components/register-form/MyForm";
import UserRegisterForm from "./UserRegisterForm";

const UserRegister = () => {
  const [state, action, isPending] = useActionState<Promise<any>, any>(
    userRegisterAction,
    null
  );
  const stateRef = useRef<any>(null);

  const coordinates = useAuth((state) => state.coordinates);
  const selectedProfilePicture = useAuth(
    (state) => state.selectedProfilePicture
  );
  const setSelectedProfilePicture = useAuth(
    (state) => state.setSelectedProfilePicture
  );
  const setModal = useApp((state) => state.setModal);
  const currentState = state || stateRef.current;

  const [formData, setFormData] = useState({
    firstname: currentState?.values?.firstname || "",
    lastname: currentState?.values?.lastname || "",
    email: currentState?.values?.email || "",
    password: currentState?.values?.password || "",
    personal_id: currentState?.values?.personalId || "",
    phone_number: currentState?.values?.phone_number || "",
    lng: coordinates.lng,
    lat: coordinates.lat,
    profilePicture: selectedProfilePicture || null,
  });

  const [picture, setPicture] = useState<string | null>(null);

  useEffect(() => {
    if (state !== null) {
      stateRef.current = state;
    }
  }, [state]);

  useEffect(() => {
    if (selectedProfilePicture) {
      drawPicture(selectedProfilePicture);
    }
  }, [selectedProfilePicture]);

  const drawPicture = (selectedFile: File | null) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: selectedFile,
    }));
    setSelectedProfilePicture(selectedFile);
    drawPicture(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputFields: InputFieldsProps[] = [
    {
      name: "firstname",
      type: "text",
      enterTitle: "Enter Firstname:",
      placeholder: "John",
      errors: currentState?.errors?.firstname,
      value: formData.firstname,
      autoComplete: "given-name",
      onChange: handleChange,
    },
    {
      name: "lastname",
      type: "text",
      enterTitle: "Enter Lastname (optional)",
      placeholder: "Doe",
      errors: currentState?.errors?.lastname,
      value: formData.lastname,
      autoComplete: "family-name",
      onChange: handleChange,
    },
    {
      name: "email",
      type: "email",
      enterTitle: "Enter Email:",
      placeholder: "johndoe@gmail.com",
      errors: currentState?.errors?.email,
      value: formData.email,
      autoComplete: "email",
      onChange: handleChange,
    },
    {
      name: "password",
      type: "password",
      enterTitle: "Enter Password:",
      placeholder: "**********",
      errors: currentState?.errors?.password,
      value: formData.password,
      autoComplete: "new-password",
      onChange: handleChange,
    },
    {
      name: "personal_id",
      type: "number",
      enterTitle: "Enter Personal Id:",
      placeholder: "00000000000",
      errors: currentState?.errors?.personal_id,
      value: formData.personal_id,
      min: 0,
      onChange: handleChange,
    },
    {
      name: "phone_number",
      type: "number",
      enterTitle: "Enter Phone Number:",
      placeholder: "995 000 000 000",
      errors: currentState?.errors?.phone_number,
      value: formData.phone_number,
      min: 0,
      autoComplete: "tel",
      onChange: handleChange,
    },
    {
      name: "lng",
      type: "text",
      enterTitle: "Lng",
      value: formData.lng || coordinates.lng || "",
      placeholder: "Open map to generate LNG",
      errors: currentState?.errors?.lng,
      isReadOnly: true,
    },
    {
      name: "lat",
      type: "text",
      enterTitle: "Lat",
      value: formData.lat || coordinates.lat || "",
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
      name: "profile_picture",
      type: "file",
      enterTitle: "Choose Profile Picture (optional)",
      errors: currentState?.errors?.profile_picture,
      onChange: handleFileChange,
      file: selectedProfilePicture,
      filePicture: picture,
    },
  ];

  return (
    <>
      <UserRegisterForm action={action} inputFields={inputFields} />
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
