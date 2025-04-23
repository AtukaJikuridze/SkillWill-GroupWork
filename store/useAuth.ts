import { create } from "zustand";

interface IUseUser {
  user: {
    role: "admin" | "courier" | "user" | null;
  };
}

const useAuth = create<IUseUser>((set) => ({
  user: {
    role: null,
  },

  // login: (userData) => {
  //   set({ user: userData });
  // },

  // logout: () => {
  //   localStorage.removeItem("loginedAccount");
  //   set({ user: null });
  // },
}));

export default useAuth;
