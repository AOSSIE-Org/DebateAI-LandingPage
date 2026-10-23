import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaDiscord, FaYoutube, FaXTwitter } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import { BsHeartFill } from 'react-icons/bs'
import aossieLogo from '../assets/aossie_logo.svg'
import DebateAiLogo from './DebateAiLogo'

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
      className="site-footer w-full transition-colors duration-200 mt-auto"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="site-footer-inner flex w-full flex-col gap-8 px-4 py-8 md:px-6 lg:flex-row lg:items-center lg:justify-around">
        {/* LEFT SECTION */}
        <div className="site-footer-brand flex items-center gap-8 justify-center">
          {/* Logo */}
          <a
            href="https://aossie.org"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 hover:opacity-90 transition-opacity"
            aria-label="Visit AOSSIE organization website"
          >
            <img
              src={aossieLogo}
              alt="AOSSIE"
              className="h-16 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </a>

          {/* Separator */}
          <div
            className="site-footer-divider site-footer-brand-divider h-20 w-px bg-zinc-700"
            style={{ backgroundColor: 'var(--border)' }}
          />

          {/* Description */}
          <div className="site-footer-description max-w-sm">
            <p
              className="mt-2 text-sm leading-5"
              style={{ color: 'var(--text2)' }}
            >
              AOSSIE is a non-profit organization dedicated to building
              impactful open-source software, mentoring contributors,
              and fostering innovation through global collaboration.
            </p>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="site-footer-links flex flex-col lg:flex-row lg:gap-8 items-center">
          {/* Separator */}
          <div
            className="site-footer-divider h-25 w-px bg-zinc-700 rotate-90 lg:rotate-180"
            style={{ backgroundColor: 'var(--border)', height: '100px' }}
          />

          <div className="site-footer-links-column flex flex-col gap-6">
            {/* NAVIGATION */}
            <nav
              aria-label="Footer Navigation"
              className="site-footer-nav flex flex-wrap items-center gap-x-6 gap-y-3 justify-center"
            >
              {footerLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={
                    item.label === 'Support Us'
                      ? 'site-footer-support-link'
                      : undefined
                  }
                  target={item.isExternal ? '_blank' : '_self'}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  style={{
                    color: 'var(--text2)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--brand-orange)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text2)'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* SOCIAL LINKS */}
            <div className="site-footer-socials flex items-center gap-6 justify-center">
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
                    className="site-footer-social-link"
                    style={{
                      color: 'var(--text2)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--brand-orange)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text2)'
                    }}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="site-footer-meta-section flex flex-col lg:flex-row lg:gap-8 items-center">
          {/* Separator */}
          <div
            className="site-footer-divider h-25 w-px bg-zinc-700 rotate-90 lg:rotate-180"
            style={{ backgroundColor: 'var(--border)', height: '100px' }}
          />

          <div className="site-footer-meta flex flex-col gap-2 items-center text-center lg:items-end lg:text-right">
            <p className="flex items-center justify-center lg:justify-end text-xs tracking-[0.2em]">
              © {new Date().getFullYear()}
              <span>
                <Link
                  to="/"
                  aria-label="Go to home page"
                  className="inline-flex items-center gap-1.5 ml-2 hover:opacity-80 transition-opacity"
                >
                  <DebateAiLogo className="h-6 w-auto cursor-pointer" />
                </Link>
              </span>
            </p>

            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: 'var(--text3)' }}
            >
              Built for open source communities
            </p>

            <p className="flex items-center justify-center lg:justify-end gap-2 text-sm font-normal">
              <span>Made with</span>
              <BsHeartFill className="text-yellow-400" size={14} />
              <span>
                by{' '}
                <a
                  href="https://github.com/AOSSIE-Org"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AOSSIE GitHub link"
                  className="font-semibold underline transition-colors"
                  style={{ color: 'var(--text)' }}
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