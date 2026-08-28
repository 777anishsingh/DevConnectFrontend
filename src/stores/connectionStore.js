import { create } from 'zustand'

const connectionStore = create((set) => ({
    connections: null,
    setConnections: (connections) => set({ connections }),
    clearConnections: () => set({ connections: null }),

}))

export default connectionStore;