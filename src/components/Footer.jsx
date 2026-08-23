import { Building2, Link2, Mail, MapPin, Phone } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'

export default function Footer() {
  const { settings } = useSettings()

  const socialLinks = [
    { label: 'Facebook', url: settings?.facebookUrl },
    { label: 'Instagram', url: settings?.instagramUrl },
  ].filter((link) => link.url)

  return (
    <footer className="border-t border-navy-800 bg-navy-950 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950">
              <Building2 size={16} strokeWidth={2.25} />
            </span>
            <span className="font-display text-base text-white">
              Aura <span className="text-gold-400">Spaces</span>
            </span>
          </div>

          {settings && (
            <div className="flex flex-col gap-2 text-sm text-navy-400 sm:items-end">
              {settings.phone && (
                <span className="flex items-center gap-2">
                  <Phone size={14} className="text-navy-500" />
                  {settings.phone}
                </span>
              )}
              {settings.email && (
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-navy-500" />
                  {settings.email}
                </span>
              )}
              {settings.address && (
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-navy-500" />
                  {settings.address}
                </span>
              )}
              {socialLinks.length > 0 && (
                <div className="mt-1 flex items-center gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-navy-400 transition-colors hover:text-gold-400"
                    >
                      <Link2 size={14} />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mt-8 border-t border-navy-800 pt-6 text-xs text-navy-500">
          &copy; {new Date().getFullYear()} Aura Spaces. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
