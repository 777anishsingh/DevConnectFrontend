import React from 'react'
import RequestCards from './RequestCards'
import userStore from '@/stores/userStore'
import NotLoggedIn from './NotLoggedIn'

const Requests = () => {
    const user = userStore(state => state.user)

    if (!user) {
        return (
            <NotLoggedIn />

        )
    }
    return (
        <div>
            <div>
                <h1 className='font-semibold mb-3 text-5xl mask-t-from-neutral-100 text-center'>Requests</h1>
                <RequestCards />
            </div>

        </div>
    )
}

export default Requests