"use client";
import BaseForm, { Field } from "@/components/form/BaseForm";
import GeoLocationInput from "@/components/GeoLocationInput";
import { IAdress, IRandomUser } from "@/interfaces/user.interface";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const RegisterPage = () => {
  let fields: Field[] = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: true,
    },
    { name: "pid", label: "Pid", type: "number", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    {
      name: "profileImage",
      label: "Profile Image",
      type: "file",
      required: false,
    },
  ];
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "courier" | "user">("user");
  const [address, setAdress] = useState<IAdress>({ lng: "", lat: "" });

  if (role === "courier")
    fields = [
      { name: "vehicle", label: "Vehicle", type: "text", required: true },
      ...fields,
    ];

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value as "admin" | "courier" | "user");
  };

  const handleGeoLocationChange = (location: string) => {
    const [lat, lng] = location.split(", ");
    setAdress({
      lat: lat.trim(),
      lng: lng.trim(),
    });
  };

  const handleFormSubmit = async (
    formData: Record<string, string | number | File>
  ) => {
    const completeFormData: { [key: string]: unknown } = {
      ...formData,
      pid: Number(formData.pid),
      role,
    };

    if (role === "user") {
      completeFormData.coordinates = address;
      completeFormData.requestedCouriers = [];
    }
    if (role === "courier") {
      completeFormData.totalRequests = [];
      completeFormData.workingDays = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };
    }

    try {
      delete completeFormData.name;
      const user = await registerUser(
        completeFormData as unknown as IRandomUser
      );
      if (user === null) console.log("Error submitting form");
      else {
        document.cookie = `uuid=${user._uuid}; path=/`;
        router.push(`/${user.role}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <label className="block mb-2 font-medium text-gray-700" htmlFor="role">
        Select Role:
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => handleRoleChange(e)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="user">User</option>
        <option value="courier">Courier</option>
        <option value="admin">Admin</option>
      </select>

      {role === "user" && (
        <GeoLocationInput onGeoLocationChange={handleGeoLocationChange} />
      )}

      <BaseForm
        fields={fields}
        onSubmit={handleFormSubmit}
        defaultValues={{ name: "", email: "", password: "", profileImage: "" }}
        className="max-w-lg"
      />
    </div>
  );
};

export default RegisterPage;
