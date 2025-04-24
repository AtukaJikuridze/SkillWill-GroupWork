import Link from "next/link";
import Avatar from "./Avatar";

interface IInfoDisplay {
  label: string;
  value: string | number;
}

const InfoDisplay = ({ label, value }: IInfoDisplay) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold">{label}:</p>
      <p>{value}</p>
    </div>
  );
};

interface IInfo {
  courier: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    pid: number;
    vehicle: string;
    totalRequests: string[];
    profileImage: string;
  };
}

export default function Info({ courier }: IInfo) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h5 className="mx-auto mt-4 mb-0">Courier Details</h5>
        <Link href="/courier/edit">Edit</Link>
      </div>

      <div className="flex content-center mb-2">
        <Avatar name={courier.firstName} imageUrl={courier.profileImage} />
      </div>

      <div className="flex flex-col gap-4">
        <InfoDisplay label="Email" value={courier.email} />
        <InfoDisplay
          label="Full Name"
          value={`${courier.firstName} ${courier.lastName}`}
        />
        <InfoDisplay label="Phone Number" value={courier.phoneNumber} />
        <InfoDisplay label="PID" value={courier.pid} />
        <InfoDisplay label="Vehicle" value={courier.vehicle} />
        <InfoDisplay
          label="Requests"
          value={`[${courier.totalRequests.join(" ")}]`}
        />
      </div>
    </div>
  );
}
