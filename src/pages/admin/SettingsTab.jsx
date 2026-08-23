import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Link2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
} from 'lucide-react'
import { fetchSettings, saveSettings } from '../../services/settingsService'

const INITIAL_FORM = {
  email: '',
  phone: '',
  address: '',
  facebookUrl: '',
  instagramUrl: '',
}

const FIELDS = [
  { name: 'email', label: 'Contact Email', icon: Mail, type: 'email', placeholder: 'hello@auraspaces.com' },
  { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+1 (555) 234-8890' },
  { name: 'address', label: 'Office Address', icon: MapPin, type: 'text', placeholder: '200 Skyline Avenue, Metropolitan District' },
  { name: 'facebookUrl', label: 'Facebook URL', icon: Link2, type: 'url', placeholder: 'https://facebook.com/auraspaces' },
  { name: 'instagramUrl', label: 'Instagram URL', icon: Link2, type: 'url', placeholder: 'https://instagram.com/auraspaces' },
]

export default function SettingsTab() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetchSettings()
      .then((data) => {
        if (cancelled) return
        if (data) setForm((prev) => ({ ...prev, ...data }))
      })
      .catch((err) => {
        console.error('Error fetching settings:', err)
        if (!cancelled) {
          setLoadError('Unable to load current settings. Check your Firestore connection.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveError('')
    setSaved(false)

    try {
      await saveSettings(form)
      setSaved(true)
    } catch (err) {
      console.error('Error saving settings:', err)
      setSaveError('Unable to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div>
        <h1 className="font-display text-2xl text-white sm:text-3xl">
          Site Settings
        </h1>
        <p className="mt-2 text-sm text-navy-400">
          This information is shown across the public site — footer, contact
          section, and more.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-navy-800 bg-navy-900/40 p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-navy-400">
            <Loader2 size={28} className="animate-spin text-gold-400" />
            <p className="text-sm">Loading settings...</p>
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <AlertTriangle size={28} className="text-red-400" />
            <p className="max-w-sm text-sm text-navy-300">{loadError}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {FIELDS.map(({ name, label, icon: Icon, type, placeholder }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-300"
                >
                  {label}
                </label>
                <div className="relative">
                  <Icon
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-500"
                  />
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full rounded-md border border-navy-700 bg-navy-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-navy-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>
            ))}

            {saveError && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {saveError}
              </div>
            )}

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-gold transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>

              {saved && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                  <CheckCircle2 size={16} />
                  Saved
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
