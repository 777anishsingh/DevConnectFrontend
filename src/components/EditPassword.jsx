"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { cn } from "@/lib/utils";
import userStore from "@/stores/userStore";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/constants";
import feedStore from "@/stores/feedStore";
import requestStore from "@/stores/requestStore";
import connectionStore from "@/stores/connectionStore";
import { Button } from "./ui/button";
import NotLoggedIn from "./NotLoggedIn";


const EditPassword = () => {

    const navigate = useNavigate();
    const removeUser = userStore(state => state.removeUser)
    const clearFeed = feedStore(state => state.clearFeed);
    const clearRequests = requestStore(state => state.clearRequests);
    const clearConnections = connectionStore(state => state.clearConnections);
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const user = userStore(state => state.user)

    if (!user) {
        return (
            <NotLoggedIn />
        )
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("1")

        try {
            console.log("2")
            await axios.patch(BASE_URL + "/profile/password", {
                password: password,
                newPassword: newPassword,
                confirmNewPassword: confirmPassword
            }, {
                withCredentials: true,
            })
            console.log("3")

            removeUser();
            clearFeed();
            console.log("4")
            clearRequests();
            clearConnections();
            console.log(here)
            setError("")
            return navigate("/login")
        } catch (err) {
            setError(err.response?.data)
            console.log("FULL ERROR:", err);
        }
    }

    return (
        <>
            <div className='font-semibold mb-3 text-5xl mask-t-from-neutral-100 text-center'>Edit Password</div>

            <div
                className="shadow-input mt-10 mx-auto w-full max-w-md p-4 md:rounded-2xl md:p-8 dark:bg-black">
                <h2 className="flex justify-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Edit your profile password
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Current password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">New password</Label>
                        <Input
                            id="newPassword"
                            placeholder="••••••••"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Confirm new password</Label>
                        <Input
                            id="confirmPassword"
                            placeholder="••••••••"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </LabelInputContainer>

                    <div className="flex mt-10 justify-center items-center ">
                        <button
                            className="group/btn relative block h-10 w-full rounded-4xl bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                            type="submit">
                            Confirm Update &rarr;
                            <BottomGradient />
                        </button>
                    </div>
                    {error && (<div className="text-red-400 mt-5 flex justify-center">{error}</div>)}
                </form>
            </div>
        </>

    )
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span
                className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};

export default EditPassword