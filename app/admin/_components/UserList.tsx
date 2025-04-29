"use client";
import { useState, useRef, useEffect } from "react";
import { ICourier, IUser } from "@/interfaces/user.interface";
import { deleteRandomUser } from "@/services/admin";

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

  useEffect(() => {
    if (openModal && openModalButtonRef.current) {
      openModalButtonRef.current.blur();
    }
  }, [openModal]);

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
                    className="px-3 py-1 border border-purple-500 text-purple-500 rounded hover:bg-purple-50"
                  >
                    View More
                  </button>
                  <button
                    onClick={() => deleteRandomUser(user._uuid)}
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

      {openModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          aria-hidden={!openModal}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
            <h2 className="text-lg font-semibold mb-4">User Details</h2>

            {selectedUser && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Requested Couriers:
                </h3>
                <table className="w-full text-left border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 border">Courier Name</th>
                      <th className="p-3 border">Vehicle</th>
                      <th className="p-3 border">Working Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {couriers
                      .filter((courier) => {
                        const hasRequested = courier.totalRequests.includes(
                          selectedUser.email
                        );
                        return (
                          hasRequested &&
                          Object.keys(courier.workingDays).some((day) =>
                            courier.workingDays[day].some((wd) => wd.booked)
                          )
                        );
                      })
                      .map((courier) => (
                        <tr key={courier._uuid} className="border-t">
                          <td className="p-3 border">
                            {courier.firstName} {courier.lastName}
                          </td>
                          <td className="p-3 border">{courier.vehicle}</td>
                          <td className="p-3 border space-y-1">
                            {Object.keys(courier.workingDays)
                              .filter((day) =>
                                courier.workingDays[day].some((wd) => wd.booked)
                              )
                              .map((day) => {
                                const dayName =
                                  day.charAt(0).toUpperCase() + day.slice(1);
                                return (
                                  <div key={day}>
                                    <strong>{dayName}:</strong>{" "}
                                    {courier.workingDays[day]
                                      .filter((wd) => wd.booked)
                                      .map((wd, index) => (
                                        <div key={index}>
                                          {wd.startHours} - {wd.endHours}
                                        </div>
                                      ))}
                                  </div>
                                );
                              })}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 text-right">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
