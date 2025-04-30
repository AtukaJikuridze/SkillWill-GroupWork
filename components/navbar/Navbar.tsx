"use client";
import Link from "next/link";
import NavLinks from "./NavLinks";
import useAuth from "@/store/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  // if (!user.role) return;

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Logo
      </Link>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
