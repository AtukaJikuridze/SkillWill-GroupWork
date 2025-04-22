"use client";
import React from "react";
import BlueButton from "../../components/BlueButton";

interface IButtonListProps {}

const ButtonsList: React.FC<IButtonListProps> = ({}) => {
  const buttonList = [
    { title: "User", setRegisterAs: "users" },
    { title: "Courier", setRegisterAs: "couriers" },
    { title: "Admin", setRegisterAs: "admins" },
  ];

  return (
    <div className="flex gap-2 py-2 justify-center">
      {buttonList.map((e, i) => (
        <BlueButton
          key={i}
          title={e.title}
          active={false}
          onClick={() => console.log(true)}
        />
      ))}
    </div>
  );
};

export default ButtonsList;
