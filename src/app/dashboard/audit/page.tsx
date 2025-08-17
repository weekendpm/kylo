'use client'

import { useState } from 'react'
import { EvidenceViewer } from '@/components/dashboard/evidence-viewer'
import { 
  ArchiveBoxIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

const tabs = [
  { id: 'evidence', name: 'Evidence Viewer', icon: ArchiveBoxIcon },
  { id: 'changelog', name: 'Change Log', icon: ClipboardDocumentListIcon },
  { id: 'runs', name: 'Run History', icon: ClockIcon }
]

const demoEvidence = {
  query: `SELECT 
  account_id,
  product_key,
  billing_period,
  SUM(actual_usage) as actual_qty,
  SUM(reported_usage) as reported_qty,
  SUM(actual_usage) - SUM(reported_usage) as delta_qty,
  AVG(confidence_score) as avg_confidence
FROM usage_reconciliation 
WHERE billing_period = '2024-01'
  AND delta_qty > 0
GROUP BY account_id, product_key, billing_period
ORDER BY delta_qty DESC`,
  queryHash: 'sha256:abc123def456',
  sampleData: [
    {
      account_id: 'acme-corp',
      product_key: 'api_calls',
      billing_period: '2024-01',
      actual_qty: 125000,
      reported_qty: 100000,
      delta_qty: 25000,
      avg_confidence: 0.94
    },
    {
      account_id: 'techstart-inc',
      product_key: 'storage_gb',
      billing_period: '2024-01',
      actual_qty: 8500,
      reported_qty: 7200,
      delta_qty: 1300,
      avg_confidence: 0.87
    }
  ]
}

export default function AuditEvidencePage() {
  const [activeTab, setActiveTab] = useState('evidence')

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit & Evidence</h1>
          <p className="text-gray-600">Trust, traceability, and compliance documentation</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="btn-secondary">
            <LinkIcon className="w-4 h-4" />
            Copy Evidence Link
          </button>
        </div>
      </div>

      {/* Tabs */}
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
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'evidence' && (
        <EvidenceViewer
          title="Revenue Leak Detection Query"
          query={demoEvidence.query}
          queryHash={demoEvidence.queryHash}
          sampleData={demoEvidence.sampleData}
        />
      )}

      {activeTab === 'changelog' && (
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Change Log</h3>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm font-medium text-gray-900">Detection rule updated</div>
              <div className="text-sm text-gray-600">Minimum threshold changed from $100 to $50</div>
              <div className="text-xs text-gray-500 mt-1">2024-01-31 10:30 AM by Finance Admin</div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <div className="text-sm font-medium text-gray-900">Product mapping created</div>
              <div className="text-sm text-gray-600">Added mapping for new "Advanced API" product</div>
              <div className="text-xs text-gray-500 mt-1">2024-01-30 02:15 PM by System Admin</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'runs' && (
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <ClockIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Analysis Run History</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-900">Daily Analysis - January 31, 2024</div>
                <div className="text-sm text-gray-600">Duration: 4m 32s • 24 anomalies detected</div>
              </div>
              <span className="text-sm font-medium text-green-600">Completed</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-900">On-demand Analysis - January 30, 2024</div>
                <div className="text-sm text-gray-600">Duration: 2m 18s • 8 anomalies detected</div>
              </div>
              <span className="text-sm font-medium text-blue-600">Completed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
