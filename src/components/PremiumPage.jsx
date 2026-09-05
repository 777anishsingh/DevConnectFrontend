import React, { useEffect, useState } from "react";
import { Check, Sparkles, Zap } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import userStore from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

const plans = [

    {
        name: "Pro",
        description: "For developers who want more from DevConnect.",
        price: 299,
        period: "/month",
        icon: Zap,
        features: [
            "Everything in free",
            "Unlimited developer connections",
            "100 Connection requests per day",
            "Blue Profile verification badge",
            "Priority profile visibility",
            "Unlimited project listings",
            "Enhanced developer profile",
        ],
        button: "Upgrade to Pro",
    },
    {
        name: "Ultimate",
        description: "Everything you need to build, connect and grow.",
        price: 599,
        period: "/month",
        icon: Sparkles,
        popular: true,
        features: [
            "Everything in Pro",
            "Unlimited request in a day",
            "AI-powered developer matching",
            "Unlimited community creation",
            "Gold Profile verification badge",
            "Priority support",
            "Early access to new features",
        ],
        button: "Get Ultimate",
    },
];

export default function PremiumPage() {
    const [isUserPremium, setIsUserPremium] = useState(false);
    const user = userStore(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            verifyPremiumUser();
        }
    }, [])

    const verifyPremiumUser = async () => {
        const res = await axios.get(BASE_URL + "/payment/verify", {
            withCredentials: true
        });
        if (res.data.isPremium) {
            setIsUserPremium(true);
        }
    }

    const handleBuyClick = async (membershipType) => {
        try {
            const order = await axios.post(BASE_URL + "/payment/create", {
                membershipType
            }, {
                withCredentials: true,
            }
            );

            const { amount, keyId, currency, notes, orderId } = order.data;
            const options = {
                key: keyId,
                amount,
                currency,
                name: 'DevConnect',
                description: 'Connect to other developers with this subscription.',
                order_id: orderId,
                prefill: {
                    name: `${notes.firstName} ${notes.lastName}`,
                    email: notes.emailId,
                },
                theme: {
                    color: '#F37254'
                },
                handler: verifyPremiumUser
            };

            const rzp = new Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment initialization failed:", err);
        }
    }


    return isUserPremium ? (
        <section className="w-full bg-[#0A0A0A] px-6 py-2 text-white">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
                        DevConnect Premium
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                        You are Already{" "}
                        <span className="text-neutral-400">a premium User.</span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-neutral-500">
                        You just unlocked the powerful features designed that helps you connect with
                        developers, build projects and grow your network.
                    </p>
                </div>
            </div>
        </section >
    ) : (
        <section className="w-full bg-[#0A0A0A] px-6 py-2 text-white">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
                        DevConnect Premium
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Choose your{" "}
                        <span className="text-neutral-400">developer journey.</span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-neutral-500">
                        Unlock powerful features designed to help you connect with
                        developers, build projects and grow your network.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-6 md:grid-cols-2">

                    {plans.map((plan) => {
                        const Icon = plan.icon;

                        return (
                            <div
                                key={plan.name}
                                className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${plan.popular
                                    ? "border-white/20 bg-white/[0.07] shadow-2xl shadow-white/[0.04]"
                                    : "border-white/10 bg-white/[0.03]"
                                    }`}
                            >

                                {/* Popular badge */}
                                {plan.popular && (
                                    <div className="absolute right-6 top-6 rounded-full border hover:bg-red-400 transition-colors duration-300 border-white/10 bg-white px-3 py-1 text-xs font-semibold text-black">
                                        Most Popular
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                                    <Icon size={21} />
                                </div>

                                {/* Plan */}
                                <h3 className="text-2xl font-semibold">{plan.name}</h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mt-8 flex items-end gap-1">
                                    <span className="text-5xl font-bold tracking-tight">
                                        {plan.price}
                                    </span>

                                    <span className="mb-2 text-sm text-neutral-500">
                                        {plan.period}
                                    </span>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() =>
                                        !user
                                            ? navigate("/login")
                                            : handleBuyClick(plan.name)
                                    }
                                    className={`mt-8 w-full rounded-xl px-5 py-3 text-sm font-semibold transition-all ${plan.popular
                                        ? "bg-white text-black transition-colors duration-300 hover:bg-[#d89b00]"
                                        : "border border-white/10 bg-white/[0.06] text-white transition-colors duration-300 hover:bg-[#3366ff]"
                                        }`}
                                >
                                    {plan.button}
                                </button>

                                {/* Divider */}
                                <div className="my-8 h-px bg-white/10" />

                                {/* Features */}
                                <div>
                                    <p className="mb-5 text-sm font-medium text-neutral-300">
                                        What's included
                                    </p>

                                    <ul className="space-y-4">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3 text-sm text-neutral-400"
                                            >
                                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                                                    <Check size={12} className="text-white" />
                                                </div>

                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section >
    );
}
