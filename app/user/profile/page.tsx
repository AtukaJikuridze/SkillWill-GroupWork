"use client";

import React, { useEffect } from "react";
import { useUser } from "@/app/user/components/UserContext";
import { useRouter } from "next/navigation";
import CourierInfo from "../Users/page";

const ProfilePage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/register");
    }
  }, [user, router]);

  if (!user) {
    return null;  
  }

  return (
    <>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">Პროფილი</h1>
        <p><strong>სახელი:</strong> {user?.name}</p>
        <p><strong>ელფოსტა:</strong> {user?.email}</p>
        <p><strong>ტელეფონი:</strong> {user?.phone}</p>
      </div>
      <CourierInfo user={user} />
    </>
  );
};

export default ProfilePage;
