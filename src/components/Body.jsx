import React, { useEffect } from 'react'
import NavbarDemo from './NavbarDemo'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '@/utils/constants'
import userStore from '@/stores/userStore'
import axios from 'axios'

const Body = () => {

    const setUser = userStore(state => state.setUser)
    const user = userStore(state => state.user)
    const fetchUser = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/profile/view",
                {
                    withCredentials: true
                }
            );
            // console.log("Backend response:", res.data);
            setUser(res.data?.loggedInUser);
        } catch (err) {
            // console.log("Backend response:", err.response?.data);
            // console.log("Error:", err.message);
        }
    }
    useEffect(() => {
        if (user) return;

        fetchUser();
    }, [user])

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-25">
                <NavbarDemo />
            </div>

            <main className="flex-1 mt-5 mb-10">
                <Outlet />

            </main>


            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Body