import React from "react";
import AdminRegister from "./_components/adminRegister/AdminRegister";
import UserRegister from "./_components/userRegister/UserRegister";
import CourierRegister from "./_components/courierRegister/courierRegister";
import { notFound } from "next/navigation";
import { allAuthTypes } from "@/lib/posibleAuthTypes";

export interface IRegisterPage {
  params: Promise<{ registerType: string }>;
}

const page = async ({ params }: IRegisterPage) => {
  const { registerType } = await params;
  if (!allAuthTypes.includes(registerType)) {
    notFound();
  }
  const correctRegister = () => {
    switch (registerType) {
      case "admins":
        return <AdminRegister />;
      case "users":
        return <UserRegister />;
      case "couriers":
        return <CourierRegister />;
    }
  };

  return correctRegister();
};

export default page;
