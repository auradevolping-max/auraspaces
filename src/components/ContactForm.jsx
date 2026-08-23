import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { db } from '../config/firebase'
import { useSettings } from '../context/SettingsContext'
import { SERVICE_CATEGORIES } from '../constants/services'

const SERVICE_OPTIONS = [...SERVICE_CATEGORIES, 'Other']

const INITIAL_FORM = {
  name: '',
  phone: '',
  service: SERVICE_OPTIONS[0],
  message: '',
}

export default function ContactForm() {
  const { settings } = useSettings()
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please provide your name and phone number.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setError('')

    try {
      await addDoc(collection(db, 'leads'), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service,
        message: form.message.trim(),
        status: 'new',
        createdAt: serverTimestamp(),
      })
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch (err) {
      console.error('Error submitting lead:', err)
      setError('Something went wrong. Please try again in a moment.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-navy-900 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Info column */}
          <div className="lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Get In Touch
            </span>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Start Your Project Today
            </h2>
            <p className="mt-4 text-navy-300 leading-relaxed">
              Tell us about your vision and one of our project consultants
              will reach out within 24 hours with a tailored quote.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3 text-navy-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
                  <Phone size={18} />
                </span>
                <span className="text-sm">
                  {settings?.phone || '+1 (555) 234-8890'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-navy-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
                  <Mail size={18} />
                </span>
                <span className="text-sm">
                  {settings?.email || 'hello@auraspaces.com'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-navy-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
                  <MapPin size={18} />
                </span>
                <span className="text-sm">
                  {settings?.address ||
                    '200 Skyline Avenue, Metropolitan District'}
                </span>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-navy-800 bg-navy-950/60 p-8"
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 size={48} className="text-gold-400" />
                  <h3 className="mt-4 font-display text-xl text-white">
                    Thank You!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-navy-300">
                    Your request has been received. Our team will contact you
                    shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-gold-400 hover:text-gold-300"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-md border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white placeholder:text-navy-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-md border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white placeholder:text-navy-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="service"
                      className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
                    >
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full rounded-md border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className="w-full resize-none rounded-md border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white placeholder:text-navy-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {status === 'error' && error && (
                    <div className="sm:col-span-2 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-gold transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Request a Quote
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
