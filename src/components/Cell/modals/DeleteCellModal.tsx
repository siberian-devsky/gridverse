import React from "react"

export default function DeleteCellModal() {
    const deleteCell = async (name: string) => {
        try {
            const deleted = await fetch(`http://localhost:8080/api/v1/cells/delete/${name}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name: name })
            })
            const data = await deleted.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget

        const formData = new FormData(form)
        const name = formData.get('name')?.toString().trim() || 'nameeman'

        if (!formData) {
            return { error: 'please enter a name'}
        } else {
            deleteCell(name)
            console.log(`${name} deleted`)
        }
    }

    return (
        <div className='w-[300px] h-[400px] border-4 border-emerald-400
            bg-slate-800 flex flex-col items-center justify-center'
        >
            <form className='flex flex-col justify-center gap-2' onSubmit={handleSubmit}>
                <input name="name" type="text" className="border-2 border-pink-800"/>               
                <button type='submit' className='bg-pink-800'>delete cell</button>
            </form>
        </div>
    )
}