import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

const reviews = [
    {
        name: "Aarav",
        username: "@aarav",
        body: "DevConnect makes it so easy to discover developers and build meaningful connections. I love it.",
        img: "https://avatar.vercel.sh/aarav",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. DevConnect is such a great place to meet developers and connect.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "Priya",
        username: "@priya",
        body: "I've never found networking this simple before. DevConnect makes meeting developers effortless.",
        img: "https://avatar.vercel.sh/priya",
    },
    {
        name: "James",
        username: "@james",
        body: "DevConnect is an amazing platform for discovering talented developers and growing your network.",
        img: "https://avatar.vercel.sh/james",
    },
    {
        name: "Rohan",
        username: "@rohan",
        body: "I'm really enjoying DevConnect. Finding developers with similar interests has never been this easy.",
        img: "https://avatar.vercel.sh/rohan",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "This is exactly what I needed. DevConnect makes connecting with developers feel simple and natural.",
        img: "https://avatar.vercel.sh/jane",
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
    img,
    name,
    username,
    body,
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    )
}

export function ReviewCards() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:50s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:50s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    )
}
