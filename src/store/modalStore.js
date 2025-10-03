import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useModalStore = create(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: false,
        setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      }),
      {
        name: "modal-storage",
        getStorage: () => sessionStorage,
      }
    ),
    { name: "ModalStore" }
  )
);

export default useModalStore;
