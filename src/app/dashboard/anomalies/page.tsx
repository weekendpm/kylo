'use client'

import { useState } from 'react'
import { AnomalyTable } from '@/components/dashboard/anomaly-table'
import { 
  ExclamationTriangleIcon,
  EyeIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlayIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

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
    status: 'Resolved' as const
  },
  {
    id: '4',
    account: 'DataFlow Ltd',
    product: 'API Calls',
    period: '2024-01',
    actual: 95000,
    reported: 95000,
    delta: 0,
    billableDelta: 0,
    grossAmount: 0,
    creditsApplied: 0,
    creditsEligible: 0,
    netDue: 0,
    severity: 'Low' as const,
    rootCause: 'False Positive',
    lastSync: '2024-01-31',
    status: 'Suppressed' as const
  }
]

const tabs = [
  { 
    id: 'open', 
    name: 'Open', 
    icon: ExclamationTriangleIcon, 
    count: demoAnomalies.filter(a => a.status === 'Open').length,
    color: 'text-red-600 bg-red-100'
  },
  { 
    id: 'needs-evidence', 
    name: 'Needs Evidence', 
    icon: EyeIcon, 
    count: demoAnomalies.filter(a => a.status === 'Needs Evidence').length,
    color: 'text-orange-600 bg-orange-100'
  },
  { 
    id: 'resolved', 
    name: 'Resolved', 
    icon: CheckCircleIcon, 
    count: demoAnomalies.filter(a => a.status === 'Resolved').length,
    color: 'text-green-600 bg-green-100'
  },
  { 
    id: 'suppressed', 
    name: 'Suppressed', 
    icon: XMarkIcon, 
    count: demoAnomalies.filter(a => a.status === 'Suppressed').length,
    color: 'text-gray-600 bg-gray-100'
  }
]

export default function AnomaliesPage() {
  const [activeTab, setActiveTab] = useState('open')
  const [selectedAnomalies, setSelectedAnomalies] = useState<Set<string>>(new Set())

  const getStatusFromTab = (tabId: string) => {
    switch (tabId) {
      case 'open': return 'Open'
      case 'needs-evidence': return 'Needs Evidence'
      case 'resolved': return 'Resolved'
      case 'suppressed': return 'Suppressed'
      default: return 'Open'
    }
  }

  const filteredAnomalies = demoAnomalies.filter(
    anomaly => anomaly.status === getStatusFromTab(activeTab)
  )

  const totalRecoverable = filteredAnomalies.reduce((sum, anomaly) => sum + anomaly.netDue, 0)

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Anomalies</h1>
          <p className="text-gray-600">Triage and validate revenue leak detections</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Total Recoverable: <span className="font-semibold text-gray-900">${totalRecoverable.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-primary">
              <PlayIcon className="w-4 h-4" />
              Run Analysis
            </button>
            <button className="btn-secondary">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export Selected
            </button>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex items-center gap-3 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
              <span className={clsx(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                tab.color
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Stats for Active Tab */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="card p-4">
          <div className="text-sm text-gray-600">Total Anomalies</div>
          <div className="text-2xl font-bold text-gray-900">{filteredAnomalies.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Total Amount</div>
          <div className="text-2xl font-bold text-gray-900">${totalRecoverable.toLocaleString()}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Avg Amount</div>
          <div className="text-2xl font-bold text-gray-900">
            ${filteredAnomalies.length > 0 ? Math.round(totalRecoverable / filteredAnomalies.length).toLocaleString() : '0'}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Accounts Affected</div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(filteredAnomalies.map(a => a.account)).size}
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedAnomalies.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-700">
              {selectedAnomalies.size} anomalies selected
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-sm bg-blue-600 text-white hover:bg-blue-700">
                Bulk Draft Invoices
              </button>
              <button className="btn-sm bg-green-600 text-white hover:bg-green-700">
                Bulk Create Tasks
              </button>
              <button className="btn-sm bg-gray-600 text-white hover:bg-gray-700">
                Bulk Suppress
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anomalies Table */}
      <AnomalyTable
        anomalies={filteredAnomalies}
        showFilters={true}
        allowSelection={true}
        onViewEvidence={(anomaly) => console.log('View evidence:', anomaly)}
        onDraftInvoice={(anomaly) => console.log('Draft invoice:', anomaly)}
        onCreateTask={(anomaly) => console.log('Create task:', anomaly)}
        onSuppress={(anomaly) => console.log('Suppress:', anomaly)}
      />

      {/* Empty State */}
      {filteredAnomalies.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <ExclamationTriangleIcon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {getStatusFromTab(activeTab).toLowerCase()} anomalies
          </h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'open' 
              ? 'Great! No open anomalies requiring attention.'
              : `No anomalies in ${getStatusFromTab(activeTab).toLowerCase()} status.`
            }
          </p>
          {activeTab === 'open' && (
            <button className="btn-primary">
              <PlayIcon className="w-4 h-4" />
              Run New Analysis
            </button>
          )}
        </div>
      )}
    </div>
  )
}
