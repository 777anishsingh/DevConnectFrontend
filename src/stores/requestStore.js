import { create } from 'zustand'

const requestStore = create((set) => ({
    requests: null,
    setRequests: (requests) => set({ requests }),
    removeRequests: (fromUserId) =>
        set((state) => ({
            requests: state.requests.filter(
                (request) => request._id !== fromUserId
            ),
        })),
    clearRequests: () => set({ requests: null })
}))

export default requestStore;