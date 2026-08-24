import { motion } from 'framer-motion'
import { HardHat, PaintBucket, Sofa, Wifi } from 'lucide-react'

const SERVICES = [
  {
    icon: HardHat,
    title: 'إنشاءات عامة',
    description:
      'أعمال بناء إنشائية متكاملة تُدار من الأساسات وحتى التسليم، بمعايير هندسية دقيقة تضمن المتانة.',
  },
  {
    icon: Sofa,
    title: 'تصميم داخلي',
    description:
      'تصاميم داخلية مُصممة خصيصًا توازن بين الأناقة الخالدة والرفاهية العملية القابلة للحياة.',
  },
  {
    icon: PaintBucket,
    title: 'تشطيبات فاخرة',
    description:
      'دقة متناهية في تفاصيل الأرضيات والتكسيات والأعمال الخشبية باستخدام أرقى الخامات المستوردة.',
  },
  {
    icon: Wifi,
    title: 'إعداد المنزل الذكي',
    description:
      'دمج سلس لأنظمة الإضاءة والأمان والتحكم بالمناخ لتجربة معيشة عصرية ومتصلة بالكامل.',
  },
]

export default function Services() {
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
            ماذا نقدّم
          </span>
          <h2 className="mt-3 font-display text-3xl text-brand-dark sm:text-4xl">
            خدمات متكاملة بمعايير لا تقبل المساومة
          </h2>
          <p className="mt-4 text-brand-dark/60 leading-relaxed">
            من أول صبة خرسانية وحتى آخر لمسة تشطيب، يقدّم فريقنا كل مرحلة من
            مشروعك بدقة واهتمام تام بالتفاصيل.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
              className="group relative rounded-xl border border-brand-dark/10 bg-brand-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-lg hover:shadow-brand-gold/15"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-white">
                <Icon size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-display text-lg text-brand-dark">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-dark/60">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
