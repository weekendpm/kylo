'use client'

import { useAuth } from '@/lib/auth-provider'
import { ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export function DashboardHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Revenue Intelligence Dashboard</h1>
        <p className="header-subtitle">Real-time leak detection and automated recovery</p>
      </div>
      <div className="header-actions">
        <div className="ai-status">
          <div className="status-dot"></div>
          AI Active
        </div>
        <button className="btn btn-secondary">
          <ArrowDownTrayIcon width="16" height="16" />
          Export Data
        </button>
        <button className="btn btn-primary">
          <ArrowPathIcon width="16" height="16" />
          Run Analysis
        </button>
      </div>
    </header>
  )
}