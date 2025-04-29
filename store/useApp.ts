import { create } from "zustand";
type IModal = "map" | null;
interface IUseApp {
  modal: IModal;
  setModal: (modalType: IModal) => void;
}

const useApp = create<IUseApp>((set) => ({
  modal: null,
  setModal: (modalType) => set({ modal: modalType }),
}));

export default useApp;

// login: (userData) => {
//   set({ user: userData });
// },

// logout: () => {
//   localStorage.removeItem("loginedAccount");
//   set({ user: null });
// },
