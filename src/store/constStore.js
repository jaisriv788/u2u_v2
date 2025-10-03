import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useConstStore = create(
  devtools(
    persist(
      (set) => ({
        baseUrl: "https://u2uglobal.xyz/superadmin/api/",
        usdtAddress: "0x55d398326f99059fF775485246999027B3197955",
        contractAddress: "0xb92cbb7830B2cd93aa72572Eb36591d6D770981b",
        walletAddress: null,
        setWalletAddress: (walletAddress) => set({ walletAddress }),
        screenLoading: false,
        setScreenLoading: (screenLoading) => set({ screenLoading }),
        showSuccess: false,
        setShowSuccess: (showSuccess) => set({ showSuccess }),
        msg: "",
        setMsg: (msg) => set({ msg }),
        showError: false,
        setShowError: (showError) => set({ showError }),
        showNotification: true,
        setShowNotification: (showNotification) => set({ showNotification }),
      }),
      {
        name: "const-storage",
        getStorage: () => sessionStorage,
        version: 2,
        migrate: (persistedState, version) => {
          if (version < 2) {
            return {
              ...persistedState,
              baseUrl: "https://u2uglobal.xyz/superadmin/api/",
            };
          }
          return persistedState;
        },
      }
    ),
    { name: "ConstStore" }
  )
);

export default useConstStore;
