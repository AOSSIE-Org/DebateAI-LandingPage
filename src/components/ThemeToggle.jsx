import { useContext } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { ThemeContext }  from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center
         justify-center p-2 rounded-sm border transition-all 
         duration-200 ${className}`}
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--surface2)',
        color: 'var(--text2)',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <FiSun className="w-4 h-4 transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <FiMoon className="w-4 h-4 transition-transform duration-200 -rotate-12 hover:rotate-0" />
      )}
    </button>
  )
}
