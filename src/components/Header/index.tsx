'use client'
import { SetStateAction } from "react"
import ThemeToggleButton from "../Theme/ThemeToggleButton"
import AnimatedButton from "./AnimatedButton"
// import HomeGrownToggle from "../Theme/HomeGrownToggle"

type HeaderProps = {
    showAddCellModal: React.Dispatch<SetStateAction<boolean>>,
    setShowDeleteBoxes: React.Dispatch<SetStateAction<boolean>>,
    numCellsChecked: number,
    showDeleteBoxes: boolean,
}

export default function Header({
    showAddCellModal,
    showDeleteBoxes,
    setShowDeleteBoxes,
    numCellsChecked,
}: HeaderProps ) {
    return(
        <header 
            className="fixed top-0 left-0 z-50 border border-black bg-purple-500
                w-screen h-16 flex flex-row items-center justify-between
                px-4 py-2"
        >
            <div className="flex flex-row gap-4">
                <button className="text-sm w-auto p-2 rounded-2xl text-white bg-lime-600"
                    onClick={() => showAddCellModal(true)}
                    >
                    New Cell
                </button>
                <AnimatedButton
                    showDeleteBoxes={showDeleteBoxes}
                    setShowDeleteBoxes={setShowDeleteBoxes}
                    numCellsChecked={numCellsChecked}
                />
            </div>
            <ThemeToggleButton />
        </header>
    )
}