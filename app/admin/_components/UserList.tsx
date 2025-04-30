"use client";
import { useState, useRef, useEffect } from "react";
import { ICourier, IUser } from "@/interfaces/user.interface";
import Modal from "./Modal";
import BookedCouriers from "./BookedCouriers";

interface IUserList {
  users: IUser[];
  couriers: ICourier[];
}

const UserList = ({ users, couriers }: IUserList) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const openModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    if (openModalButtonRef.current) {
      openModalButtonRef.current.focus();
    }
  };

  const handleOpenModal = (user: IUser) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Profile Image</th>
              <th className="p-4 text-left">First Name</th>
              <th className="p-4 text-left">Last Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone Number</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._uuid} className="border-t">
                <td className="p-4">
                  <img
                    src={user.profileImage || undefined}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-4">{user.firstName}</td>
                <td className="p-4">{user.lastName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phoneNumber}</td>
                <td className="p-4 space-x-2">
                  <button
                    ref={openModalButtonRef}
                    onClick={() => handleOpenModal(user)}
                    className="cursor-pointer px-3 py-1 border border-purple-500 text-purple-500 rounded hover:bg-purple-50"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {selectedUser && (
          <BookedCouriers
            couriers={couriers.filter((courier) => {
              const hasRequested = courier.totalRequests.includes(
                selectedUser.email
              );
              return (
                hasRequested &&
                Object.keys(courier.workingDays).some((day) =>
                  courier.workingDays[day].some((wd) => wd.booked)
                )
              );
            })}
          />
        )}
      </Modal>
    </div>
  );
};

export default UserList;
