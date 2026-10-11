import { useState } from 'react'
import DebateCarousel from '../components/DebateCarousel'
import ConnectServerModal from '../components/ConnectServerModal'
import SelfHostGuideModal from '../components/SelfHostGuideModal'
import { FaPlay, FaLink, FaServer, FaArrowRight, FaCircleCheck } from 'react-icons/fa6'

export default function LandingPage() {
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
    const [isGuideModalOpen, setIsGuideModalOpen] = useState(false)
    const [connectedServer, setConnectedServer] = useState(null)

    const handleConnect = (url) => {
        if (url && url.trim()) {
            setConnectedServer(url.trim())
        }
        setIsConnectModalOpen(false)
    }

    const handleOfficialServerClick = () => {
        window.location.href = 'https://debateai.aossie.org'
    }

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                <div className="lg:col-span-6 w-full flex flex-col justify-center">
                    <div className="w-full max-w-xl mx-auto">
                        <DebateCarousel />
                    </div>
                </div>

                <div className="lg:col-span-6 w-full flex flex-col justify-center space-y-8">
                    <div className="space-y-3">

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                            Play Debate Online <br />
                            <span className="text-(--brand-orange)">
                                on any server.
                            </span>
                        </h1>

                        <p
                            className="text-base sm:text-lg leading-relaxed max-w-lg"
                            style={{ color: 'var(--text2)' }}
                        >
                            Debate people or AI in real time, judged by AI. One sovereign app —
                            pick where you play.
                        </p>

                        {connectedServer && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                                <FaCircleCheck className="w-3.5 h-3.5 text-green-500" />
                                <span>Custom Target: {connectedServer}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3.5">
                        <div
                            onClick={handleOfficialServerClick}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleOfficialServerClick()}
                            className="group relative p-4 sm:p-5 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 hover:shadow-lg hover:border-orange-500/50"
                            style={{
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-(--brand-orange) group-hover:scale-105 transition-transform duration-200 shrink-0">
                                    <FaPlay className="w-4 h-4 ml-0.5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2
                                            className="text-base sm:text-lg font-semibold tracking-tight"
                                            style={{ color: 'var(--text)' }}
                                        >
                                            Try it out
                                        </h2>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-green-500/15 text-green-400 border border-green-500/30">
                                            Live
                                        </span>
                                    </div>
                                    <p
                                        className="text-xs sm:text-sm mt-0.5"
                                        style={{ color: 'var(--text2)' }}
                                    >
                                        Play immediately on the official AOSSIE server.
                                    </p>
                                </div>
                            </div>

                            <div className="w-9 h-9 rounded-sm flex items-center justify-center text-(--text2) border group-hover:text-white group-hover:border-(--brand-orange) transition-all duration-200 shrink-0">
                                <FaArrowRight className="w-3.5 h-3.5 group-hover:text-(--brand-orange) transition-all duration-200 " />
                            </div>
                        </div>

                        <div
                            onClick={() => setIsConnectModalOpen(true)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setIsConnectModalOpen(true)}
                            className="group relative p-4 sm:p-5 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 hover:shadow-lg hover:border-orange-500/50"
                            style={{
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-(--surface2) border border-(--border) text-(--text) group-hover:text-(--brand-orange) group-hover:bg-orange-500/10 group-hover:border-orange-500/20 group-hover:scale-105 transition-all duration-200 shrink-0">
                                    <FaLink className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2
                                        className="text-base sm:text-lg font-semibold tracking-tight"
                                        style={{ color: 'var(--text)' }}
                                    >
                                        Connect to a server
                                    </h2>
                                    <p
                                        className="text-xs sm:text-sm mt-0.5"
                                        style={{ color: 'var(--text2)' }}
                                    >
                                        Join your school's, university's, or community's server.
                                    </p>
                                </div>
                            </div>

                            <div className="w-9 h-9 rounded-sm flex items-center justify-center text-zinc-400 group-hover:text-white border group-hover:border-(--brand-orange) transition-all duration-200 shrink-0">
                                <FaArrowRight className="w-3.5 h-3.5 group-hover:text-(--brand-orange) transition-all duration-200" />
                            </div>
                        </div>

                        <div
                            onClick={() => setIsGuideModalOpen(true)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setIsGuideModalOpen(true)}
                            className="group relative p-4 sm:p-5 rounded-sm border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 hover:shadow-lg hover:border-orange-500/50"
                            style={{
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-(--surface2) border border-(--border) text-(--text) group-hover:text-(--brand-orange) group-hover:bg-orange-500/10 group-hover:border-orange-500/20 group-hover:scale-105 transition-all duration-200 shrink-0">
                                    <FaServer className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2
                                        className="text-base sm:text-lg font-semibold tracking-tight"
                                        style={{ color: 'var(--text)' }}
                                    >
                                        Self-host DebateAI
                                    </h2>
                                    <p
                                        className="text-xs sm:text-sm mt-0.5"
                                        style={{ color: 'var(--text2)' }}
                                    >
                                        Run on Docker with your own users, leaderboard, and keys.
                                    </p>
                                </div>
                            </div>

                            <div className="w-9 h-9 rounded-sm flex items-center justify-center text-zinc-400 border group-hover:text-white group-hover:border-(--brand-orange) transition-all duration-200 shrink-0">
                                <FaArrowRight className="w-3.5 h-3.5 group-hover:text-(--brand-orange) transition-all duration-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConnectServerModal
                isOpen={isConnectModalOpen}
                onClose={() => setIsConnectModalOpen(false)}
                onConnect={handleConnect}
            />

            <SelfHostGuideModal
                isOpen={isGuideModalOpen}
                onClose={() => setIsGuideModalOpen(false)}
                onOpenConnectServer={() => setIsConnectModalOpen(true)}
            />
        </div>
    )
}