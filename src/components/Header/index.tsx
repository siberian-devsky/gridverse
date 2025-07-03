'use client'
import { SetStateAction } from "react"
import AnimatedButton from "./AnimatedButton"
import ThemeSlider from "../Theme/ThemeSlider"

type HeaderProps = {
    showAddCellModal: React.Dispatch<SetStateAction<boolean>>,
    setShowDeleteBoxes: React.Dispatch<SetStateAction<boolean>>,
    numCellsChecked: number,
    showDeleteBoxes: boolean,
    resetAllCellStates: () => void,
}

export default function Header({
    showAddCellModal,
    showDeleteBoxes,
    setShowDeleteBoxes,
    numCellsChecked,
    resetAllCellStates,
}: HeaderProps ) {
    return(
        <header 
            className="fixed top-0 left-0 z-50 border border-black bg-slate-600
                w-screen h-16 flex flex-row items-center justify-between
                px-4 py-2"
        >
            <div className="flex flex-row gap-4">
                <button
                    className="text-sm w-auto p-2 rounded-2xl text-white bg-lime-600"
                    onClick={() => showAddCellModal(true)}
                    >
                    New Cell
                </button>
                <AnimatedButton
                    showDeleteBoxes={showDeleteBoxes}
                    setShowDeleteBoxes={setShowDeleteBoxes}
                    numCellsChecked={numCellsChecked}
                    resetAllCellStates={resetAllCellStates}
                />
            </div>
            <ThemeSlider />
        </header>
    )
}