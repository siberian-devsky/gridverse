'use client'
import { CellData } from '@/types';

export default function Cell({ ...props }: CellData) {
    return (
        <button
            id={props.id.toString()}
            className='w-[175px] aspect-square bg-slate-800 border-2 border-emerald-400 rounded-md'
        >
            <div className='flex flex-col gap-1.5'>
                <h1 className='text-3xl'>{props.name}</h1>
                <h2 className='text-4xl'>{props.icon}</h2>
            </div>
        </button>
    )
}