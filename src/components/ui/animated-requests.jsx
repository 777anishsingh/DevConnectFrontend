"use client";;
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { BASE_URL } from "@/utils/constants";
import { log } from "three";
import requestStore from "@/stores/requestStore";
import axios from "axios";

export const AnimatedRequests = ({
    testimonials,
    autoplay = false
}) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };

    const removeRequests = requestStore(state => state.removeRequests)

    const handleRequest = async (status, fromUserId) => {
        if (!fromUserId) {
            console.error("fromUserId is undefined");
            return;
        }
        try {
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${fromUserId}`,
                {},
                {
                    withCredentials: true
                })
            // console.log(res.data);
            removeRequests(fromUserId);
        } catch (err) {
            console.log("Backend response:", err?.response?.data);
            console.log("Error:", err?.message);
        }
    }


    return (
        <div
            className="mx-auto max-w-sm px-4 py-20 bg-black rounded-4xl mt-5 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
                <div>
                    <div className="relative h-110 w-full">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial?.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : randomRotateY(),
                                        zIndex: isActive(index)
                                            ? 40
                                            : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -80, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: randomRotateY(),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom">
                                    <img
                                        src={testimonial?.src}
                                        alt={testimonial?.firstName}
                                        width={500}
                                        height={500}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl object-cover object-center" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex flex-col justify-between py-4">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}>
                        <h3 className="text-2xl font-bold text-black dark:text-white">
                            {testimonials[active]?.firstName} {testimonials[active]?.lastName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-neutral-500">
                            Age: {testimonials[active]?.age}, {testimonials[active]?.gender}
                        </p>
                        <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                            {testimonials[active]?.about?.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block">
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex justify-center gap-4 pt-12 md:pt-0">
                        <button
                            onClick={handlePrev}
                            className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                            <IconArrowLeft
                                className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                            <IconArrowRight
                                className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
                        </button>
                    </div>
                    <div className="flex mt-5 gap-4 justify-center items-center">
                        <Button
                            onClick={() => handleRequest("reject", testimonials[active]._id)}
                            className="bg-[#457B9D] cursor-pointer hover:bg-[#16476A] h-10 w-40">
                            Ignore
                        </Button>
                        <Button
                            onClick={() => handleRequest("accept", testimonials[active]._id)}
                            className="bg-[#E63946] cursor-pointer hover:bg-[#BF092F] h-10 w-40">
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
