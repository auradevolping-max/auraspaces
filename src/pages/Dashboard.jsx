import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Building2,
  FolderKanban,
  LogOut,
  Menu,
  Settings as SettingsIcon,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { logout } from '../services/authService'

const NAV_ITEMS = [
  { to: '/admin/leads', label: 'Leads', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
]

function SidebarContent({ user, onNavigate, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold">
          <Building2 size={18} strokeWidth={2.25} />
        </span>
        <div>
          <p className="font-display text-lg text-white leading-none">
            Aura <span className="text-gold-400">Spaces</span>
          </p>
          <p className="mt-1 text-xs text-navy-400">Admin CMS</p>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gold-500/10 text-gold-400'
                  : 'text-navy-300 hover:bg-navy-800/60 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-navy-800 px-4 py-5">
        {user?.email && (
          <p className="truncate px-2 pb-3 text-xs text-navy-500">{user.email}</p>
        )}
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-navy-300 transition-colors hover:bg-navy-800/60 hover:text-gold-400"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-navy-950 lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-navy-800 bg-navy-900/60 lg:block">
        <SidebarContent user={user} onLogout={handleLogout} />
      </aside>

      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-navy-800 bg-navy-900/60 px-6 py-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950">
            <Building2 size={16} strokeWidth={2.25} />
          </span>
          <span className="font-display text-base text-white">
            Aura <span className="text-gold-400">Spaces</span>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="text-navy-200"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative h-full w-72 border-r border-navy-800 bg-navy-900">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="absolute right-4 top-4 text-navy-300"
            >
              <X size={22} />
            </button>
            <SidebarContent
              user={user}
              onLogout={handleLogout}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <main className="min-w-0 flex-1 px-6 py-10 lg:px-10">
        <Outlet />
      </main>
    </div>
  )
}
