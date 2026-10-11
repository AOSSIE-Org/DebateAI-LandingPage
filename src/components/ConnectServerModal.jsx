import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { FaArrowRight, FaCircleExclamation } from 'react-icons/fa6'

export default function ConnectServerModal({ isOpen, onClose, onConnect }) {
  const [serverUrl, setServerUrl] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onConnect) {
      onConnect(serverUrl)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-(--surface2)/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-(--bg) text-white border border-(--border) rounded-sm p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 text-(--text2) hover:text-(--text) p-1.5 rounded-sm hover:bg-(--surface2) transition-colors cursor-pointer"
        >
          <IoClose className="w-5 h-5" />
        </button>

        <div className="text-[11px] font-bold tracking-widest uppercase text-(--brand-orange) mb-1.5">
          Connect a backend
        </div>

        <h2
          id="modal-title"
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-(--text) mb-2"
        >
          Connect to a custom server
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-(--text2) leading-relaxed mb-6">
          Bring your own DebateAI backend and keep your setup in your hands.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="backend-url"
              className="block text-sm font-semibold text-(--text2) mb-2"
            >
              Backend base URL
            </label>
            <input
              id="backend-url"
              type="url"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              placeholder="https://your-server.com"
              className="w-full bg-(--surface) border border-(--border) focus:border-(--brand-orange) focus:ring-1 focus:ring-(--brand-orange) rounded-sm px-4 py-3 text-sm placeholder-(--text2) outline-none transition-all"
            />
            <p className="text-xs text-(--text2) mt-2">
              We'll remember this for next time on this device.
            </p>
          </div>

          {/* Warning Banner */}
          <div className="rounded-sm bg-(--surface2) border border-(--border) p-4 flex items-start gap-3 mt-4">
            <FaCircleExclamation className="w-5 h-5 text-(--brand-orange) shrink-0 mt-0.5" />
            <div className="text-xs text-(--text2) leading-relaxed">
              <strong className="text-(--brand-orange) font-semibold">
                Connect only to servers you trust.  
              </strong>{' '}
              This server is not operated or vetted by AOSSIE. A malicious
              server can log your login credentials, Gemini API key, or debate
              data. Use at your own risk.
            </div>
          </div>

          {/* Connect Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-sm border bg-(--surface) hover:border-(--brand-orange) text-(--text2) hover:text-(--text) font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
            >
              <span>Connect</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
