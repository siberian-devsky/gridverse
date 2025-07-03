import React from "react"
import clsx from "clsx"

type buttonProps = {
    showDeleteBoxes: boolean,
    setShowDeleteBoxes: React.Dispatch<React.SetStateAction<boolean>>,
    numCellsChecked: number,
    resetAllCellStates: () => void,
}

export default function AnimatedButton({
    showDeleteBoxes,
    setShowDeleteBoxes,
    numCellsChecked,
    resetAllCellStates,
}: buttonProps) {
    return (
        <div>
            {/* two stacked buttons */}
            <div className="relative">
                <button
                    onClick={() => {
                        if (showDeleteBoxes) {
                            // If we're cancelling, reset all cell states
                            resetAllCellStates()
                        }
                        setShowDeleteBoxes(prev => !prev)
                    }}
                    className={clsx(
                        'relative z-10 left-0 top-0 text-sm p-2 rounded-2xl border-white min-w-[120px] whitespace-nowrap',
                        {
                            'bg-white text-black': !showDeleteBoxes,
                            'bg-yellow-400 text-black': showDeleteBoxes,
                        }
                    )}
                >
                    {showDeleteBoxes
                        ? 'Cancel'
                        : 'Mark Cells'
                    }
                </button>
                <button 
                    className={clsx(
                        'absolute left-0 top-0 min-w-[120px] text-sm p-2 rounded-2xl bg-red-500',
                        showDeleteBoxes && numCellsChecked > 0 && 'translate-x-[110%] duration-200 ease-linear',
                        showDeleteBoxes && numCellsChecked === 0 && 'trnaslate-x-0 duration-200 ease-in',
                        !showDeleteBoxes && 'trnaslate-x-0 duration-200 ease-in'
                    )}   
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}