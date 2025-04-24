"use client";
import React from "react";
import BlueButton from "../../components/BlueButton";
import { notFound, redirect, useParams, usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { allAuthTypes } from "@/lib/posibleAuthTypes";

const ButtonsList = () => {
  const buttonList = [
    { title: "User", setRegisterAs: "users" },
    { title: "Courier", setRegisterAs: "couriers" },
    { title: "Admin", setRegisterAs: "admins" },
  ];
  const pathname = usePathname();
  const params = useParams();
  const correctAuth = pathname.split("/")[1];
  const correctType: any = params.loginType || params.registerType;

  if (correctType && !allAuthTypes.includes(correctType)) {
    console.log(true);
    notFound();
  }

  return (
    <div className="flex gap-2 py-2 justify-center">
      {buttonList.map((e) => (
        <BlueButton
          key={uuidv4()}
          title={e.title}
          active={false}
          onClick={() => redirect(`/${correctAuth}/${e.setRegisterAs}`)}
        />
      ))}
    </div>
  );
};

export default ButtonsList;
