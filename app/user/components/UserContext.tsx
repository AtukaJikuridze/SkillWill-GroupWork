"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserData {
  name: string;
  email: string;
  password?: string;
  phone?: string;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
  updateUser: (updatedData: Partial<UserData>) => void;
  deleteUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  // ავტო ჩატვირთვა localStorage-დან
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updatedData: Partial<UserData>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...updatedData } : prevUser));
  };

  const deleteUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
