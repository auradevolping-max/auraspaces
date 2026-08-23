import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Inbox,
  Loader2,
  MessageSquareText,
  Phone,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  deleteLead,
  subscribeToLeads,
  updateLeadStatus,
} from '../../services/leadsService'

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

function formatDate(timestamp) {
  if (!timestamp?.toDate) return '—'
  return timestamp.toDate().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function isWithinLastWeek(timestamp) {
  if (!timestamp?.toDate) return false
  return Date.now() - timestamp.toDate().getTime() <= SEVEN_DAYS_MS
}

function StatusBadge({ status }) {
  const isContacted = status === 'contacted'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isContacted
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'bg-gold-500/10 text-gold-400'
      }`}
    >
      {isContacted ? <CheckCircle2 size={13} /> : <Clock size={13} />}
      {isContacted ? 'Contacted' : 'New'}
    </span>
  )
}

function MetricCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-xl border border-navy-800 bg-navy-900/60 p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-navy-400">
          {label}
        </span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}
        >
          <Icon size={17} />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl text-white">{value}</p>
    </div>
  )
}

export default function LeadsTab() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingId, setPendingId] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToLeads(
      (data) => {
        setLeads(data)
        setLoading(false)
        setError('')
      },
      (err) => {
        console.error('Error fetching leads:', err)
        setError(
          'Unable to load leads. Check your Firestore connection and security rules.',
        )
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  const metrics = useMemo(() => {
    const total = leads.length
    const contacted = leads.filter((lead) => lead.status === 'contacted').length
    const newLeads = total - contacted
    const recent = leads.filter((lead) => isWithinLastWeek(lead.createdAt)).length
    return { total, contacted, newLeads, recent }
  }, [leads])

  const handleToggleStatus = async (lead) => {
    const nextStatus = lead.status === 'contacted' ? 'new' : 'contacted'
    setPendingId(lead.id)
    try {
      await updateLeadStatus(lead.id, nextStatus)
    } catch (err) {
      console.error('Error updating lead status:', err)
    } finally {
      setPendingId(null)
    }
  }

  const handleDelete = async (lead) => {
    const confirmed = window.confirm(
      `Delete the lead from "${lead.name}"? This cannot be undone.`,
    )
    if (!confirmed) return

    setPendingId(lead.id)
    try {
      await deleteLead(lead.id)
    } catch (err) {
      console.error('Error deleting lead:', err)
    } finally {
      setPendingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="font-display text-2xl text-white sm:text-3xl">
          Leads Overview
        </h1>
        <p className="mt-2 text-sm text-navy-400">
          Manage and track inquiries submitted through the contact form.
        </p>
      </div>

      {/* Metric cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={Users}
          label="Total Leads"
          value={metrics.total}
          accent="bg-navy-700/60 text-navy-100"
        />
        <MetricCard
          icon={Clock}
          label="Awaiting Contact"
          value={metrics.newLeads}
          accent="bg-gold-500/10 text-gold-400"
        />
        <MetricCard
          icon={CheckCircle2}
          label="Contacted"
          value={metrics.contacted}
          accent="bg-emerald-500/10 text-emerald-400"
        />
        <MetricCard
          icon={TrendingUp}
          label="Recent Inquiries (7d)"
          value={metrics.recent}
          accent="bg-navy-700/60 text-navy-100"
        />
      </div>

      {/* Table */}
      <div className="mt-10 rounded-xl border border-navy-800 bg-navy-900/40">
        <div className="flex items-center justify-between border-b border-navy-800 px-6 py-4">
          <h2 className="font-display text-lg text-white">All Leads</h2>
          {!loading && !error && (
            <span className="text-xs text-navy-400">
              {leads.length} record{leads.length === 1 ? '' : 's'}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-navy-400">
            <Loader2 size={28} className="animate-spin text-gold-400" />
            <p className="text-sm">Loading leads...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <AlertTriangle size={28} className="text-red-400" />
            <p className="max-w-sm text-sm text-navy-300">{error}</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <Inbox size={28} className="text-navy-500" />
            <p className="text-sm text-navy-400">
              No leads yet. New inquiries will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-navy-800 text-xs font-semibold uppercase tracking-widest text-navy-400">
                  <th className="px-6 py-3.5">Name</th>
                  <th className="px-6 py-3.5">Phone</th>
                  <th className="px-6 py-3.5">Service</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Message</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="text-navy-200 transition-colors hover:bg-navy-900/60"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {lead.name || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5">
                        <Phone size={14} className="text-navy-500" />
                        {lead.phone || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-navy-800 px-2.5 py-1 text-xs text-navy-200">
                        {lead.service || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-navy-400">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      {lead.message ? (
                        <span
                          className="flex max-w-[220px] items-start gap-1.5 truncate text-navy-300"
                          title={lead.message}
                        >
                          <MessageSquareText
                            size={14}
                            className="mt-0.5 shrink-0 text-navy-500"
                          />
                          <span className="truncate">{lead.message}</span>
                        </span>
                      ) : (
                        <span className="text-navy-600">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(lead)}
                        disabled={pendingId === lead.id}
                        className="disabled:opacity-50"
                        title="Toggle contacted status"
                      >
                        <StatusBadge status={lead.status} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDelete(lead)}
                          disabled={pendingId === lead.id}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-navy-400 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                          title="Delete lead"
                        >
                          {pendingId === lead.id ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
