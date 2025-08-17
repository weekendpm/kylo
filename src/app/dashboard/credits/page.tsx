'use client'

import { EyeIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function CreditMonitorPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Credit Monitor</h1>
          <p className="text-gray-600">Read-only credit grants, balances, and expiry tracking</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="btn-secondary">
            <EyeIcon className="w-4 h-4" />
            Refresh Credits
          </button>
        </div>
      </div>

      <div className="card p-12 text-center">
        <EyeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Credit Monitor</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Track credit grants, remaining balances, and expiry dates from your billing system. 
          Automatically identify when credits should be applied to reduce customer charges.
        </p>
      </div>
    </div>
  )
}
