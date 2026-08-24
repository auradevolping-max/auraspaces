import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'الخدمات', href: '#services' },
  { label: 'أعمالنا', href: '#projects' },
  { label: 'تواصل معنا', href: '#contact' },
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

        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick('#contact')}
            className="rounded-md bg-brand-gold px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-gold/25 hover:bg-brand-dark transition-colors"
          >
            اطلب مقايسة
          </button>
        </div>

        <button
          className="md:hidden text-brand-dark"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="تبديل قائمة التنقل"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
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
            اطلب مقايسة
          </button>
        </div>
      )}
    </header>
  )
}
