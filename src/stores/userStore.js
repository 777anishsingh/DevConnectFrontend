import { create } from 'zustand'

const userStore = create((set) => ({
  user: null,
  authChecked: false,

  setUser: (user) => set({
    user,
    authChecked: true,
  }),

  removeUser: () => set({
    user: null,
    authChecked: true,
  }),
}));

export default userStore;