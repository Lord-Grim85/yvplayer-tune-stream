import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth } from '@/lib/auth'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Playlist from '@/pages/Playlist'
import Video from '@/pages/Video'

const queryClient = new QueryClient()

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// App routes component
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlist/:id"
        element={
          <ProtectedRoute>
            <Playlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/video/:id"
        element={
          <ProtectedRoute>
            <Video />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default function App() {
  // Detect and apply system theme
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', isDark)

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <TooltipProvider>
            <AppRoutes />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}
