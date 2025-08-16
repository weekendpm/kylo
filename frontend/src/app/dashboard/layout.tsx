'use client'

import { useAuth } from '@/lib/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: 'var(--primary)' }}></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main content */}
      <main className="main-content">
        <DashboardHeader />
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  )
}