"use client";
import useAuth from "@/store/useAuth";
import Link from "next/link";
import React from "react";

const navLinksMap: Record<string, { href: string; label: string }[]> = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/profile", label: "Profile" },
  ],
  courier: [
    { href: "/courier/dashboard", label: "My Tasks" },
    { href: "/courier/profile", label: "Profile" },
  ],
  user: [
    { href: "/user/dashboard", label: "მთავარი" },
    { href: "/user/profile", label: "პროფილი" },
  ],
  guest: [
    { href: "/login/user", label: "შესვლა" },
    { href: "/register/user", label: "რეგისტრაცია" },
  ],
};

const NavLinks = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const links = navLinksMap[role] || [];

  return (
    <div className="flex gap-4 text-sm">
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className="hover:underline text-lg">
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
