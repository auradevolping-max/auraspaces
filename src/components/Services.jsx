import { motion } from 'framer-motion'
import { HardHat, PaintBucket, Sofa, Wifi } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SERVICE_KEYS = [
  { key: 'construction', icon: HardHat },
  { key: 'interior', icon: Sofa },
  { key: 'finishing', icon: PaintBucket },
  { key: 'smartHome', icon: Wifi },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t('services.eyebrow')}
          </span>
          <h2 className="mt-3 font-display text-3xl text-brand-dark sm:text-4xl">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-brand-dark/60 leading-relaxed">
            {t('services.description')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICE_KEYS.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative rounded-xl border border-brand-dark/10 bg-brand-cream p-7 transition-colors duration-300 hover:border-brand-gold/50 hover:shadow-xl hover:shadow-brand-gold/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-white">
                <Icon size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-display text-lg text-brand-dark">
                {t(`services.items.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">
                {t(`services.items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
