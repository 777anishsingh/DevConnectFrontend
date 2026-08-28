import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export function MacbookScrollAnimation() {
    return (
        <div className="w-full h-350 -mt-70 overflow-hidden bg-[#0A0A0A]">
            <MacbookScroll
                title={
                    <span>
                        Welcome to DevConnect where professionals make real connections not just friends <br /> No kidding.
                    </span>
                }
                src={"https://ik.imagekit.io/dvf0dwm9d/devconnect/profile/Screenshot%202026-08-28%20144507.png"}
                showGradient={false} />
        </div>
    );
}
