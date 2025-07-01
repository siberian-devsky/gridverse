'use client'
import clsx from 'clsx'
import { CellData } from '@/types';
import { SetStateAction, useEffect, useState } from 'react';

type CellProps = CellData & {
    onClick?: () => void
    showDeleteBoxes: boolean
    setNumCellsMarked: React.Dispatch<SetStateAction<number>>
}

export default function Cell({
    id, name, icon, onClick, showDeleteBoxes, setNumCellsMarked
}: CellProps) {
    const [checked, setChecked] = useState<boolean>(false)
    
    useEffect( () => console.log(checked) , [checked])

    if (id === undefined || name === undefined || icon === undefined) return null

    function handleClick(e: React.MouseEvent<HTMLInputElement>) {
        // dont open the edit modal
        e.stopPropagation()

        const input = e.target as HTMLInputElement
        setChecked(input.checked)

       setNumCellsMarked( checked ? (prev) => prev - 1 : (prev) => prev + 1 )
    }

    return (
    <button
        id={id.toString()}
        className={clsx(
        'w-[180px]',
        'aspect-square',
        'relative',
        'text-green-500',
        'border-4',
        'rounded-2xl',
        checked ? 'border-red-600' : 'border-blue-600'
        )}
        onClick={onClick}
    >
        <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl">{name}</h1>
        <h2 className="text-4xl">{icon}</h2>
        </div>

        {showDeleteBoxes && (
        <div className="absolute top-4 right-4">
            <input
            type="checkbox"
            onClick={handleClick}
            className="appearance-none w-4 h-4 border-2 border-red-600 checked:bg-red-600 
                rounded-full cursor-pointer"
            />
        </div>
        )}
    </button>
    )
}