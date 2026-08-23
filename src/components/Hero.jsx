import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export default function Hero() {
  const handleNavClick = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-navy-950 pt-40 pb-28 lg:pt-48 lg:pb-36"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,152,43,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,115,143,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400">
            <Sparkles size={14} />
            Construction &amp; Premium Finishing
          </span>

          <h1 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Building Spaces That
            <span className="block text-gold-400">Redefine Luxury Living</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-200">
            Aura Spaces delivers end-to-end construction and finishing for
            discerning clients — from architectural precision to the finest
            interior detailing, executed with uncompromising craftsmanship.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleNavClick('#contact')}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-gold hover:bg-gold-400 transition-colors"
            >
              Request a Consultation
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => handleNavClick('#projects')}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-navy-700 bg-navy-900/60 px-7 py-3.5 text-sm font-semibold text-navy-100 hover:border-gold-500/40 hover:text-gold-400 transition-colors"
            >
              View Our Portfolio
            </button>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-navy-800 pt-8 text-navy-300">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-gold-400" />
              <span className="text-sm">Licensed &amp; Fully Insured</span>
            </div>
            <div>
              <span className="font-display text-2xl text-white">120+</span>
              <span className="ml-2 text-sm">Projects Delivered</span>
            </div>
            <div>
              <span className="font-display text-2xl text-white">15</span>
              <span className="ml-2 text-sm">Years of Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
