import { HardHat, PaintBucket, Sofa, Wifi } from 'lucide-react'

const SERVICES = [
  {
    icon: HardHat,
    title: 'General Construction',
    description:
      'Full-scale structural builds managed from groundwork to handover, engineered for durability and precision.',
  },
  {
    icon: Sofa,
    title: 'Interior Design',
    description:
      'Bespoke interior concepts that balance timeless elegance with functional, livable luxury.',
  },
  {
    icon: PaintBucket,
    title: 'Premium Finishing',
    description:
      'Meticulous detailing in flooring, cladding, and millwork using the finest imported materials.',
  },
  {
    icon: Wifi,
    title: 'Smart Home Setup',
    description:
      'Seamless integration of lighting, security, and climate automation for modern connected living.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-navy-900 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            What We Do
          </span>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Comprehensive Services, Uncompromising Standards
          </h2>
          <p className="mt-4 text-navy-300 leading-relaxed">
            From the first foundation pour to the final polished surface, our
            team delivers every phase of your project with precision and
            care.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative rounded-xl border border-navy-800 bg-navy-950/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-gold"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                <Icon size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-display text-lg text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-300">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
