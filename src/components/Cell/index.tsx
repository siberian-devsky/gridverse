'use client'
import { CellData } from '@/types';
import { SetStateAction } from 'react';

type CellProps = CellData & {
    onClick?: () => void
    showDeleteBoxes: boolean
    setNumCellsMarked: React.Dispatch<SetStateAction<number>>
}

export default function Cell({ id, name, icon, onClick, showDeleteBoxes, setNumCellsMarked}: CellProps) {
    if (id === undefined || name === undefined || icon === undefined) return null

    function handleClick(e: React.MouseEvent<HTMLInputElement>) {
        // dont open the modal  - you have 99% of the 
        // rest of cell area for that
        e.stopPropagation()

        const input = e.target as HTMLInputElement
        const checked = input.checked

       setNumCellsMarked( checked ? (prev) => prev + 1 : (prev) => prev - 1 )
    }
    return (
        <button
            // database id
            id={id.toString()}
            className='w-[120px] aspect-square relative text-green-500 border-4 border-blue-600 rounded-2xl'
            // open cell modal
            onClick={ onClick }
        >
            <div className='flex flex-col gap-1.5'>
                <h1 className='text-2xl'>{name}</h1>
                <h2 className='text-4xl'>{icon}</h2>
            </div>
            {showDeleteBoxes && 
                <div className='absolute top-1 right-2 '>
                    <input
                        type='checkbox'
                        onClick={handleClick}
                        className='appearance-none w-3 aspect-square border border-red-600 checked:bg-red-600 rounded-sm'/>
                </div>
            }
        </button>
    )
}