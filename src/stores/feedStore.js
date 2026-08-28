import { create } from 'zustand'

const feedStore = create((set) => ({
    feed: null,
    setFeed: (feed) => set({ feed }),
    removeFeed: (toUserId) =>
        set((state) => ({
            feed: state.feed.filter(
                (f) => f._id !== toUserId
            ),
        })),
    clearFeed: () => set({ feed: null }),


}))

export default feedStore;