'use client'

import { ClockIcon, PlayIcon } from '@heroicons/react/24/outline'

export default function SchedulingPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Detection Scheduling</h1>
          <p className="text-gray-600">Configure automated analysis timing and on-demand runs</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="btn-primary">
            <PlayIcon className="w-4 h-4" />
            Run Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <ClockIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Scheduled Analysis</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Daily Run:</span>
              <span className="text-sm font-medium text-gray-900">02:00 UTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Run:</span>
              <span className="text-sm font-medium text-gray-900">Today 02:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Next Run:</span>
              <span className="text-sm font-medium text-gray-900">Tomorrow 02:00</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <PlayIcon className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">On-Demand Analysis</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Run immediate analysis for specific time periods or accounts.
          </p>
          <button className="btn-primary w-full justify-center">
            <PlayIcon className="w-4 h-4" />
            Start Analysis
          </button>
        </div>
      </div>
    </div>
  )
}
