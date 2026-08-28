"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import userStore from "@/stores/userStore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { div } from "three/src/nodes/math/OperatorNode.js";
import feedStore from "@/stores/feedStore";
import requestStore from "@/stores/requestStore";
import connectionStore from "@/stores/connectionStore";
import NotLoggedIn from "./NotLoggedIn";


export default function NavbarDemo({
  className
}) {
  const [active, setActive] = useState(null);
  const user = userStore(state => state.user);
  const removeUser = userStore(state => state.removeUser)
  const clearFeed = feedStore(state => state.clearFeed);
  const clearRequests = requestStore(state => state.clearRequests);
  const clearConnections = connectionStore(state => state.clearConnections);

  const handleLogout = async () => {
    try {
      axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true,
      })
      removeUser();
      clearFeed();
      clearRequests();
      clearConnections();
    } catch (error) {
      console.log("Backend response:", err.response?.data);
      console.log("Error:", err.message);
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-5 z-50 rounded-[45px] bg-black dark:border-white/20 border mx-auto flex max-w-4xl items-center justify-between",
        className
      )}
    >
      {/* Logo */}
      <div className="shrink-0 mx-2">
        <Link to={user ? "/feed" : "/"}>
          <div className="cursor-pointer p-2 bg-linear-to-r from-[#000000] to-[#434343] hover:from-[#434343]
           hover:to-[#000000] text-white font-semibold rounded-full transition-colors duration-500">
            DevConnect
          </div>
        </Link>
      </div>

      {/* Menu */}
      {!user ? (
        <Menu setActive={setActive}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Get Started"
          >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href={"/login"}>
                {/* <Link to={"/login"}> */}
                Login
                {/* </Link> */}
              </HoveredLink>
              <HoveredLink href={"/login"}>
                {/* <Link to=> */}
                Signup
                {/* </Link> */}
              </HoveredLink>
            </div>
          </MenuItem>

          <MenuItem
            setActive={setActive}
            active={active}
            item="Products"
          >
            <div className="grid grid-cols-2 gap-10 p-4 text-sm">
              <ProductItem
                title="Algochurn"
                href="https://github.com/777anishsingh/MyShoppy"
                src="https://ik.imagekit.io/dvf0dwm9d/devconnect/profile/ChatGPT%20Image%20Aug%2028,%202026,%2004_25_38%20AM.png"
                description="MyShopy, A Mobile-first e-commerce experience built with Expo Router and React Native for easy shopping."
              />

              <ProductItem
                title="NextDEV: Your AI Dev"
                href="https://nextdev-app.vercel.app/"
                src="https://ik.imagekit.io/dvf0dwm9d/devconnect/profile/Screenshot%202026-08-28%20042240.png"
                description="An innovative AI SaaS to generate beautiful web apps through simple prompts."
              />
            </div>
          </MenuItem>

          <MenuItem
            setActive={setActive}
            active={active}
            item="Pricing"
          >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      ) : (
        <div className="h-14.25"></div>
      )
      }

      {/* User image */}
      {
        user ? (
          <div className="flex gap-2 items-center">

            <div className="">Welcome, {user?.firstName}</div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn mr-2 btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu text-2xl bg-black menu-sm dropdown-content rounded-box z-1 mt-5 gap-3 w-35 shadow">
                <li><Link to={"/feed"}>My Feed</Link></li>
                <li><Link to={"/requests"}>My Requests </Link></li>
                <li><Link to={"/connections"}>My Connections </Link></li>
                <li><Link to={"/profile"}>Update Profile</Link></li>
                <li><Link to={"/password/edit"}>Update Password</Link></li>
                <li><Link to={"/login"} onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>
          </div>
        )
          :
          (
            <div className="flex-shrink-0 mx-2 flex">
              <div></div>
              <div className="h-10 w-10 rounded-full object-cover bg-black"></div>
            </div>
          )
      }

    </div >
  );
}
