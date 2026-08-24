import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import { SettingsProvider } from '../context/SettingsContext'

export default function Home() {
  return (
    <SettingsProvider>
      <div dir="rtl" lang="ar" className="min-h-screen bg-brand-cream text-brand-dark">
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
