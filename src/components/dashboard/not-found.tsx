'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface DashboardNotFoundProps {
  title?: string
  description?: string
}

export function DashboardNotFound({ 
  title = "Page Not Found",
  description = "The page you're looking for is not available yet. This feature is coming soon!"
}: DashboardNotFoundProps) {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6" 
             style={{ background: 'rgba(251, 191, 36, 0.1)' }}>
          <ExclamationTriangleIcon className="h-8 w-8" style={{ color: '#f59e0b' }} />
        </div>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
        <div className="p-4 rounded-lg" style={{ 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--border-primary)'
        }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            💡 This is part of the <strong>Kylo.ai</strong> MVP. Additional features are being developed.
          </p>
        </div>
      </div>
    </div>
  )
}