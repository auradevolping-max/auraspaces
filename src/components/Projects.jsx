import { useEffect, useState } from 'react'
import { ArrowUpRight, FolderKanban, Loader2 } from 'lucide-react'
import { subscribeToProjects } from '../services/projectsService'

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
    <section id="projects" className="bg-navy-950 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Our Portfolio
          </span>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Recent Projects
          </h2>
          <p className="mt-4 text-navy-300 leading-relaxed">
            A selection of residences and developments crafted with our
            signature attention to detail.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 flex flex-col items-center justify-center gap-3 py-16 text-navy-400">
            <Loader2 size={28} className="animate-spin text-gold-400" />
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center gap-3 rounded-xl border border-navy-800 py-16 text-center">
            <FolderKanban size={28} className="text-navy-600" />
            <p className="text-sm text-navy-400">
              New projects are on the way — check back soon.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-xl border border-navy-800"
              >
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                    {project.category}
                  </span>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg text-white">
                      {project.title}
                    </h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
