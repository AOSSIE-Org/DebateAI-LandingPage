import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa6'
import ThemeToggle from './ThemeToggle'

export default function Header() {

  return (
    <header
      className="sticky top-0 z-50 w-full transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* BRAND LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group rounded-lg p-1"
          aria-label="DebateAI Home"
        >
          {/* Logo Icon Mark */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-sm"
            style={{
              backgroundColor: 'rgba(234, 88, 12, 0.12)',
              border: '1px solid rgba(234, 88, 12, 0.3)',
            }}
          >
            <svg
              className="w-5 h-5 text-[var(--brand-orange)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 9h8" strokeWidth="2" />
              <path d="M8 13h5" strokeWidth="2" />
            </svg>
          </div>

          {/* Wordmark */}
          <div className="flex flex-col">
            <div className="flex items-center tracking-tight leading-none text-xl sm:text-2xl font-bold font-sans">
              <span style={{ color: 'var(--text)' }}>Debate</span>
              <span style={{ color: 'var(--brand-orange)' }}>AI</span>
            </div>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.25em] leading-tight mt-0.5"
              style={{ color: 'var(--text2)' }}
            >
              BY AOSSIE
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />

          <a
            href="https://github.com/AOSSIE-Org/DebateAI"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center
                        justify-center p-2 rounded-sm border transition-all 
                        duration-200 gap-1.5 font-medium"
            title="See Github Repo"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--brand-orange)'
              e.currentTarget.style.borderColor = 'var(--brand-orange)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text)'
              e.currentTarget.style.borderColor = 'var(--text)'
            }}
          >
            <FaGithub className="w-4 h-4" />
            <span className="text-xs font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}