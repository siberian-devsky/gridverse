'use client'
import { CellData } from '@/types';
import { useState } from 'react';


export default function Cell({ ...props }: CellData) {
    const [on, setOn] = useState(false)
    const { id, name, icon } = props
    if (id === undefined || name === undefined || icon === undefined) return null

    return (
        <button
            // database id
            id={id.toString()}
            className=
                {`w-[120px] aspect-square
                ${on ? 'bg-lime-600 border-4 border-blue-600' : 'bg-slate-700/50'}
                rounded-4xl`}
            onClick={ () => setOn(!on) }
        >
            <div className='flex flex-col gap-1.5'>
                <h1 className='text-2xl'>{name}</h1>
                <h2 className='text-4xl'>{icon}</h2>
            </div>
        </button>
    )
}