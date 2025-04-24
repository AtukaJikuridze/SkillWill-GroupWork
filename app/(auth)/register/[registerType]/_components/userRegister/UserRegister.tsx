"use client";
import React, { useActionState, useState } from "react";
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
  const { setModal } = useApp();

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
  const { coordinates, setCoordinates } = useAuth();
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
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
      name: "lng",
      type: "text",
      enterTitle: "Lng",
      value: coordinates.lng || "",
      placeholder: "Open map to generate LNG",
      errors: state?.errors?.lng,
      isReadOnly: true,
    },
    {
      name: "lat",
      type: "text",
      enterTitle: "Lat",
      value: coordinates.lat || "",
      placeholder: "Open map to generate LAT",
      errors: state?.errors?.lat,
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
      errors: state?.errors?.profilePicture,
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
      {state?.success === true && (
        <h1 className="bg-green-300 text-white my-2 text-center p-1">
          Account Created Succesfully
        </h1>
      )}
      {state?.success === false && (
        <h1 className="bg-red-600 text-white my-2 text-center p-1">
          Something went wrong
        </h1>
      )}
    </>
  );
};

export default UserRegister;
