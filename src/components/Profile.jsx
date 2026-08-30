"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Lens } from "./ui/lens";
import { motion } from "motion/react";
import userStore from "@/stores/userStore";
import EditProfile from "./EditProfile";
import NotLoggedIn from "./NotLoggedIn";

const Profile = () => {

  const user = userStore(state => state.user)

  const {
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills
  } = user || {};
  const [hovering, setHovering] = useState(false);

  if (!user) {
    return (
      <div>
        <NotLoggedIn />
      </div>
    )
  }

  return (
    user && (
      <>
        <h1 className='font-semibold mb-3 text-5xl mask-t-from-neutral-100 text-center'>My Profile</h1>

        <div className='flex flex-col md:flex-row'>
          <div
            className="shadow-input max-h-180 mt-10 mx-auto w-full max-w-md p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="flex mb-5 justify-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
              {firstName}'s Card Preview
            </h2>
            <Lens hovering={hovering} setHovering={setHovering}>
              <img
                src={photoUrl}
                alt={firstName}
                height="400"
                width="335"
                className="object-cover ml-7 h-80 rounded-full" />
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
                className="bg-[#457B9D] cursor-pointer hover:bg-[#16476A] h-10 w-40">
                Pass
              </Button>
              <Button
                className="bg-[#E63946] cursor-pointer hover:bg-[#BF092F] h-10 w-40">
                Like
              </Button>
            </div>
          </div>
          <EditProfile user={user} />
        </div>
      </>

    )
  )
}

export default Profile