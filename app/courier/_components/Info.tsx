import Link from "next/link";
import { ICourier } from "@/interfaces/user.interface";
import Image from "next/image";

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

export default function Info({ courier }: { courier: ICourier }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h5 className="mx-auto mt-4 mb-0">Courier Details</h5>
        <Link href="/courier/edit">Edit</Link>
      </div>
      <Image
        src={courier.profileImage || "/images/avatar.png"}
        alt={`${courier.firstName} ${courier.lastName}`}
        width={40}
        height={40}
        className="rounded-full object-cover"
        style={{ width: "40px", height: "40px" }}
      />
      <div className="flex content-center mb-2"></div>

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
