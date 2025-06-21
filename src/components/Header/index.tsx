'use client'
import ThemeToggleButton from "../Theme/ThemeToggleButton"

export default function Header() {
    return(
        <header 
            className="fixed top-0 left-0 border border-black bg-purple-500 z-10
                w-screen h-16 flex flex-row items-center justify-between
                px-4 py-2"
        >
            <div className="flex gap-4">
                <button className="hover:bg-purple-700 w-auto p-2 rounded-4xl border-4 border-blue-400 bg-emerald-500/70">Add Cell</button>
                <button className="w-auto p-2 rounded-4xl border-4 border-blue-400 bg-pink-500/70">Remove Cell</button>
            </div>
            <ThemeToggleButton />
        </header>
    )
}