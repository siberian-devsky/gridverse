import { PostCellData } from "@/types";
import CloseButton from "./CloseButton";

type CellModalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddCellModal( {setShowModal}: CellModalProps ) {

    const createCell = async(data: PostCellData) => {
        try {
            const resp = await fetch('http://localhost:8080/api/v1/cells/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })

            const cellData = await resp.json()
            console.log(cellData)

        } catch (err) {
            console.error('could not create cell: ', err)
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget

        const formData = new FormData(form)

        const data = {
            name: formData.get('name')?.toString().trim() || 'errornoname',
            icon: formData.get('icon')?.toString().trim() || 'errornoicon',
            iconCode: formData.get('iconCode')?.toString().trim() || 'errornoiconcode',
            currentValue: Number(form.currentValue.value),
        };

        createCell(data)
    }

    return (
        <div className='relative w-[300px] h-[400px] border-4 border-emerald-400
            bg-slate-800 flex flex-col items-center justify-center'
        >
            <form className='w-full flex flex-col items-center justify-center gap-4' onSubmit={handleSubmit}>
                <input name='name' type='text' className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full' placeholder='Add a name' autoFocus />
                <input name='icon' type='text' className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full' placeholder='Add an icon or emoji' />
                <input name='iconCode' type='text' className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full' placeholder='Now add its code' />
                <input name='currentValue' type='number' className='w-3/4 h-8 border-[3px] px-4 border-pink-800 rounded-full' placeholder='Pick a number' />
                <button type='submit' className='w-3/4 bg-lime-600 text-black rounded-full tracking-widest py-1'>Add Cell</button>
            </form>
            <CloseButton setShowModal={setShowModal} />
        </div>
    )
}