import { create } from "zustand";
interface Coordinates {
  lat: string | null;
  lng: string | null;
}
interface IUseUser {
  user: {
    role: "admin" | "courier" | "user" | null;
  };
  selectedProfilePicture: null | File;
  setSelectedProfilePicture: (file: File | null) => void;
  coordinates: Coordinates;
  setCoordinates: (coords: Coordinates) => void;
}

const useAuth = create<IUseUser>((set) => ({
  user: {
    role: null,
  },

  selectedProfilePicture: null,
  setSelectedProfilePicture: (file: File | null) => {
    set({ selectedProfilePicture: file });
  },
  coordinates: {
    lat: null,
    lng: null,
  },
  setCoordinates: (coords) => set({ coordinates: coords }),
}));

export default useAuth;

// login: (userData) => {
//   set({ user: userData });
// },

// logout: () => {
//   localStorage.removeItem("loginedAccount");
//   set({ user: null });
// },
