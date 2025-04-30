import { IUser } from "@/interfaces/user.interface";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

interface IUserView {
  user: IUser;
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

const UserView = ({ user }: IUserView) => {
  return (
    <div className="flex flex-col gap-8 mx-auto mb-8 p-4 sm:p-8 border border-black rounded">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-center w-full mb-4">
            User Details
          </h2>
          <div className="flex gap-4">
            <EditBtn />
            <DeleteBtn uuid={user._uuid} />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <img
            alt={`${user.firstName} ${user.lastName}`}
            src={user.profileImage || undefined}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <InfoDisplay label="Email" value={user.email} />
          <InfoDisplay
            label="Full Name"
            value={`${user.firstName} ${user.lastName}`}
          />
          <InfoDisplay label="Phone Number" value={user.phoneNumber} />
          <InfoDisplay label="PID" value={user.pid} />
          <InfoDisplay
            label="Address"
            value={`${user.coordinates.lng} : ${user.coordinates.lat}`}
          />
        </div>
      </div>
    </div>
  );
};

export default UserView;
