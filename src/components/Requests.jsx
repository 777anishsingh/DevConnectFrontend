import React from 'react'
import RequestCards from './RequestCards'


const Requests = () => {
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