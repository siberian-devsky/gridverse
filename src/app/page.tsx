'use client'
import { useEffect, useState } from 'react';
import Cell from '@/components/Cell';
import { CellData } from '@/types';
import Header from '@/components/Header'
import AddCellModal from '@/components/Cell/modals/AddCellModal';

export default function Grid() {
    const [cells, setCells] = useState<CellData[]>([])
    const [showModal, setShowModal] = useState(false)

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

    // bg behavior on modal
    useEffect( () => {
        if (showModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    // kill the modal
    useEffect( () => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowModal(false)
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    })

    return(
        <main className="relative w-full flex flex-row justify-center items-center">
            <Header showModal={setShowModal}/>
            <div className='relative w-full h-screen'>
                <div
                    id='gridverseGrid'
                    className='absolute w-full justify-center items-center -top-4 m-4 grid translate-y-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'
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
                {showModal && (
                    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                        <AddCellModal />
                    </div>
                )}
            </div>
        </main>
    )
}