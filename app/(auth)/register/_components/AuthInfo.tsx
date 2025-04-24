"use client";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const AuthInfo = () => {
  const pathname = usePathname();
  const params = useParams();
  const correctAuth = pathname.split("/")[1];
  const correctType = params.loginType;

  return (
    <div>
      <h1 className="capitalize ">
        {correctAuth} {correctType}
      </h1>
    </div>
  );
};

export default AuthInfo;
