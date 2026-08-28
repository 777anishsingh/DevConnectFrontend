"use client";;
import React, { useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "./ui/button";
import { Lens } from "./ui/lens";
import { motion } from "motion/react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import feedStore from "@/stores/feedStore";



export function UserCard({ user }) {
    // console.log(user);
    const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
    const [hovering, setHovering] = useState(false);
    const removeFeed = feedStore(state => state.removeFeed);

    const handleSendRequest = async (status, toUserId) => {

        if (!toUserId) {
            console.error("toUserId is undefined");
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`,
                {},
                {
                    withCredentials: true
                })
            // console.log(res.data);
            removeFeed(toUserId);

        } catch (err) {
            console.log("Backend response:", err?.response?.data);
            console.log("Error:", err?.message);
        }
    }

    return (
        <div className="flex justify-center">
            <BackgroundGradient className="rounded-[50px]  max-w-sm p-4 sm:p-10 bg-white dark:bg-black">
                <Lens hovering={hovering} setHovering={setHovering}>
                    <img
                        src={photoUrl}
                        alt={firstName}
                        height="400"
                        width="400"
                        className="object-cover h-80 rounded-full" />
                </Lens>
                <motion.div
                    animate={{
                        filter: hovering ? "blur(2px)" : "blur(0px)",
                    }}
                    className="py-3 relative z-20"
                ></motion.div>
                <div className="flex justify-between">
                    <p className="text-base sm:text-xl font-semibold mt-4 mb-2 dark:text-neutral-200">
                        {firstName + " " + lastName}
                    </p>
                    <p className="text-base sm:text-xl font-semibold mt-4 mb-2 dark:text-neutral-200">
                        Age: {age}, {gender}
                    </p>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {about}
                </p>
                <div className="flex mt-5 gap-4 justify-center items-center">
                    <Button
                        onClick={() => { handleSendRequest("ignore", _id) }}
                        className="bg-[#457B9D] cursor-pointer hover:bg-[#16476A] h-10 w-40">
                        Pass
                    </Button>
                    <Button
                        onClick={() => { handleSendRequest("interested", _id) }}
                        className="bg-[#E63946] cursor-pointer hover:bg-[#BF092F] h-10 w-40">
                        Like
                    </Button>
                </div>
            </BackgroundGradient>
        </div>
    );
}
