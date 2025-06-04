'use client'
import { CellData } from '@/types';
import { useState, useEffect } from 'react';

export default function Cell({ ...props }: CellData) {
    const [age, setAge] = useState(props.age)
    const [bgColor, setBgColor] = useState(props.bgColor)

    useEffect(() => {
        setBgColor(props.bgColor)
    }, [props.bgColor])
    
    const handleClick = async () => {
        const newAge = age + 1 > 9 ? 1 : age + 1;
        setAge(newAge);
        
        // fetch them datards
    }

    return (
        <button
            id={props.id.toString()}
            className={`w-[175px] aspect-square ${bgColor} rounded-md`}
            onClick={() => handleClick()}
        >
            <div className='flex flex-col gap-1.5'>
                <h1>{props.name}</h1>
                <h2>{age}</h2>
            </div>
        </button>
    )
}