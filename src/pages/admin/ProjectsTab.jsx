import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  FolderKanban,
  ImagePlus,
  Loader2,
  Trash2,
  UploadCloud,
} from 'lucide-react'
import { SERVICE_CATEGORIES } from '../../constants/services'
import { uploadImageToImgBB } from '../../services/imgbbService'
import {
  addProject,
  deleteProject,
  subscribeToProjects,
} from '../../services/projectsService'

const INITIAL_FORM = {
  title: '',
  category: SERVICE_CATEGORIES[0],
  description: '',
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [form, setForm] = useState(INITIAL_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const unsubscribe = subscribeToProjects(
      (data) => {
        setProjects(data)
        setLoading(false)
        setLoadError('')
      },
      (err) => {
        console.error('Error fetching projects:', err)
        setLoadError('Unable to load projects. Check your Firestore connection.')
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('')
      return
    }
    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files?.[0] || null)
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setImageFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!form.title.trim() || !form.description.trim() || !imageFile) {
      setSubmitError('Please provide a title, description, and an image.')
      return
    }

    setSubmitting(true)
    try {
      const imageUrl = await uploadImageToImgBB(imageFile)
      await addProject({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        imageUrl,
      })
      resetForm()
    } catch (err) {
      console.error('Error adding project:', err)
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Delete the project "${project.title}"? This cannot be undone.`,
    )
    if (!confirmed) return

    setPendingDeleteId(project.id)
    try {
      await deleteProject(project.id)
    } catch (err) {
      console.error('Error deleting project:', err)
    } finally {
      setPendingDeleteId(null)
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="font-display text-2xl text-white sm:text-3xl">
          Projects
        </h1>
        <p className="mt-2 text-sm text-navy-400">
          Add portfolio projects — they appear on the public site instantly.
        </p>
      </div>

      {/* Add project form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-xl border border-navy-800 bg-navy-900/40 p-6"
      >
        <h2 className="font-display text-lg text-white">Add New Project</h2>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="The Meridian Residence"
                className="w-full rounded-md border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white placeholder:text-navy-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-md border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              >
                {SERVICE_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="A brief description of the project..."
                className="w-full resize-none rounded-md border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white placeholder:text-navy-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label
              htmlFor="image"
              className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
            >
              Project Image
            </label>
            <label
              htmlFor="image"
              className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-navy-700 bg-navy-900 text-navy-400 transition-colors hover:border-gold-500/50 hover:text-gold-400"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected preview"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <>
                  <ImagePlus size={26} />
                  <span className="mt-2 text-xs">Click to select an image</span>
                </>
              )}
            </label>
            <input
              ref={fileInputRef}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
          </div>
        </div>

        {submitError && (
          <div className="mt-5 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {submitError}
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-gold transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud size={18} />
                Add Project
              </>
            )}
          </button>
        </div>
      </form>

      {/* Existing projects */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-white">Existing Projects</h2>
          {!loading && !loadError && (
            <span className="text-xs text-navy-400">
              {projects.length} project{projects.length === 1 ? '' : 's'}
            </span>
          )}
        </div>

        {loading ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-navy-800 bg-navy-900/40 py-20 text-navy-400">
            <Loader2 size={28} className="animate-spin text-gold-400" />
            <p className="text-sm">Loading projects...</p>
          </div>
        ) : loadError ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-navy-800 bg-navy-900/40 py-20 text-center">
            <AlertTriangle size={28} className="text-red-400" />
            <p className="max-w-sm text-sm text-navy-300">{loadError}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-navy-800 bg-navy-900/40 py-20 text-center">
            <FolderKanban size={28} className="text-navy-500" />
            <p className="text-sm text-navy-400">
              No projects yet. Add your first project above.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="overflow-hidden rounded-xl border border-navy-800 bg-navy-900/40"
              >
                <div className="aspect-video w-full bg-navy-800">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                    {project.category || '—'}
                  </span>
                  <h3 className="mt-1 font-display text-lg text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-navy-300">
                    {project.description}
                  </p>
                  <button
                    onClick={() => handleDelete(project)}
                    disabled={pendingDeleteId === project.id}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-navy-400 transition-colors hover:text-red-400 disabled:opacity-50"
                  >
                    {pendingDeleteId === project.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
