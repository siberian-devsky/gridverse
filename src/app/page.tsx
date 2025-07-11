"use client";
import { useEffect, useState } from "react";
import Cell from "@/components/Cell";
import { CellData } from "@/types";
import Header from "@/components/Header";
import AddCellModal from "@/components/Cell/modals/AddCellModal";
import UpdateCellModal from "@/components/Cell/modals/UpdateCellModal";
import DeleteCellModal from "@/components/Cell/modals/DeleteCellModal";

export default function Grid() {
    const [cells, setCells] = useState<CellData[]>([]);
    const [showAddCellModal, setShowAddCellModal] = useState<boolean>(false);
    const [showUpdateCellModal, setShowUpdateCellModal] = useState<boolean>(false);
    const [showDeleteCellModal, setShowDeleteCellModal] = useState<boolean>(false);
    const [selectedCell, setSelectedCell] = useState<CellData | null>(null);
    const [showDeleteBoxes, setShowDeleteBoxes] = useState<boolean>(false);
    const [numCellsChecked, setNumCellsChecked] = useState<number>(0);
    const [shouldReset, setShouldReset] = useState<boolean>(false);
    const [cellsToDelete, setCellsToDelete] = useState<string[]>([]);

    // Function to reset all cell checked states
    const resetAllCellStates = () => {
        setNumCellsChecked(0);
        setShouldReset(true); // Set to true to trigger reset
    };

    // Function to acknowledge reset has been processed
    const acknowledgeReset = () => {
        setShouldReset(false);
    };

    // initial page load - fetch cell data from the db
    useEffect(() => {
            const fetchAllCells = async () => {
                try {
                    const resp = await fetch("http://localhost:8080/api/v1/cells");
                    const data = await resp.json();
                    // set grid state
                    setCells(data.data);
                    // sync cache to db
                    localStorage.setItem('cache', JSON.stringify(data.data))
                } catch (err) {
                    console.log("data: ", err);
                }
            };
            fetchAllCells();
    }, [])

    // bg behavior on modal
    useEffect(() => {
        if (showAddCellModal || showDeleteCellModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showAddCellModal, showDeleteCellModal]);

    // kill all modals
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShowAddCellModal(false);
                setShowDeleteCellModal(false);
                setShowUpdateCellModal(false);
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });

    return (
        <main className="relative w-full flex flex-row justify-center items-center">
            <Header
                showAddCellModal={setShowAddCellModal}
                setShowDeleteBoxes={setShowDeleteBoxes}
                numCellsChecked={numCellsChecked}
                showDeleteBoxes={showDeleteBoxes}
                resetAllCellStates={resetAllCellStates}
                cellsToDelete={cellsToDelete}
                setCells={setCells}
            />
            <div className="relative w-full h-screen">
                <div
                    id="gridverseGrid"
                    className="absolute w-full place-items-center m-4 grid translate-y-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {cells.map((cell, index) => (
                        <Cell
                            key={`${index}-${shouldReset}`}
                            id={cell.id}
                            name={cell.name}
                            icon={cell.icon}
                            iconCode={cell.iconCode}
                            currentValue={cell.currentValue}
                            showDeleteBoxes={showDeleteBoxes}
                            lastUpdated={cell.lastUpdated}
                            setNumCellsChecked={setNumCellsChecked}
                            shouldReset={shouldReset}
                            acknowledgeReset={acknowledgeReset}
                            setCellsToDelete={setCellsToDelete}
                            selectCellAndShowModal={() => {
                                setSelectedCell(cell);
                                setShowUpdateCellModal(true);
                            }}
                        />
                    ))}
                </div>
                {showAddCellModal && (
                    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                        <AddCellModal
                            setShowModal={setShowAddCellModal}
                            setCells={setCells}
                        />
                    </div>
                )}
                {showUpdateCellModal && selectedCell && (
                    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                        <UpdateCellModal
                            setShowModal={setShowUpdateCellModal} // just passing through
                            setCells={setCells} // update main grid
                            selectedCell={selectedCell} // populates the update form with cell's curr. data
                            setSelectedCell={setSelectedCell} // sync this with local modal state tracking
                        />
                    </div>
                )}
                {showDeleteCellModal && (
                    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
                        <DeleteCellModal
                            setShowModal={setShowDeleteCellModal}
                            setCells={setCells}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
