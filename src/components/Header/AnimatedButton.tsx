import React from "react"
import clsx from "clsx"

type buttonProps = {
    showDeleteBoxes: boolean,
    setShowDeleteBoxes: React.Dispatch<React.SetStateAction<boolean>>,
    numCellsMarked: number,
}

export default function AnimatedButton({
    showDeleteBoxes,
    setShowDeleteBoxes,
    numCellsMarked,
}: buttonProps) {

    return (
        <div className="flex gap-4">
            <div className="relative">
                <button
                    onClick={() => setShowDeleteBoxes(prev => !prev)}
                    className={clsx(
                        'absolute z-50 left-0 top-0 text-sm p-2 rounded-2xl border-white min-w-[120px] whitespace-nowrap',
                        {
                            'bg-red-500 text-white': showDeleteBoxes && numCellsMarked > 0,
                            'bg-yellow-400 text-black': showDeleteBoxes && numCellsMarked === 0,
                            'bg-white hover:bg-red-500 text-black': !showDeleteBoxes,
                        }
                    )}
                >
                    {showDeleteBoxes && numCellsMarked > 0
                        ? 'Confirm Delete'
                        : showDeleteBoxes && numCellsMarked === 0
                            ? 'Cancel'
                            : 'Mark Cells'
                    }
                </button>
                <button className="absolute left-0 top-1 min-w-[120px] max-h-8 rounded-2xl bg-red-500 whitespace-nowrap">
                    a hidden button
                </button>
            </div>
        </div>
    )
}