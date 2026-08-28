import React from 'react'
import ConnectionCards from './ConnectionCards'
import userStore from '@/stores/userStore'
import NotLoggedIn from './NotLoggedIn'

const Connections = () => {

    const user = userStore(state => state.user)

    if (!user) {
        return (
            <NotLoggedIn />

        )
    }

    return (
        <div>
            <div>
                <h1 className='font-semibold mb-3 text-5xl mask-t-from-neutral-100 text-center'>My Connections</h1>
                <ConnectionCards />
            </div>

        </div>
    )
}

export default Connections