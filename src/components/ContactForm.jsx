import { useState } from 'react'
import { motion } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { db } from '../config/firebase'
import { useSettings } from '../context/SettingsContext'
import { SERVICE_CATEGORIES, SERVICE_LABELS_AR } from '../constants/services'
import { toMailtoLink, toWhatsAppLink } from '../utils/contactLinks'
import { notifyNewLead } from '../services/telegramService'

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

  const phones = (settings?.phones || []).filter((phone) => phone?.number)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      const msg = 'يرجى تقديم الاسم ورقم الهاتف.'
      setError(msg)
      setStatus('error')
      toast.error(msg)
      return
    }

    setStatus('submitting')
    setError('')

    const lead = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      service: form.service,
      message: form.message.trim(),
    }

    try {
      await addDoc(collection(db, 'leads'), {
        ...lead,
        status: 'new',
        createdAt: serverTimestamp(),
      })
      setStatus('success')
      setForm(INITIAL_FORM)
      toast.success('تم إرسال طلبك بنجاح! سيتواصل معك فريقنا قريبًا.')

      notifyNewLead(lead)
    } catch (err) {
      console.error('Error submitting lead:', err)
      const msg = 'حدث خطأ ما. حاول مرة أخرى بعد قليل.'
      setError(msg)
      setStatus('error')
      toast.error(msg)
    }
  }

  return (
    <section id="contact" className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-14"
        >
          {/* Info column */}
          <div className="lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              تواصل معنا
            </span>
            <h2 className="mt-3 font-display text-3xl text-brand-dark sm:text-4xl">
              ابدأ مشروعك اليوم
            </h2>
            <p className="mt-4 text-brand-dark/60 leading-relaxed">
              شاركنا رؤيتك وسيتواصل أحد مستشاري المشاريع لدينا خلال 24 ساعة
              بعرض سعر مخصص.
            </p>

            <div className="mt-10 space-y-5">
              {phones.map((phone) => (
                <a
                  key={phone.number}
                  href={toWhatsAppLink(phone.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-dark/70 transition-colors hover:text-brand-gold"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold">
                    <Phone size={18} />
                  </span>
                  <span className="text-sm">
                    {phone.label ? `${phone.label}: ${phone.number}` : phone.number}
                  </span>
                </a>
              ))}
              {settings?.email && (
                <a
                  href={toMailtoLink(settings.email)}
                  className="flex items-center gap-3 text-brand-dark/70 transition-colors hover:text-brand-gold"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold">
                    <Mail size={18} />
                  </span>
                  <span className="text-sm">{settings.email}</span>
                </a>
              )}
              {settings?.address && (
                <div className="flex items-center gap-3 text-brand-dark/70">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold">
                    <MapPin size={18} />
                  </span>
                  <span className="text-sm">{settings.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-brand-dark/10 bg-white p-8 shadow-sm"
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 size={48} className="text-brand-gold" />
                  <h3 className="mt-4 font-display text-xl text-brand-dark">
                    شكرًا لك!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-brand-dark/60">
                    تم استلام طلبك. سيتواصل معك فريقنا في أقرب وقت.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-brand-gold hover:text-brand-dark"
                  >
                    إرسال طلب آخر
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-widest text-brand-dark/50"
                    >
                      الاسم الكامل
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="الاسم الكامل"
                      className="w-full rounded-md border border-brand-dark/15 bg-brand-cream px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/35 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-semibold uppercase tracking-widest text-brand-dark/50"
                    >
                      رقم الهاتف
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      dir="ltr"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+20 100 000 0000"
                      className="w-full rounded-md border border-brand-dark/15 bg-brand-cream px-4 py-3 text-end text-sm text-brand-dark placeholder:text-brand-dark/35 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="service"
                      className="mb-2 block text-xs font-semibold uppercase tracking-widest text-brand-dark/50"
                    >
                      الخدمة المطلوبة
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full rounded-md border border-brand-dark/15 bg-brand-cream px-4 py-3 text-sm text-brand-dark focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {SERVICE_LABELS_AR[option] || option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-semibold uppercase tracking-widest text-brand-dark/50"
                    >
                      تفاصيل المشروع
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="أخبرنا عن مشروعك..."
                      className="w-full resize-none rounded-md border border-brand-dark/15 bg-brand-cream px-4 py-3 text-sm text-brand-dark placeholder:text-brand-dark/35 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  {status === 'error' && error && (
                    <div className="sm:col-span-2 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                      {error}
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-gold/25 transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          جارٍ الإرسال...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          اطلب مقايسة
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
