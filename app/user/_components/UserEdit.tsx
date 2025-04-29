"use client";
import GeoLocationInput from "@/components/GeoLocationInput";
import { IUser } from "@/interfaces/user.interface";
import { useState } from "react";
import UserForm from "./UserForm";
import { useRouter } from "next/navigation";

interface IUserEdit {
  user: IUser;
  onSubmit: (updatedUser: IUser) => void;
}

export interface IAdress {
  lng: string;
  lat: string;
}

const UserEdit = ({ user, onSubmit }: IUserEdit) => {
  const router = useRouter();
  const [address, setAdress] = useState<IAdress>({ lng: "", lat: "" });

  const handleFormSubmit = (
    updatedData: Record<string, string | number | File>
  ) => {
    const updatedUser = { ...user, ...updatedData };
    if (address.lng) updatedUser.coordinates = address;
    onSubmit(updatedUser);
    router.push("user");
  };

  const handleGeoLocationChange = (location: string) => {
    const [lat, lng] = location.split(", ");
    setAdress({
      lat: lat.trim(),
      lng: lng.trim(),
    });
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full sm:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Edit User Information</h2>
          <GeoLocationInput onGeoLocationChange={handleGeoLocationChange} />

          <UserForm
            formData={user as unknown as Record<string, string | number | File>}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
