"use client";
import { Globe3D } from "@/components/ui/3d-globe";
import { Link } from "react-router-dom";

const sampleMarkers = [
    // 🇮🇳 INDIA — 8
    {
        lat: 28.6139,
        lng: 77.209,
        src: "https://assets.aceternity.com/avatars/6.webp",
        label: "New Delhi",
    },
    {
        lat: 19.076,
        lng: 72.8777,
        src: "https://assets.aceternity.com/avatars/2.webp",
        label: "Mumbai",
    },
    {
        lat: 12.9716,
        lng: 77.5946,
        src: "https://assets.aceternity.com/avatars/11.webp",
        label: "Bengaluru",
    },
    {
        lat: 13.0827,
        lng: 80.2707,
        src: "https://assets.aceternity.com/avatars/4.webp",
        label: "Chennai",
    },
    {
        lat: 17.385,
        lng: 78.4867,
        src: "https://assets.aceternity.com/avatars/8.webp",
        label: "Hyderabad",
    },
    {
        lat: 22.5726,
        lng: 88.3639,
        src: "https://assets.aceternity.com/avatars/1.webp",
        label: "Kolkata",
    },
    {
        lat: 18.5204,
        lng: 73.8567,
        src: "https://assets.aceternity.com/avatars/13.webp",
        label: "Pune",
    },
    {
        lat: 23.0225,
        lng: 72.5714,
        src: "https://assets.aceternity.com/avatars/5.webp",
        label: "Ahmedabad",
    },

    // 🌎 SOUTH AMERICA — 5
    {
        lat: -23.5505,
        lng: -46.6333,
        src: "https://assets.aceternity.com/avatars/3.webp",
        label: "São Paulo",
    },
    {
        lat: -34.6037,
        lng: -58.3816,
        src: "https://assets.aceternity.com/avatars/11.webp",
        label: "Buenos Aires",
    },
    {
        lat: -22.9068,
        lng: -43.1729,
        src: "https://assets.aceternity.com/avatars/8.webp",
        label: "Rio de Janeiro",
    },
    {
        lat: 4.711,
        lng: -74.0721,
        src: "https://assets.aceternity.com/avatars/7.webp",
        label: "Bogotá",
    },
    {
        lat: -12.0464,
        lng: -77.0428,
        src: "https://assets.aceternity.com/avatars/10.webp",
        label: "Lima",
    },

    // 🇺🇸🇨🇦 NORTH AMERICA — 5
    {
        lat: 40.7128,
        lng: -74.006,
        src: "https://assets.aceternity.com/avatars/1.webp",
        label: "New York",
    },
    {
        lat: 37.7749,
        lng: -122.4194,
        src: "https://assets.aceternity.com/avatars/4.webp",
        label: "San Francisco",
    },
    {
        lat: 34.0522,
        lng: -118.2437,
        src: "https://assets.aceternity.com/avatars/9.webp",
        label: "Los Angeles",
    },
    {
        lat: 43.6532,
        lng: -79.3832,
        src: "https://assets.aceternity.com/avatars/12.webp",
        label: "Toronto",
    },
    {
        lat: 19.4326,
        lng: -99.1332,
        src: "https://assets.aceternity.com/avatars/5.webp",
        label: "Mexico City",
    },

    // 🌏 ASIA — 5
    {
        lat: 35.6762,
        lng: 139.6503,
        src: "https://assets.aceternity.com/avatars/3.webp",
        label: "Tokyo",
    },
    {
        lat: 37.5665,
        lng: 126.978,
        src: "https://assets.aceternity.com/avatars/13.webp",
        label: "Seoul",
    },
    {
        lat: 31.2304,
        lng: 121.4737,
        src: "https://assets.aceternity.com/avatars/9.webp",
        label: "Shanghai",
    },
    {
        lat: 1.3521,
        lng: 103.8198,
        src: "https://assets.aceternity.com/avatars/12.webp",
        label: "Singapore",
    },
    {
        lat: 13.7563,
        lng: 100.5018,
        src: "https://assets.aceternity.com/avatars/6.webp",
        label: "Bangkok",
    },

    // 🇪🇺 EUROPE — 4
    {
        lat: 51.5074,
        lng: -0.1278,
        src: "https://assets.aceternity.com/avatars/2.webp",
        label: "London",
    },
    {
        lat: 48.8566,
        lng: 2.3522,
        src: "https://assets.aceternity.com/avatars/5.webp",
        label: "Paris",
    },
    {
        lat: 52.52,
        lng: 13.405,
        src: "https://assets.aceternity.com/avatars/7.webp",
        label: "Berlin",
    },
    {
        lat: 41.9028,
        lng: 12.4964,
        src: "https://assets.aceternity.com/avatars/3.webp",
        label: "Rome",
    },

    // 🌍 AFRICA / MIDDLE EAST — 3
    {
        lat: 25.2048,
        lng: 55.2708,
        src: "https://assets.aceternity.com/avatars/10.webp",
        label: "Dubai",
    },
    {
        lat: 30.0444,
        lng: 31.2357,
        src: "https://assets.aceternity.com/avatars/4.webp",
        label: "Cairo",
    },
    {
        lat: -1.2921,
        lng: 36.8219,
        src: "https://assets.aceternity.com/avatars/8.webp",
        label: "Nairobi",
    },
];

export default function HeroGlobe3D() {
    return (
        <div className="relative mx-auto h-[605px] w-full max-w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-950">
            <div className="relative z-10 p-4 md:p-12">
                <h2 className="mb-4 max-w-2xl text-2xl font-extrabold tracking-tight text-balance text-neutral-900 md:text-5xl lg:text-6xl dark:text-white">
                    DevConnect: Social Media for professionals
                </h2>
                <p className="mt-2 max-w-lg text-balance text-neutral-600 md:mt-8 md:text-lg dark:text-neutral-400">
                    Sign up start making real connections all over the world with one click.
                </p>

                <div className="mt-4 flex gap-4 md:mt-8">
                    <button className="flex cursor-pointer rounded-4xl items-center justify-center bg-neutral-900 px-4 py-2 font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-neutral-900 transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-98">
                        <Link to={"/login"} >Get Started</Link>
                    </button>
                    <button className="flex cursor-pointer items-center justify-center rounded-4xl bg-white px-4 py-2 font-medium text-neutral-900 ring ring-neutral-200 transition-all duration-200 ring-inset hover:bg-neutral-50 hover:ring-neutral-300 active:scale-98">
                        <Link to={"https://github.com/777anishsingh/DevConnect"} >About Us</Link>
                    </button>
                </div>
            </div>
            {/* Globe container - sized and positioned just for the globe */}
            <div className="absolute -right-20 -bottom-10 z-10 size-100 md:-right-50 md:-bottom-50 md:size-220">
                <Globe3D
                    className="h-full w-full"
                    markers={sampleMarkers}
                    config={{
                        atmosphereColor: "#4da6ff",
                        atmosphereIntensity: 20,
                        bumpScale: 5,
                        autoRotateSpeed: 0.5,
                    }}
                    onMarkerClick={(marker) => {
                        console.log("Clicked marker:", marker.label);
                    }}
                    onMarkerHover={(marker) => {
                        if (marker) {
                            console.log("Hovering:", marker.label);
                        }
                    }}
                />
            </div>
        </div>
    );
}
