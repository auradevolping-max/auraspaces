import { useEffect, useState } from 'react'
import { Languages, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_LINKS = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ]

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

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'bg-brand-cream/85 shadow-sm shadow-black/5 border-b border-brand-gold/15'
          : 'bg-brand-cream/50 border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <a href="#top" className="flex items-center gap-2 group">
          <img
            src="/logo.jpg"
            alt="Aura Spaces"
            className="h-16 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium tracking-wide text-brand-dark/70 hover:text-brand-gold transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            dir="ltr"
            aria-label="Switch language"
            className="inline-flex items-center gap-1.5 rounded-md border border-brand-dark/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-widest text-brand-dark/70 transition-colors hover:border-brand-gold/50 hover:text-brand-gold"
          >
            <Languages size={15} />
            {t('nav.switchTo')}
          </button>
          <button
            onClick={() => handleNavClick('#contact')}
            className="rounded-md bg-brand-gold px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-gold/25 hover:bg-brand-dark transition-colors"
          >
            {t('nav.cta')}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            dir="ltr"
            aria-label="Switch language"
            className="inline-flex items-center gap-1 rounded-md border border-brand-dark/15 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-dark/70"
          >
            <Languages size={14} />
            {t('nav.switchTo')}
          </button>
          <button
            className="text-brand-dark"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-brand-cream/98 backdrop-blur-md border-t border-brand-gold/15 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-start text-base font-medium text-brand-dark/70 hover:text-brand-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="rounded-md bg-brand-gold px-5 py-3 text-sm font-semibold text-white text-center shadow-md shadow-brand-gold/25 hover:bg-brand-dark transition-colors"
          >
            {t('nav.cta')}
          </button>
        </div>
      )}
    </header>
  )
}
