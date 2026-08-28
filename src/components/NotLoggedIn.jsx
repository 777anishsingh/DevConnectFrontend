import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const NotLoggedIn = () => {
    return (
        <div>
            <div className='font-semibold mb-3 text-5xl text-center'>Please login to continue</div>
            <div className="flex justify-center mt-10">
                <Button className={"bg-white cursor-pointer text-black"}>
                    <Link to={"/login"}>Go Back</Link>
                </Button>
            </div>
        </div>
    )
}

export default NotLoggedIn