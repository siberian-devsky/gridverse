import ThemeToggle from "./ThemeToggle"

export default function Header() {
    return(
        <header 
            className="fixed top-0 left-0 border border-black
                w-screen h-16 flex flex-row items-center justify-end
                px-4 py-2 backdrop-blur-2xl"
        >
            <ThemeToggle />
        </header>
    )
}