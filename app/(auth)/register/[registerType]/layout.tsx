"use client";
import Coordinates from "@/components/coordinates/Coordinates";
import useAuth from "@/store/useAuth";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setSelectedProfilePicture } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    setSelectedProfilePicture(null);
  }, [pathname]);

  return (
    <>
      <Coordinates />
      {children}
    </>
  );
}
