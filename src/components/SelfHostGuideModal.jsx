import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { FaCheck, FaChevronDown, FaChevronUp, FaRegCopy, FaArrowRight, FaCloud, FaServer, FaArrowUpRightFromSquare,} from 'react-icons/fa6'

export default function SelfHostGuideModal({ isOpen, onClose, onOpenConnectServer }) {

  const [openSections, setOpenSections] = useState({
    '01': true,
    '02': false,
    '03': false,
    '04': false,
    '05': false,
  })

  const [copied, setCopied] = useState(false)

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('docker compose up -d')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

  const handleBottomConnectClick = () => {
    onClose()
    if (onOpenConnectServer) {
      onOpenConnectServer()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-(surface2)/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-(--bg) text-(--text) border border-(--border) rounded-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-(--border-subtle) bg-(--surface3)">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-(--brand-orange)">
              Self-Host Setup Guide
            </div>
            <h2
              id="guide-title"
              className="text-xl sm:text-2xl font-semibold tracking-tight text-(--text) mt-0.5"
            >
              Deploy DebateAI on your Infrastructure
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close setup guide"
            className="text-(--text2) hover:text-(--text) p-2 rounded-lg hover:bg-(--surface2) transition-colors cursor-pointer"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-4 text-sm divide-y divide-(--border-subtle)">
          <div className="pt-2">
            <button
              onClick={() => toggleSection('01')}
              type="button"
              className="w-full flex items-center justify-between py-3 text-left group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-(--brand-orange) mt-1.5">
                  01
                </span>
                <div>
                  <h3 className="text-base font-semibold text-(--text) group-hover:text-(--brand-orange) transition-colors">
                    Prerequisites
                  </h3>
                  <p className="text-xs text-(--text2) mt-0.5">
                    Get the two tools you need
                  </p>
                </div>
              </div>
              <div className="text-(--text2) group-hover:text-(--text) transition-colors">
                {openSections['01'] ? (
                  <FaChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <FaChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {openSections['01'] && (
              <div className="pb-4 pt-2 pl-8 sm:pl-10">
                <div className="flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-medium bg-(--surface) border border-(--border) text-(--text)">
                    <FaCheck className="w-3 h-3 text-(--brand-orange)" />
                    Docker Desktop installed
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-medium bg-(--surface) border border-(--border) text-(--text)">
                    <FaCheck className="w-3 h-3 text-(--brand-orange)" />
                    Docker Compose v2 available
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-medium bg-(--surface) border border-(--border) text-(--text)">
                    <FaCheck className="w-3 h-3 text-(--brand-orange)" />
                    A server or computer to run it on
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3">
            <button
              onClick={() => toggleSection('02')}
              type="button"
              className="w-full flex items-center justify-between py-3 text-left group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-(--brand-orange) mt-1.5">
                  02
                </span>
                <div>
                  <h3 className="text-base font-semibold text-(--text) group-hover:text-(--brand-orange) transition-colors">
                    Clone & configure
                  </h3>
                  <p className="text-xs text-(--text2) mt-0.5">
                    Add your connection details
                  </p>
                </div>
              </div>
              <div className="text-(--text2) group-hover:text-(--text) transition-colors">
                {openSections['02'] ? (
                  <FaChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <FaChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {openSections['02'] && (
              <div className="pb-4 pt-2 pl-8 sm:pl-10 space-y-3">
                <p className="text-xs text-(--text2)">
                  Clone the repository, then create your{' '}
                  <code className="text-(--brand-orange) bg-(--surface3) px-1 py-0.5 rounded-xs">
                    .env
                  </code>{' '}
                  file from the example. These are the values you'll need.
                </p>

                <div className="border border-(--border) rounded-sm overflow-hidden text-xs divide-y divide-(--border) bg-(--surface  )">
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-(--text2)">MongoDB URI</span>
                    <span className="font-mono text-(--brand-orange) font-medium">
                      MONGODB_URI
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-(--text2)">Redis URI</span>
                    <span className="font-mono text-(--brand-orange) font-medium">
                      REDIS_URI
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-(--text2)">Gemini API key</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-(--brand-orange) font-medium">
                        GEMINI_API_KEY
                      </span>
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] underline text-(--text2) hover:text-(--text)"
                      >
                        GET A FREE KEY
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-(--text2)">SMTP credentials</span>
                    <span className="font-mono text-(--brand-orange) font-medium">
                      SMTP_HOST · SMTP_USER · SMTP_PASS
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-(--text2)">Google OAuth</span>
                    <span className="font-mono text-(--brand-orange) font-medium">
                      GOOGLE_CLIENT_ID · SECRET
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5">
                    <span className="text-(--text2)">TURN server</span>
                    <span className="font-mono text-(--brand-orange) font-medium">
                      TURN_SERVER_URL · TURN_SECRET
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3">
            <button
              onClick={() => toggleSection('03')}
              type="button"
              className="w-full flex items-center justify-between py-3 text-left group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-(--brand-orange) mt-1.5">
                  03
                </span>
                <div>
                  <h3 className="text-base font-semibold text-(--text) group-hover:text-(--brand-orange) transition-colors">
                    Run it
                  </h3>
                  <p className="text-xs text-(--text2) mt-0.5">
                    Start your DebateAI server
                  </p>
                </div>
              </div>
              <div className="text-(--text2) group-hover:text-(--text) transition-colors">
                {openSections['03'] ? (
                  <FaChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <FaChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {openSections['03'] && (
              <div className="pb-4 pt-2 pl-8 sm:pl-10 space-y-3">
                <p className="text-xs text-(--text2)">
                  From the project folder, run one command.
                </p>

                <div className="flex items-center justify-between px-4 py-3 bg-(--surface) border border-(--border) rounded-sm font-mono text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-(--text2)">
                    <span className="text-(--brand-orange)">&gt;_</span>
                    <span>docker compose up -d</span>
                  </div>
                  <button
                    onClick={handleCopyCommand}
                    type="button"
                    aria-label="Copy docker compose command"
                    className="p-1.5 rounded-lg hover:bg-(--surface) text-(--text2) hover:text-(--text) transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <FaCheck className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <FaRegCopy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3">
            <button
              onClick={() => toggleSection('04')}
              type="button"
              className="w-full flex items-center justify-between py-3 text-left group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-(--brand-orange) mt-1.5">
                  04
                </span>
                <div>
                  <h3 className="text-base font-semibold text-(--text) group-hover:text-(--brand-orange) transition-colors">
                    Get your base URL
                  </h3>
                  <p className="text-xs text-(--text2) mt-0.5">
                    Choose where people will connect
                  </p>
                </div>
              </div>
              <div className="text-(--text2) group-hover:text-(--text) transition-colors">
                {openSections['04'] ? (
                  <FaChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <FaChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {openSections['04'] && (
              <div className="pb-4 pt-2 pl-8 sm:pl-10 space-y-2">
                <p className="text-xs text-(--text2) leading-relaxed">
                  Once your backend is running, it will be exposed on port 8000
                  by default (e.g.{' '}
                  <code className="text-(--brand-orange) bg-(--surface3) px-1 py-0.5 rounded">
                    http://localhost:8000
                  </code>{' '}
                  or your public domain configured via reverse proxy). Use this
                  address when connecting the DebateAI client.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3">
            <button
              onClick={() => toggleSection('05')}
              type="button"
              className="w-full flex items-center justify-between py-3 text-left group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-(--brand-orange) mt-1.5">
                  05
                </span>
                <div>
                  <h3 className="text-base font-semibold text-(--text) group-hover:text-(--brand-orange) transition-colors">
                    Optional fast path
                  </h3>
                  <p className="text-xs text-(--text2) mt-0.5">
                    Deploy with a visual dashboard
                  </p>
                </div>
              </div>
              <div className="text-(--text2) group-hover:text-(--text) transition-colors">
                {openSections['05'] ? (
                  <FaChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <FaChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {openSections['05'] && (
              <div className="pb-4 pt-2 pl-8 sm:pl-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-sm border border-(--border) bg-(--surface) flex items-start gap-3 hover:border-(--brand-orange) transition-colors">
                    <FaCloud className="w-5 h-5 text-(--brand-orange) shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-(--text)">
                        Deploy with Coolify
                      </h4>
                      <p className="text-[11px] text-(--text2) mt-0.5 flex items-center gap-1">
                        Use the template in{' '}
                        <span className="text-(--brand-orange)">/deploy/</span>
                        <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-sm border border-(--border) bg-(--surface) flex items-start gap-3 hover:border-(--brand-orange) transition-colors">
                    <FaServer className="w-5 h-5 text-(--brand-orange) shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-(--text)">
                        Deploy with Dokploy
                      </h4>
                      <p className="text-[11px] text-(--text2) mt-0.5 flex items-center gap-1">
                        Use the template in{' '}
                        <span className="text-(--brand-orange)">/deploy/</span>
                        <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6">
            <div className="border border-(--border) bg-(--surface) rounded-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-(--brand-orange)">
                  When you are
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-(--text) mt-0.5">
                  Done deploying?
                </h3>
                <p className="text-xs text-(--text2) mt-0.5">
                  Paste your backend URL and start connecting.
                </p>
              </div>

              <button
                onClick={handleBottomConnectClick}
                type="button"
                className="shrink-0 bg-(--surface3) hover:bg-(--brand-orange) text-(--text) font-medium px-5 py-3 rounded-sm flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
              >
                <span>Connect to your server</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
