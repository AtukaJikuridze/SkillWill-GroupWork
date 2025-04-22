import React from "react";
import ButtonsList from "./ButtonList";
interface IAuthLayout {
  children: React.ReactNode;
}
export default function layout({ children }: Readonly<IAuthLayout>) {
  return (
    <div className="w-full h-full bg-blue-400 flex justify-center items-center">
      <div className="w-[700px] max-h-[90%] overflow-y-auto  bg-white rounded-lg px-10 py-25">
        <ButtonsList />
        <div className="pt-10 ">{children}</div>
      </div>
    </div>
  );
}
