"use client";
import { IRandomUser } from "@/interfaces/user.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IHeader {
  user: IRandomUser;
}

export default function Header({ user }: IHeader) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "uuid=; Max-Age=0; path=/;";
    router.push("/login");
  };

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
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
