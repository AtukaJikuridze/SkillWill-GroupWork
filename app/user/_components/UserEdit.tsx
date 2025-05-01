"use client";
import { IUser } from "@/interfaces/user.interface";
import UserForm from "./UserForm";
import { useRouter } from "next/navigation";

interface IUserEdit {
  user: IUser;
  onSubmit: (updatedUser: IUser) => void;
}

const UserEdit = ({ user, onSubmit }: IUserEdit) => {
  const router = useRouter();

  const handleFormSubmit = (
    updatedData: Record<string, string | number | File>
  ) => {
    const updatedUser = { ...user, ...updatedData };
    onSubmit(updatedUser);
    router.push("user");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full sm:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Edit User Information</h2>
          <UserForm
            formData={user as unknown as Record<string, string | number | File>}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
