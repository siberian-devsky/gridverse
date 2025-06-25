export default function AddCellModal() {
    return (
        <div className="w-[300px] h-[400px] border-4 border-emerald-400
            bg-slate-500 flex flex-col items-center justify-center"
        >
            <form className="flex flex-col justify-center gap-1">
                <label id="placeholder">placeholder</label>
                <input className="border-2 border-lime-400" type="text" placeholder="placeholder"></input>

                <label id="placeholder">placeholder</label>
                <input className="border-2 border-lime-400" type="text" placeholder="placeholder"></input>

                <label id="placeholder">placeholder</label>
                <input className="border-2 border-lime-400" type="text" placeholder="placeholder"></input>

                <label id="placeholder">placeholder</label>
                <input className="border-2 border-lime-400" type="text" placeholder="placeholder"></input>

            </form>
        </div>
    )
}