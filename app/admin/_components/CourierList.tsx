"use client";
import { useEffect, useState } from "react";
import { ICourier } from "@/interfaces/user.interface";
import { objectIsEmpty } from "@/utils/objectIsEmpty";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteRandomUser } from "@/services/admin";
import CourierAdminEdit from "./CourierAdminEdit";

interface ICouriersList {
  couriers: ICourier[];
}
const CourierList = ({ couriers }: ICouriersList) => {
  const searchParams = useSearchParams();
  const editting = searchParams.get("edit");
  const [courierToEdit, setCourierToEdit] = useState<ICourier>({} as ICourier);
  const router = useRouter();

  useEffect(() => {
    if (editting && objectIsEmpty(courierToEdit)) router.push("/admin");
  }, [router, editting, courierToEdit]);

  const handleEdit = (courier: ICourier) => {
    setCourierToEdit(courier);
    router.push(`/admin?edit=true`);
  };

  return (
    <>
      {editting && !objectIsEmpty(courierToEdit) ? (
        <CourierAdminEdit courier={courierToEdit} onSubmit={() => {}} />
      ) : (
        <div>
          <h1 className="text-2xl font-semibold mb-4">All Couriers</h1>

          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Profile Image</th>
                  <th className="p-4 text-left">First Name</th>
                  <th className="p-4 text-left">Last Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Vehicle</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {couriers.map((courier) => (
                  <tr key={courier._uuid} className="border-t">
                    <td className="p-4">
                      <img
                        src={courier.profileImage || undefined}
                        alt={`${courier.firstName} ${courier.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-4">{courier.firstName}</td>
                    <td className="p-4">{courier.lastName}</td>
                    <td className="p-4">{courier.email}</td>
                    <td className="p-4">{courier.vehicle}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(courier)}
                        className="px-3 py-1 border border-purple-500 text-purple-500 rounded hover:bg-purple-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRandomUser(courier._uuid)}
                        className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
export default CourierList;
