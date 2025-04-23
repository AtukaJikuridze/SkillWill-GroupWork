"use client";
import useAuth from "@/store/useAuth";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setSelectedProfilePicture } = useAuth();
  useEffect(() => {
    setSelectedProfilePicture(null);
  }, [location.pathname]);
  return <>{children}</>;
}
