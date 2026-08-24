import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import { SettingsProvider } from '../context/SettingsContext'

export default function Home() {
  const { i18n } = useTranslation()
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr'

  return (
    <SettingsProvider>
      <div dir={dir} lang={i18n.language} className="min-h-screen bg-brand-cream text-brand-dark">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Projects />
          <ContactForm />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </SettingsProvider>
  )
}
