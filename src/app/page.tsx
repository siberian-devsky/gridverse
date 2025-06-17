'use client'
import { useEffect, useState } from 'react';
import Cell from '@/components/Cell';
import { CellData } from '@/types';
import Header from '@/components/Header'

export default function Grid() {
    const [cells, setCells] = useState<CellData[]>([])

    // fetch cell data from the db
    useEffect(() => {
        const fetchAllCells = async () => {
            try {
                const resp = await fetch('http://localhost:4000/api/v1/cells')
                const data = await resp.json()

                console.log("data: ", data)
                setCells(data)
            } catch (err) {
                console.log("data: ", err)
            }
        }

        fetchAllCells()
    }, [])

    return(
        <main className="w-full h-screen flex flex-col justify-center items-center">
            <Header />
            <div
                className='grid grid-cols-3 gap-8 max-h-3/4'
            >
                {cells.map((cell, index) => (
                    <Cell 
                        key={index}
                        id={cell.id}
                        name={cell.name}
                        icon={cell.icon}
                        iconCode={cell.iconCode}
                        currentValue={cell.currentValue}
                        lastUpdated={cell.lastUpdated}
                    />
                ))}
            </div>
        </main>
    )
}