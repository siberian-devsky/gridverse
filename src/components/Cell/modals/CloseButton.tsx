import { SetStateAction } from "react"

type ButtonProps = {
    setShowModal: React.Dispatch<SetStateAction<boolean>>
}

export default function CloseButton( {setShowModal}: ButtonProps ) {
    return (
        <button className="w-4 aspect-square bg-pink-500 text-black cursor-pointer
                items-center justify-center absolute top-2 right-3"
                onClick={ () => setShowModal(false)}
            >
                X
            </button>
    )
}