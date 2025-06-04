'use client'
import { useEffect, useState } from 'react';
import Cell from '@/components/Cell';
import { CellData } from '@/types';
import Header from '@/components/Header'

export default function Grid() {
    const [cellData, setCellData] = useState<CellData[]>(
        Array.from({length: 9}).fill(null).map((_, index) => (
            {
                id: index, 
                age: 1, 
                name: 'Cell ' + index.toString(),
                bgColor: 'bg-gray-700'
            })
        )
    )

    // fetch cell data from the db
    useEffect(() => {
        const fetchCellData = async() => {
            await fetch('http://localhost:4000/api/cells')
                .then(resp => resp.json())
                .then(data => setCellData(data.cells))
                // .then(data => console.log(data.data))    // debug
                .catch(err => console.error(err))
        }
        fetchCellData()
    }, [])

    return(
        <main className="w-full h-screen flex flex-col justify-center items-center">
            <Header />
            <div
                className='grid grid-cols-3 gap-8 max-h-3/4'
            >
                {cellData.map((cell, index) => (
                    <Cell 
                        key={index}
                        id={cell.id}
                        name={cell.name}
                        age={cell.age}
                        bgColor={cell.bgColor}
                    />
                ))}
            </div>
        </main>
    )
}