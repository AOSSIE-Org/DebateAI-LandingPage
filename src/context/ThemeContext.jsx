import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try {
            const stored = localStorage.getItem('debateai_theme');
            if (stored === 'dark' || stored === 'light') {
                return stored
            }
            if (stored !== null) {
                console.warn(`Invalid theme value found in localStorage: "${stored}". Falling back to 'dark'.`)
            }
        } catch (error) {
            console.warn('Failed to read theme from localStorage:', error)
        }
        return 'dark'
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        try {
            localStorage.setItem('debateai_theme', theme)
        } catch (error) {
            console.warn('Failed to save theme to localStorage:', error)
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

