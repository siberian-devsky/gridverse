'use client'
import { SetStateAction } from "react"
import clsx from "clsx"
import ThemeToggleButton from "../Theme/ThemeToggleButton"

type HeaderProps = {
    showAddCellModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteBoxes: React.Dispatch<SetStateAction<boolean>>,
    numCellsMarked: number
    showDeleteBoxes: boolean,
}

export default function Header({
    showAddCellModal: showAddCellModal,
    setShowDeleteBoxes: setShowDeleteBoxes,
    numCellsMarked,
    showDeleteBoxes
}: HeaderProps ) {

    function handleClick() {
        if (numCellsMarked === 0) {
            // just show the boxes
            setShowDeleteBoxes(prev => !prev)
        } else if (numCellsMarked > 0) {
            // if even one cell is marked the button will have changed 
            // to a 'confirm delete' role - so delete all marked cells
        } else {
            // try and get here, code
            return
        }
    }

    function getButtonStyle() {
        const base = 'text-xs w-auto p-2 rounded-2xl border-[1px] border-slate-700'
        if (showDeleteBoxes && numCellsMarked > 0)
            return `${base} bg-red-500 text-white`
        else if (showDeleteBoxes && numCellsMarked === 0)
            return `${base} bg-yellow-400 text-black`
        else
            return `${base} hover:bg-red-500`
    }

    return(
        <header 
            className="fixed top-0 left-0 z-50 border border-black bg-purple-500
                w-screen h-16 flex flex-row items-center justify-between
                px-4 py-2"
        >
            <div className="flex gap-4">
                <button className="text-xs w-auto p-2 rounded-2xl border-[1px] border-slate-700 hover:bg-lime-600"
                    onClick={() => showAddCellModal(true)}
                    >
                    Add Cell
                </button>
                <button
                    onClick={handleClick}
                    className={clsx(
                        'text-xs w-auto p-2 rounded-2xl border-[1px] border-slate-700',
                        {
                            'bg-red-500 text-white': showDeleteBoxes && numCellsMarked > 0,
                            'bg-yellow-400 text-black': showDeleteBoxes && numCellsMarked === 0,
                            'hover:bg-red-500': !showDeleteBoxes,
                        }
                    )}
                >
                    {showDeleteBoxes && numCellsMarked > 0
                        ? 'Confirm Delete'
                        : showDeleteBoxes && numCellsMarked === 0
                            ? 'Cancel'
                            : 'Mark For Deletion'
                    }
                </button>

            </div>
            <ThemeToggleButton />
        </header>
    )
}