"use client";
import { useEffect, useRef, useState } from "react";
import { ICourier } from "@/interfaces/user.interface";
import { objectIsEmpty } from "@/utils/objectIsEmpty";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteRandomUser } from "@/services/admin";
import CourierAdminEdit from "./CourierAdminEdit";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import Image from "next/image";

interface ICouriersList {
  couriers: ICourier[];
}
const CourierList = ({ couriers }: ICouriersList) => {
  const searchParams = useSearchParams();
  const editting = searchParams.get("edit");
  const [courierToEdit, setCourierToEdit] = useState<ICourier>({} as ICourier);
  const router = useRouter();

  const [courier, setCourier] = useState<null | ICourier>(null);
  const [openModal, setOpenModal] = useState(false);
  const openModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleCloseModal = () => {
    setCourier(null);
    setOpenModal(false);
    if (openModalButtonRef.current) {
      openModalButtonRef.current.focus();
    }
  };

  const handleOpenModal = (courier: ICourier) => {
    setCourier(courier);
    setOpenModal(true);
  };

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
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleOpenModal(courier)}
                        className="cursor-pointer px-3 py-1 border border-purple-500 text-purple-500 rounded hover:bg-purple-50"
                      >
                        Task
                      </button>
                      <button
                        onClick={() => handleEdit(courier)}
                        className="cursor-pointer px-3 py-1 border border-purple-500 text-purple-500 rounded hover:bg-purple-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRandomUser(courier._uuid)}
                        className="cursor-pointer px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal isOpen={openModal} onClose={handleCloseModal}>
            <TaskForm onTaskSubmit={handleCloseModal} courier={courier!} />
          </Modal>
        </div>
      )}
    </>
  );
};
export default CourierList;
