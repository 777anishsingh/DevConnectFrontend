import requestStore from "@/stores/requestStore";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { AnimatedRequests } from "./ui/animated-requests";
import userStore from "@/stores/userStore";
import NotLoggedIn from "./NotLoggedIn";

export default function RequestCards() {

    const { requests, setRequests } = requestStore();
    const user = userStore(state => state.user)

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });

            const requests = res?.data?.data;
            const fromUsers = requests.map((request) => request.fromUserId);

            setRequests(fromUsers);

        } catch (error) {
            console.log("Backend response:", err.response?.data);
            console.log("Error:", err.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchRequests();
        }
    }, [user])

    if (!requests) {
        if (!user) {
            return (
                <NotLoggedIn />
            )
            console.log("3");
        } else {
            return (
                <div >
                    <div className='font-semibold text-5xl mask-t-from-neutral-100 text-center'>
                        Loading...
                    </div>
                </div>
            )
        }
    };

    if (requests.length === 0) {
        return (
            <div className='text-center mt-10 text-4xl'>
                <h1>No Requests found</h1>
            </div>
        );
    }

    const requestsProp = requests.map((request) => ({
        _id: request?._id,
        about: request?.about,
        firstName: request?.firstName,
        lastName: request?.lastName,
        age: request?.age,
        gender: request?.gender,
        src: request?.photoUrl,
    }));



    return <AnimatedRequests testimonials={requestsProp} />;
}