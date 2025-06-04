import { useTheme } from "next-themes"
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'

function ThemeToggle() {
    const {theme, setTheme} = useTheme()

    return(
        <button
                onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}
            >
                {theme === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
        </button>
    )
}

export default ThemeToggle