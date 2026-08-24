import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../context/SettingsContext'
import { toMailtoLink, toWhatsAppLink } from '../utils/contactLinks'
import { Facebook, Instagram } from './icons/SocialIcons'

export default function Footer() {
  const { t } = useTranslation()
  const { settings } = useSettings()

  const socialLinks = [
    { key: 'facebook', url: settings?.facebookUrl, Icon: Facebook },
    { key: 'instagram', url: settings?.instagramUrl, Icon: Instagram },
  ].filter((link) => link.url)

  const phones = (settings?.phones || []).filter((phone) => phone?.number)

  return (
    <footer className="border-t border-brand-dark/10 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <img
            src="/logo.jpg"
            alt="Aura Spaces"
            className="h-10 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />

          {settings && (
            <div className="flex flex-col gap-2 text-sm text-brand-dark/60 sm:items-end">
              {phones.map((phone) => (
                <a
                  key={phone.number}
                  href={toWhatsAppLink(phone.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-brand-gold"
                >
                  <Phone size={14} className="text-brand-dark/40" />
                  {phone.label ? `${phone.label}: ${phone.number}` : phone.number}
                </a>
              ))}
              {settings.email && (
                <a
                  href={toMailtoLink(settings.email)}
                  className="flex items-center gap-2 transition-colors hover:text-brand-gold"
                >
                  <Mail size={14} className="text-brand-dark/40" />
                  {settings.email}
                </a>
              )}
              {settings.address && (
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-brand-dark/40" />
                  {settings.address}
                </span>
              )}
              {socialLinks.length > 0 && (
                <div className="mt-2 flex items-center gap-3">
                  {socialLinks.map(({ key, url, Icon }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-dark/15 text-brand-dark/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-gold hover:text-white"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mt-8 border-t border-brand-dark/10 pt-6 text-xs text-brand-dark/40">
          &copy; {new Date().getFullYear()} Aura Spaces. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
