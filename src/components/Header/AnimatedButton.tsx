import React from "react"
import clsx from "clsx"

type buttonProps = {
    showDeleteBoxes: boolean,
    setShowDeleteBoxes: React.Dispatch<React.SetStateAction<boolean>>,
    numCellsChecked: number,
}

export default function AnimatedButton({
    showDeleteBoxes,
    setShowDeleteBoxes,
    numCellsChecked,
}: buttonProps) {
    return (
        <div>
            {/* two stacked buttons */}
            <div className="relative">
                <button
                    onClick={() => setShowDeleteBoxes(prev => !prev)}
                    className={clsx(
                        'relative z-10 left-0 top-0 text-sm p-2 rounded-2xl border-white min-w-[120px] whitespace-nowrap',
                        {
                            'bg-white hover:bg-red-500 text-black': !showDeleteBoxes,
                            'bg-yellow-400 text-black': showDeleteBoxes,
                        }
                    )}
                >
                    {showDeleteBoxes
                        ? 'Cancel'
                        : 'Mark Cells'
                    }
                </button>
                {/* <button 
                    className={clsx(
                        'absolute left-0 top-0 min-w-[120px] text-sm p-2 rounded-2xl bg-red-500',
                        {
                            'animate-slideright': showDeleteBoxes && numCellsChecked > 0,
                            'animate-slideleft': numCellsChecked < 1,
                        }
                    )}
                >
                    Confirm
                </button> */}
            </div>
        </div>
    )
}