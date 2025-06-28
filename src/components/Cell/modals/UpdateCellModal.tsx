import { SetStateAction, useState } from "react";
import { CellData, PostCellData } from "@/types";
import { CellModalProps, opStatus } from "@/types"
import CloseButton from "./CloseButton";

type UpdateCellModalProps = CellModalProps & {
  selectedCell: CellData | null
  setSelectedCell: React.Dispatch<SetStateAction<CellData | null>>
  setShowModal: React.Dispatch<SetStateAction<boolean>>
  setCells: React.Dispatch<SetStateAction<CellData[]>>
}

export default function UpdateCellModal({
    selectedCell,
    setSelectedCell,
    setShowModal,
    setCells,
}: UpdateCellModalProps) {
    const [opStatus, setOpStatus] = useState<opStatus>({ message: null, status: 'ok' })
    // const [formState, setFormState] = useState<CellData>(selectedCell)

    if (!selectedCell) return null // or a loading state

    const updateCell = async(data: PostCellData) => {
        try {
            const resp = await fetch(`http://localhost:8080/api/v1/cells/update/${selectedCell.name}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })

            if (!resp.ok) {
                setOpStatus({ message: 'Could not update cell', status: 'nok' })
                return
            }

            const responseData = await resp.json()
            const updatedCellData: CellData = responseData.message.newData
            
            setCells(prevCells => prevCells.map(
                (cell) => cell.name === updatedCellData.name ? updatedCellData : cell
            ))

            setSelectedCell(updatedCellData)

            setOpStatus({ message: 'Cell Updated', status: 'ok' })

        } catch (err) {
            setOpStatus({ message: `Could Not Update Cell: ${err}`, status: 'nok' })
            console.error('could not create cell: ', err)
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        console.log("handle submit entry")
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.itemName.value.trim();
        const icon = form.icon.value.trim();
        const iconCode = form.iconCode.value.trim();
        const cv = Number(form.currentValue.value);
        
        console.log("submit data loaded")

        // find the dissidents
        console.log("checking for fuckers")
        const missing: string[] = []
        if (!name)      missing.push('name field')
        if (!icon)      missing.push('icon field')
        if (!iconCode)  missing.push('icon code field')

        console.log("check for missing field data")
        if (missing.length > 0) {
            console.debug('well this length thing is awkward')
            setOpStatus({ message: `missing: ${missing}`, status: 'nok' })
            return;
        }
        
        console.log("call the PUT gods")
        updateCell({ name, icon, iconCode, currentValue: cv });
    }

    return (
        <div className='relative w-[300px] h-[400px] border-4 border-emerald-400 rounded-2xl
                bg-slate-800 flex flex-col items-center justify-center'
            >
                <CloseButton setShowModal={setShowModal} />
                <form className='w-full flex flex-col items-center justify-center gap-4 grow-0 shrink-0' onSubmit={handleSubmit}>
                    <input
                        defaultValue={selectedCell?.name}
                        name='itemName'
                        type='text'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Add a name' autoFocus />
                    <input
                        defaultValue={selectedCell?.icon}
                        name='icon'
                        type='text'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Add an icon or emoji' />
                    <input
                        defaultValue={selectedCell?.iconCode}
                        name='iconCode'
                        type='text'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Now add its code' />
                    <input
                        defaultValue={selectedCell?.currentValue}
                        name='currentValue'
                        type='number'
                        className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full'
                        placeholder='Pick a number' />
                    <button
                        type='submit'
                        className='w-3/4 bg-lime-600 text-black rounded-full tracking-widest py-1'>Update</button>
                </form>
                <div className={
                        `px-2 mt-4 min-h-[24px] transition-opacity duration-200
                        ${opStatus.message ? 'opacity-100 visible' : 'opacity-0 invisible'}
                        ${opStatus.status === 'ok' ? 'text-emerald-400' : 'text-red-500'}
                    `}
                >
                    {opStatus.message || '‎' /* invisible non-breaking space fallback */}
                </div>
        </div>
    )
}