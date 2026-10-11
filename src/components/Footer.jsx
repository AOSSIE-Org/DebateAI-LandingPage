import { FaGithub, FaLinkedin, FaDiscord, FaYoutube, FaXTwitter } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import { BsHeartFill } from 'react-icons/bs'

const footerLinks = [
  {
    label: 'Documentation',
    href: 'https://github.com/AOSSIE-Org/DebateAI#readme',
    isExternal: true,
  },
  {
    label: 'GitHub Repo',
    href: 'https://github.com/AOSSIE-Org/DebateAI',
    isExternal: true,
  },
  {
    label: 'Support Us',
    href: 'https://github.com/sponsors/AOSSIE-Org',
    isExternal: true,
  },
]

const socialLinks = [
  {
    label: 'Email',
    href: 'mailto:aossie.oss@gmail.com',
    icon: HiOutlineMail,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/AOSSIE-Org',
    icon: FaGithub,
  },
  {
    label: 'Discord',
    href: 'https://discord.com/invite/hjUhu33uAn',
    icon: FaDiscord,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/aossie/',
    icon: FaLinkedin,
  },
  {
    label: 'X',
    href: 'https://x.com/aossie_org',
    icon: FaXTwitter,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@AOSSIE-Org',
    icon: FaYoutube,
  },
]

export default function Footer() {

  return (
    <footer
      className="w-full transition-colors duration-200 mt-auto  bg-(--surface) border-t border-(--border)"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-start sm:items-">
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <a
              href="https://aossie.org"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 hover:opacity-90 transition-opacity"
              aria-label="Visit AOSSIE organization website"
            >
              <img
                src="/brand/icons/aossie_logo.svg"
                alt="AOSSIE"
                className="h-14 sm:h-16 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </a>

            <div
              className="hidden sm:block h-16 w-px bg-(--border)"
              
            />

            <div className="space-y-1 max-w-sm">
              <h4 className="text-sm font-semibold tracking-wide text-(--text)">
                AOSSIE
              </h4>
              <p className="text-xs leading-relaxed text-(--text2)">
                Australian Open Source Software Innovation and Education is a non-profit organization dedicated to building impactful open-source software, mentoring contributors, and fostering innovation globally.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-5">
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"
            >
              {footerLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="transition-colors duration-150 hover:underline text-(--text2)"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--brand-orange)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text2)'
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-3.5">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${item.label}`}
                    title={item.label}
                    className="p-2 rounded-sm border transition-all duration-200 hover:scale-110 active:scale-95"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--surface2)',
                      color: 'var(--text2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--brand-orange)'
                      e.currentTarget.style.borderColor = 'var(--brand-orange)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text2)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2.5 lg:items-end lg:text-right text-xs">
            <p className="font-medium tracking-wider uppercase text-[11px]" style={{ color: 'var(--text)' }}>
              © {new Date().getFullYear()} AOSSIE
            </p>

            <p className="uppercase tracking-[0.18em] text-[10px]" style={{ color: 'var(--text3)' }}>
              Built for open source communities
            </p>

            <p className="flex items-center lg:justify-end gap-1.5 text-xs font-normal mt-1">
              <span>Made with</span>
              <BsHeartFill className="text-amber-400 w-3 h-3 animate-pulse" />
              <span>
                by{' '}
                <a
                  href="https://aossie.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--brand-orange)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text)'
                  }}
                >
                  AOSSIE
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}