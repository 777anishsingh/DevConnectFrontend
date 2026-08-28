
import React from 'react'
import { Button } from './ui/button'

const Footer = () => {
    return (
        <>
            <footer className="footer sm:footer-horizontal bg-black text-neutral-content items-center p-4 rounded-t-lg px-5">
                <aside className="grid-flow-col items-center">
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a>
                        <img
                            src="https://img.favpng.com/19/25/9/scalable-vector-graphics-github-computer-icons-logo-computer-file-png-favpng-GRYRADbE9437SkThu9hB2QtbQ.jpg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            className="fill-current cursor-pointer rounded-full">
                        </img>
                    </a>
                    <a>
                        <img
                            src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMy0xMC5wbmc.png"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            className="fill-current cursor-pointer rounded-full">
                        </img>
                    </a>
                </nav>
            </footer>
        </>
    )
}

export default Footer