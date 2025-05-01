import { IAdmin } from "@/interfaces/user.interface";
import Image from "next/image";
import React from "react";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

interface IAdminDashboard {
  admin: IAdmin;
}

interface IInfoDisplay {
  label: string;
  value: string | number;
}

const InfoDisplay = ({ label, value }: IInfoDisplay) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold">{label}:</p>
      <p>{value}</p>
    </div>
  );
};

export default function AdminDashboard({ admin }: IAdminDashboard) {
  return (
    <div className="relative flex flex-col gap-8 mx-auto mb-8 p-4 sm:p-8 border border-black rounded">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-center w-full mb-4">
            User Details
          </h2>
          <div className="absolute right-4 flex gap-4">
            <EditBtn />
            <DeleteBtn uuid={admin._uuid} />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <Image
            alt={`${admin.firstName} ${admin.lastName}`}
            src={admin.profileImage || "/images/avatar.png"}
            width={64}
            height={64}
            className="rounded-full object-cover"
            style={{ width: "64px", height: "64px" }}
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <InfoDisplay label="Email" value={admin.email} />
          <InfoDisplay
            label="Full Name"
            value={`${admin.firstName} ${admin.lastName}`}
          />
          <InfoDisplay label="Phone Number" value={admin.phoneNumber} />
          <InfoDisplay label="PID" value={admin.pid} />
        </div>
      </div>
    </div>
  );
}
