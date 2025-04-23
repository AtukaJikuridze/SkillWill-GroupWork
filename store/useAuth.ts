import { create } from "zustand";

interface IUseUser {
  user: {
    role: "admin" | "courier" | "user" | null;
  };
  selectedProfilePicture: null | File;
  setSelectedProfilePicture: (file: File | null) => void; 
}

const useAuth = create<IUseUser>((set) => ({
  user: {
    role: null,
  },
  selectedProfilePicture: null,
  setSelectedProfilePicture: (file: File | null) => {
    set({ selectedProfilePicture: file }); 
  },
}));

export default useAuth;

// login: (userData) => {
//   set({ user: userData });
// },

// logout: () => {
//   localStorage.removeItem("loginedAccount");
//   set({ user: null });
// },
