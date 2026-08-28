"use client"
import HeroGlobe3D from "./HeroGlobe3D"
import { MacbookScrollAnimation } from "./MackbookScrollAnimation"
import { ReviewCards } from "./ReviewCards"

export function Hero() {
    return (
        <div>
            <div>
                <HeroGlobe3D />
            </div>
            <div className="flex w-full bg-linear-to-r from-[#000000] to-[#434343] h-1"></div>
            <div>
                <MacbookScrollAnimation />
            </div>
            <div className="flex w-full bg-linear-to-r from-[#000000] to-[#434343] h-1"></div>
            <div className='mt-7 text-5xl mask-t-from-neutral-100 text-center'>Reviews:</div>
            <div className="mt-20">
                <ReviewCards />
            </div>
            <div className="flex mt-10 w-full bg-linear-to-r from-[#000000] to-[#434343] h-1"></div>
            <div className='mt-7 text-4xl mask-t-from-neutral-100 text-center'>Connect with us, Links are below</div>
            <div className='mt-7 text-4xl mask-t-from-neutral-100 text-center'>↓</div>

        </div>
    )
}
