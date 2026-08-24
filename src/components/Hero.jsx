import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop'

export default function Hero() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  const handleNavClick = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate overflow-hidden bg-brand-cream pt-40 pb-28 lg:pt-48 lg:pb-32"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,168,128,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(197,168,128,0.14),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(42,42,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(42,42,42,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <span
              dir="ltr"
              className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold"
            >
              <Sparkles size={14} />
              {t('hero.badge')}
            </span>

            <h1 className="mt-6 font-sans text-4xl font-extrabold leading-tight text-brand-dark sm:text-5xl lg:text-6xl">
              {t('hero.titleLine1')}
              <span className="block text-brand-gold">{t('hero.titleLine2')}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-dark/65">
              {t('hero.description')}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleNavClick('#contact')}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-gold/25 hover:bg-brand-dark transition-colors"
              >
                {t('hero.ctaPrimary')}
                <ArrowLeft
                  size={18}
                  className={`transition-transform ${
                    isRtl
                      ? 'group-hover:-translate-x-1'
                      : 'group-hover:translate-x-1 rotate-180'
                  }`}
                />
              </button>
              <button
                onClick={() => handleNavClick('#projects')}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-dark/15 bg-white/60 px-7 py-3.5 text-sm font-semibold text-brand-dark hover:border-brand-gold/50 hover:text-brand-gold transition-colors"
              >
                {t('hero.ctaSecondary')}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl shadow-brand-dark/20">
              <motion.img
                src={HERO_IMAGE}
                alt={t('hero.imageCaption')}
                style={{ y: imageY, scale: imageScale }}
                className="absolute inset-0 h-[120%] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
            </div>

            {/* Floating gold accent */}
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-brand-gold/10 blur-2xl" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="absolute -bottom-6 start-6 flex items-center gap-3 rounded-xl border border-brand-gold/20 bg-white/95 px-5 py-4 shadow-xl shadow-brand-dark/10 backdrop-blur"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                <ArrowUpRight size={20} />
              </span>
              <div>
                <p className="font-display text-lg leading-none text-brand-dark">
                  {t('hero.imageCaption')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
