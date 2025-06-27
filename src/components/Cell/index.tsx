'use client'
import { CellData } from '@/types';
import { useState } from 'react';

interface CellProps extends CellData {
    renderIndex: number
}

export default function Cell({ renderIndex, ...props }: CellProps) {
    const [on, setOn] = useState(false)

    return (
        <button
            id={props.id.toString()}
            className=
                {`w-[180px] aspect-square border-4 border-blue-400
                ${renderIndex % 2===0 ? 'bg-pink-600': 'bg-emerald-500'}
                ${on ? '' : 'opacity-50'}
                rounded-4xl`}
            onClick={ () => setOn(!on) }
        >
            <div className='flex flex-col gap-1.5'>
                <h1 className='text-2xl'>{props.name}</h1>
                <h2 className='text-4xl'>{props.icon}</h2>
            </div>
        </button>
    )
}