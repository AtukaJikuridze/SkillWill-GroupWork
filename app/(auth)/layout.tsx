import React from "react";
import ButtonsList from "./ButtonList";
import AuthInfo from "./login/_components/AuthInfo";
interface IAuthLayout {
  children: React.ReactNode;
}

export default async function layout({
  children,
}: Readonly<IAuthLayout>) {

  return (
    <div className="w-full h-full bg-blue-400 flex justify-center items-center">
      <div className="w-[700px] max-h-[90%] overflow-y-auto  bg-white rounded-lg px-10 py-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          <AuthInfo />
        </h1>
        <ButtonsList />
        <div className="pt-10">{children}</div>
      </div>
    </div>
  );
}
