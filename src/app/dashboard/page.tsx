'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/lib/api'
import { KPICard } from '@/components/dashboard/kpi-card'
import { AnomalyTable } from '@/components/dashboard/anomaly-table'
import { 
  PlayIcon, 
  ArrowDownTrayIcon, 
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

const demoAnomalies = [
  {
    id: '1',
    account: 'Acme Corp',
    product: 'API Calls',
    period: '2024-01',
    actual: 125000,
    reported: 100000,
    delta: 25000,
    billableDelta: 25000,
    grossAmount: 2500,
    creditsApplied: 0,
    creditsEligible: 500,
    netDue: 2500,
    severity: 'Critical' as const,
    rootCause: 'Ingestion Gap',
    lastSync: '2024-01-31',
    status: 'Open' as const
  },
  {
    id: '2',
    account: 'TechStart Inc',
    product: 'Storage GB',
    period: '2024-01',
    actual: 8500,
    reported: 7200,
    delta: 1300,
    billableDelta: 800,
    grossAmount: 650,
    creditsApplied: 100,
    creditsEligible: 100,
    netDue: 550,
    severity: 'High' as const,
    rootCause: 'Tier Mismatch',
    lastSync: '2024-01-30',
    status: 'Needs Evidence' as const
  },
  {
    id: '3',
    account: 'Global Systems',
    product: 'Bandwidth TB',
    period: '2024-01',
    actual: 45,
    reported: 42,
    delta: 3,
    billableDelta: 3,
    grossAmount: 900,
    creditsApplied: 200,
    creditsEligible: 300,
    netDue: 700,
    severity: 'Medium' as const,
    rootCause: 'Credit Not Applied',
    lastSync: '2024-01-31',
    status: 'Open' as const
  }
]

export default function DashboardOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month')
  const [selectedSegment, setSelectedSegment] = useState('All')
  const [selectedAnomaly, setSelectedAnomaly] = useState<any>(null)

  const { data: summary, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () => dashboardService.getSummary(),
  })

  const kpiData = [
    {
      title: 'Recoverable Revenue',
      value: 427850,
      format: 'currency' as const,
      change: { value: 15.2, period: 'vs last month' },
      tooltip: 'Total potential revenue recovery from detected anomalies'
    },
    {
      title: 'At-Risk Accounts',
      value: 127,
      format: 'number' as const,
      change: { value: -8.1, period: 'vs last month' },
      tooltip: 'Accounts with critical or high severity anomalies'
    },
    {
      title: 'Recovery Success Rate',
      value: 94.2,
      format: 'percentage' as const,
      change: { value: 2.1, period: 'vs last month' },
      tooltip: 'Percentage of recovery actions that resulted in collected revenue'
    },
    {
      title: 'Avg Time to Cash',
      value: '12.5 days',
      change: { value: -15.8, period: 'vs last month' },
      tooltip: 'Average time from anomaly detection to revenue collection'
    }
  ]

  const segments = ['All', 'Critical', 'High Value', 'This Month']

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Overview</h1>
        </div>
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card h-32 bg-gray-100"></div>
            ))}
          </div>
          <div className="card h-96 bg-gray-100"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="text-gray-600">Executive snapshot and revenue leak analysis</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-gray-400" />
            <select 
              className="form-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-primary">
              <PlayIcon className="w-4 h-4" />
              Run Analysis
            </button>
            <button className="btn-secondary">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export CSV
            </button>
            <button className="btn-secondary">
              <DocumentTextIcon className="w-4 h-4" />
              Create Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            format={kpi.format}
            change={kpi.change}
            tooltip={kpi.tooltip}
          />
        ))}
      </div>

      {/* Segment Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Segment:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {segments.map((segment) => (
              <button
                key={segment}
                onClick={() => setSelectedSegment(segment)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  selectedSegment === segment
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {segment}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Showing {demoAnomalies.length} of {demoAnomalies.length} anomalies
        </div>
      </div>

      {/* Main Anomalies Table */}
      <AnomalyTable
        anomalies={demoAnomalies}
        showFilters={true}
        onRowClick={(anomaly) => setSelectedAnomaly(anomaly)}
        onViewEvidence={(anomaly) => console.log('View evidence:', anomaly)}
        onDraftInvoice={(anomaly) => console.log('Draft invoice:', anomaly)}
        onCreateTask={(anomaly) => console.log('Create task:', anomaly)}
        onSuppress={(anomaly) => console.log('Suppress:', anomaly)}
      />

      {/* Right Drawer for Anomaly Details */}
      {selectedAnomaly && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSelectedAnomaly(null)}></div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="border-b p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Anomaly Details</h2>
                  <button 
                    onClick={() => setSelectedAnomaly(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {selectedAnomaly.account} • {selectedAnomaly.product} • {selectedAnomaly.period}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Math Panel */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Revenue Calculation</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Actual Usage:</span>
                        <span className="font-medium">{selectedAnomaly.actual.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reported Usage:</span>
                        <span className="font-medium">{selectedAnomaly.reported.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Delta:</span>
                        <span className="font-medium">+{selectedAnomaly.delta.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Net Amount Due:</span>
                        <span className="font-bold text-lg">${selectedAnomaly.netDue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Actions</h3>
                    <button className="w-full btn-primary justify-center">
                      <DocumentTextIcon className="w-4 h-4" />
                      Draft Invoice in Stripe
                    </button>
                    <button className="w-full btn-secondary justify-center">
                      Create Salesforce Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}