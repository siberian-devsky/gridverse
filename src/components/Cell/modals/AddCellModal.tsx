import { PostCellData } from "@/types";

export default function AddCellModal() {

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
        <div className='w-[300px] h-[400px] border-4 border-emerald-400
            bg-slate-800 flex flex-col items-center justify-center'
        >
            <form className='flex flex-col justify-center gap-2' onSubmit={handleSubmit}>
                <input name='name' type='text' className='border-2 border-pink-800' placeholder='Add a name' />
                <input name='icon' type='text' className='border-2 border-pink-800' placeholder='Add an icon or emoji' />
                <input name='iconCode' type='text' className='border-2 border-pink-800' placeholder='Now add its code' />
                <input name='currentValue' type='number' className='border-2 border-pink-800' placeholder='Pick a numner' />
                <button type='submit' className='bg-pink-800'>add cell</button>
            </form>
        </div>
    )
}