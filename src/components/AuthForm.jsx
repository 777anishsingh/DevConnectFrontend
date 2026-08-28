"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import userStore from "@/stores/userStore";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/utils/constants";

export default function AuthForm() {

  const [emailId, setEmailId] = useState("elon@gmail.com")
  const [password, setPassword] = useState("Elon@123");
  const setUser = userStore(state => state.setUser)
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, {
        withCredentials: true
      });

      setUser(res.data.user)
      setError("")
      navigate('/feed')
    } catch (err) {
      setError(err.response?.data)
      console.log("Backend response:", err?.response?.data);
      console.log("Error:", err);
    }
  };



  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName, lastName, emailId, password
      }, {
        withCredentials: true
      })
      setUser(res?.data?.user)
      setError("")
      return navigate("/profile")


    } catch (err) {
      setError(err.response?.data)
      console.log("Backend response:", err?.response?.data);
      console.log("Error:", err);
    }
  }

  return (
    <div
      className={`shadow-input mt-20 mx-auto w-full max-w-md ${isLoginForm ? "h-150" : "h-105"} p-4 md:rounded-2xl md:p-8 dark:bg-black`}>
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to DevConnect
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {!isLoginForm ? "Signin to your account" : "Signup to create an account"}
      </p>

      <form className="my-4" onSubmit={!isLoginForm ? handleLogin : handleSignUp}>

        {
          isLoginForm && <div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstName"
                placeholder="Anish"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastName"
                placeholder="Singh"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
            </LabelInputContainer>
          </div>
        }



        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="anish@gmail.com"
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>
        <div className="flex justify-center items-center ">
          {!isLoginForm ?
            (<button
              className="mt-2 group/btn relative block h-10 w-full rounded-4xl bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit">
              Sign In &rarr;
              <BottomGradient />
            </button>) :
            (
              <button
                className="mt-2 group/btn relative block h-10 w-full rounded-4xl bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit">
                Sign Up &rarr;
                <BottomGradient />
              </button>
            )}
        </div>
        <p
          onClick={() => { !isLoginForm ? setIsLoginForm(true) : setIsLoginForm(false) }}
          className="my-3 text-center hover:text-blue-300 cursor-pointer">
          {isLoginForm ? "Existing User? Login here" : "New User? Sign-up here"}
        </p>
        <div className="text-red-400 mt-5 flex justify-center">{error}</div>
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
