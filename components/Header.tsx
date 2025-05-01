import { IRandomUser } from "@/interfaces/user.interface";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import Image from "next/image";

interface IHeader {
  user: IRandomUser;
}

export default function Header({ user }: IHeader) {
  const objectIsEmpty = (obj: object) => Object.keys(obj).length === 0;

  return (
    <nav className="sticky top-0 bg-blue-600 text-white shadow z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        <Link
          href={`/${!objectIsEmpty(user) ? user.role : ""}`}
          className="text-xl font-semibold"
        >
          DashDelivery
        </Link>

        <div className="flex items-center gap-4">
          {objectIsEmpty(user) ? (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <Image
                src={user.profileImage || "/images/avatar.png"}
                alt={`${user.firstName} ${user.lastName}`}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <LogoutBtn />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
