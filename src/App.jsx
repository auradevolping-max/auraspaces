import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import LeadsTab from './pages/admin/LeadsTab'
import ProjectsTab from './pages/admin/ProjectsTab'
import SettingsTab from './pages/admin/SettingsTab'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="leads" replace />} />
            <Route path="leads" element={<LeadsTab />} />
            <Route path="projects" element={<ProjectsTab />} />
            <Route path="settings" element={<SettingsTab />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
