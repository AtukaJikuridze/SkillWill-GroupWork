import { IRandomUser } from "@/interfaces/user.interface";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

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
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <LogoutBtn />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
