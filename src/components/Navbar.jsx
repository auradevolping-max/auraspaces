import { useEffect, useState } from 'react'
import { Menu, X, Building2 } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-gold-500/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold">
            <Building2 size={20} strokeWidth={2.25} />
          </span>
          <span className="font-display text-xl tracking-wide text-white">
            Aura <span className="text-gold-400">Spaces</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium tracking-wide text-navy-200 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick('#contact')}
            className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-gold hover:bg-gold-400 transition-colors"
          >
            Get a Quote
          </button>
        </div>

        <button
          className="md:hidden text-navy-100"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-navy-950/98 backdrop-blur-md border-t border-gold-500/10 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-base font-medium text-navy-200 hover:text-gold-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 text-center shadow-gold hover:bg-gold-400 transition-colors"
          >
            Get a Quote
          </button>
        </div>
      )}
    </header>
  )
}
