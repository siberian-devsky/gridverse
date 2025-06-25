'use client'
// import ThemeToggleButton from "../Theme/ThemeToggleButton"
import HomeGrownToggle from "../Theme/HomeGrownToggle"

type HeaderProps = {
    showModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ showModal }: HeaderProps ) {
    return(
        <header 
            className="fixed top-0 left-0 border border-black bg-purple-500 z-10
                w-screen h-16 flex flex-row items-center justify-between
                px-4 py-2"
        >
            <div className="flex gap-4">
                <button className="hover:bg-purple-700 w-auto p-2 rounded-4xl border-4 border-blue-400 bg-emerald-500/70"
                    onClick={() => showModal(true)}
                    >
                    Add Cell
                </button>
                <button className="hover:bg-purple-700 w-auto p-2 rounded-4xl border-4 border-blue-400 bg-pink-500/70"
                    onClick={() => showModal(false)}
                >
                    Remove Cell
                </button>
            </div>
            {/* <ThemeToggleButton /> */}
            <HomeGrownToggle />
        </header>
    )
}