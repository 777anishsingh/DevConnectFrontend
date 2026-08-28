"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import userStore from "@/stores/userStore";
import { BASE_URL } from "@/utils/constants";
import { upload } from "@imagekit/react";
import { toast } from "./ui/toast";
import { Textarea } from "./ui/textarea";

export default function EditProfile({ user }) {

    const setUser = userStore(state => state.setUser)
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [age, setAge] = useState(user?.age || "")
    const [about, setAbout] = useState(user?.about || "")
    const [skills, setSkills] = useState("")
    const [photo, setPhoto] = useState(null)
    const [error, setError] = useState("")
    const [gender, setGender] = useState(user?.gender)


    const uploadImage = async () => {

        const authResponse = await axios.get(
            BASE_URL + "/imagekit/auth",
            {
                withCredentials: true,
            }
        );

        const {
            token,
            expire,
            signature,
            publicKey,
        } = authResponse.data;

        const result = await upload({
            file: photo,
            fileName: photo.name,
            token,
            expire,
            signature,
            publicKey,
            folder: "/devconnect/profile",
            useUniqueFileName: true,
        });


        return result.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let uploadedPhotoUrl = user.photoUrl;

            if (photo) {
                uploadedPhotoUrl = await uploadImage();
            }

            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    skills: skills
                        .split(",")
                        .map(skill => skill.trim())
                        .filter(Boolean),
                    about,
                    photoUrl: uploadedPhotoUrl,
                },
                {
                    withCredentials: true,
                }

            );
            setUser(res?.data?.loggedInUser);
            // setUser(res.data.loggedInUser)
            setError("")
            setPhoto(null)

        }

        catch (err) {
            setError(err.response?.data)
            console.log("FULL ERROR:", err);
        }
    };


    return (

        <div
            className="shadow-input mt-10 mx-auto w-full max-w-md p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="flex justify-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Edit your profile
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>

                <LabelInputContainer className="mb-4">
                    <div className="flex mb-5 justify-center">
                        <img
                            src={
                                photo
                                    ? URL.createObjectURL(photo)
                                    : user?.photoUrl
                            }
                            alt={firstName}
                            height="400"
                            width="400"
                            className="h-40 w-40 object-cover rounded-full"
                        />
                    </div>

                    <Label>Upload Image</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                                setPhoto(file);
                            }
                        }}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label>First Name:</Label>
                    <Input
                        id="firstName"
                        placeholder="Enter you first name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </LabelInputContainer>


                <LabelInputContainer className="mb-4">
                    <Label>Last Name:</Label>
                    <Input
                        id="lastName"
                        placeholder="Enter you last name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label>Age:</Label>
                    <Input
                        id="age"
                        placeholder="Enter you Age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label>Gender:</Label>
                    <Input
                        id="gender"
                        placeholder="Enter your gender"
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label>Skills:</Label>
                    <Input
                        id="Skills"
                        placeholder="Enter your skills"
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label>About:</Label>
                    <Textarea
                        id="about"
                        placeholder="Enter you About"
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="bg-[#27272A]"
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


    );
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
