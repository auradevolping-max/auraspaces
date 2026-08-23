import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { SettingsProvider } from '../context/SettingsContext'

export default function Home() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-navy-950">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Projects />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </SettingsProvider>
  )
}
