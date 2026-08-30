import { create } from 'zustand'
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default userStore;

// const userStore = create((set) => ({
//   user: null,
//   authChecked: false,

//   setUser: (user) => set({
//     user,
//     authChecked: true,
//   }),

//   removeUser: () => set({
//     user: null,
//     authChecked: true,
//   }),
// }));