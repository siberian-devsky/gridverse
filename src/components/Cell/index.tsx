'use client'
import { CellData } from '@/types';
import { useState } from 'react';

export default function Cell({ ...props }: CellData) {
    const [age, setAge] = useState(props.age)

    const handleClick = () => {
        console.log(props.age)
        setAge(prev => prev + 1)
        if(age === 9) setAge(1)
    }

    return (
        <button
            id={props.id.toString()}
            className={`
                w-[175px] aspect-square bg-indigo-500 rounded-md
                `}
            onClick={() => handleClick()}
        >
            {props.name}
        </button>
    )
}