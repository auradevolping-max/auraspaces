import { createContext, useContext, useEffect, useState } from 'react'
import { subscribeToSettings } from '../services/settingsService'

const SettingsContext = createContext(undefined)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToSettings(
      (data) => {
        setSettings(data)
        setLoading(false)
      },
      (err) => {
        console.error('Error fetching settings:', err)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
