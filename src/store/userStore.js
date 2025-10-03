import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        isConnected: false,
        setIsConnected: (isConnected) => set({ isConnected }),
        token: null,
        setToken: (token) => set({ token }),

        resetUser: () =>
          set({
            user: null,
            isConnected: false,
            token: null,
          }),
      }),
      {
        name: "user-storage",
        getStorage: () => sessionStorage,
      }
    ),
    { name: "UserStore" }
  )
);

export default useUserStore;
