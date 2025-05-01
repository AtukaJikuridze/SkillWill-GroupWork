"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import CourierWorkDays from "./CourierWorkDays";
import UserView from "./UserView";
import UserEdit from "./UserEdit";
import { ICourier, IUser, IWorkingDays } from "@/interfaces/user.interface";
import { updateCourier } from "@/services/courier";
import { updateUser } from "@/services/users";
import Image from "next/image";

export interface IPageSelector {
  couriers: ICourier[];
  user: IUser;
}

export default function PageSelector({ couriers, user }: IPageSelector) {
  const searchParams = useSearchParams();
  const editting = searchParams.get("edit");

  const onBook = (courier: ICourier, updatedWorkingDays: IWorkingDays) => {
    const updatedCourier = {
      ...courier,
      workingDays: updatedWorkingDays,
      totalRequests: [...courier.totalRequests, user.email],
    };
    updateCourier(updatedCourier);
    updateUser({
      ...user,
      requestedCouriers: [...user.requestedCouriers, updatedCourier],
    });
  };

  const onUserEdit = (user: IUser) => {
    updateUser(user);
  };

  return (
    <>
      {editting ? (
        <UserEdit user={user} onSubmit={onUserEdit} />
      ) : (
        <div className="p-6">
          <UserView user={user} />

          <h2 className="text-2xl font-semibold mb-4">All Couriers</h2>

          <div className="overflow-x-auto bg-white shadow rounded mb-6">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">First Name</th>
                  <th className="p-4 text-left">Last Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Vehicle</th>
                </tr>
              </thead>
              <tbody>
                {couriers.map((courier) => (
                  <tr key={courier._uuid} className="border-t">
                    <td className="p-4">
                      <Image
                        src={courier.profileImage || "/images/avatar.png"}
                        alt={`${courier.firstName} ${courier.lastName}`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </td>
                    <td className="p-4">{courier.firstName}</td>
                    <td className="p-4">{courier.lastName}</td>
                    <td className="p-4">{courier.email}</td>
                    <td className="p-4">{courier.vehicle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {couriers.map((courier) => (
            <div
              key={courier._uuid}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-6 border-b border-black max-w-[92vw] mx-auto pb-4"
            >
              <div className="w-full">
                <h3 className="text-xl font-medium mb-2">
                  {courier.firstName} {courier.lastName}
                </h3>
                <CourierWorkDays
                  workingDays={courier.workingDays}
                  onBook={(updatedWorkingDays) =>
                    onBook(courier, updatedWorkingDays)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
