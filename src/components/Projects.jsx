import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, FolderKanban } from 'lucide-react'
import { subscribeToProjects } from '../services/projectsService'

function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-dark/10">
      <div className="aspect-[4/3] w-full animate-pulse bg-brand-dark/10" />
      <div className="space-y-2 p-6">
        <div className="h-3 w-20 animate-pulse rounded bg-brand-dark/10" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-brand-dark/10" />
      </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToProjects(
      (data) => {
        setProjects(data)
        setLoading(false)
      },
      (err) => {
        console.error('Error fetching projects:', err)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  return (
    <section id="projects" className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            أعمالنا
          </span>
          <h2 className="mt-3 font-display text-3xl text-brand-dark sm:text-4xl">
            مشاريعنا الأخيرة
          </h2>
          <p className="mt-4 text-brand-dark/60 leading-relaxed">
            مجموعة مختارة من المساكن والمشاريع المُنفذة بلمستنا المميزة في
            الاهتمام بالتفاصيل.
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center gap-3 rounded-xl border border-brand-dark/10 py-16 text-center">
            <FolderKanban size={28} className="text-brand-dark/30" />
            <p className="text-sm text-brand-dark/50">
              مشاريع جديدة في الطريق — تابعونا قريبًا.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-xl border border-brand-dark/10"
              >
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-brand-dark/10 via-brand-dark/15 to-brand-dark/25">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                    {project.category}
                  </span>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg text-white">
                      {project.title}
                    </h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-white">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
