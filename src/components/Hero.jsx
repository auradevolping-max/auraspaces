import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function Hero() {
  const handleNavClick = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-brand-cream pt-40 pb-28 lg:pt-48 lg:pb-36"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,168,128,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(197,168,128,0.14),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(42,42,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(42,42,42,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span
            dir="ltr"
            className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold"
          >
            <Sparkles size={14} />
            Spaces with Aura
          </span>

          <h1 className="mt-6 font-sans text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl lg:text-6xl">
            نبني مساحات
            <span className="block text-brand-gold">
              تعيد تعريف الرفاهية
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-dark/65">
            أورا سبيسز تقدّم خدمات إنشاء وتشطيب متكاملة لعملائنا المميزين، من
            الدقة الهندسية في التنفيذ إلى أرقى تفاصيل التشطيبات الداخلية،
            بحرفية لا تقبل المساومة.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleNavClick('#contact')}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-gold/25 hover:bg-brand-dark transition-colors"
            >
              اطلب مقايسة
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
            </button>
            <button
              onClick={() => handleNavClick('#projects')}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-dark/15 bg-white/60 px-7 py-3.5 text-sm font-semibold text-brand-dark hover:border-brand-gold/50 hover:text-brand-gold transition-colors"
            >
              استعرض أعمالنا
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
