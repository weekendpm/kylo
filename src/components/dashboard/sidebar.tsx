'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  MagnifyingGlassIcon,
  UserGroupIcon,
  ClockIcon,
  DocumentTextIcon,
  LinkIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/lib/auth-provider'
import clsx from 'clsx'

const analyticsNavigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon },
  { name: 'Detection Engine', href: '/dashboard/detection', icon: MagnifyingGlassIcon },
  { name: 'Accounts', href: '/dashboard/accounts', icon: UserGroupIcon },
]

const actionsNavigation = [
  { name: 'Automation Rules', href: '/dashboard/automation', icon: ClockIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: DocumentTextIcon },
]

const systemNavigation = [
  { name: 'Integrations', href: '/dashboard/integrations', icon: LinkIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { org } = useAuth()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10 5.16 0 9-4.45 9-10V7l-10-5z"/>
            <path d="M12 12h.01"/>
          </svg>
        </div>
        <div className="logo-text">Kylo.ai</div>
      </div>
      
      <div className="nav-section">
        <div className="nav-label">Analytics</div>
        <nav className="nav-menu">
          {analyticsNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx('nav-item', {
                'active': isActive(item.href)
              })}
            >
              <item.icon className="nav-icon" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="nav-section">
        <div className="nav-label">Actions</div>
        <nav className="nav-menu">
          {actionsNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx('nav-item', {
                'active': isActive(item.href)
              })}
            >
              <item.icon className="nav-icon" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="nav-section">
        <div className="nav-label">System</div>
        <nav className="nav-menu">
          {systemNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx('nav-item', {
                'active': isActive(item.href)
              })}
            >
              <item.icon className="nav-icon" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}