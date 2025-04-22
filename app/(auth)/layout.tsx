import React from "react";
import ButtonsList from "./ButtonList";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full bg-blue-400 flex justify-center items-center">
      <div className="w-[700px] h-[600px] bg-white rounded-lg p-5">
        <ButtonsList />
        {children}
      </div>
    </div>
  );
}
