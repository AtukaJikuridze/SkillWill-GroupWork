"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const AuthInfo = () => {
  const pathname = usePathname();
  const params = useParams();
  const correctAuth = pathname.split("/")[1];
  const correctType = params.loginType || params.registerType;
  const reversedAuth = pathname.split("/")[1] == "login" ? "register" : "login";

  return (
    <div className="flex flex-col items-center">
      <h1 className="capitalize text-2xl font-bold  ">
        {correctAuth} {correctType}
      </h1>
      <Link
        href={`/${reversedAuth}/${correctType}`}
        className="text-lg underline text-center mb-4 text-blue-800 capitalize"
      >
        {reversedAuth}
      </Link>
    </div>
  );
};

export default AuthInfo;
