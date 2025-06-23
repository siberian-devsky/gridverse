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
                const resp = await fetch('http://localhost:8080/api/v1/cells')
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
        <main className="w-full flex flex-row justify-center items-center">
            <Header />
            <div
                id='gridverseGrid'
                className='m-4 grid translate-y-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'
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