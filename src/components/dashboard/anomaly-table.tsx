'use client'

import { useState } from 'react'
import { 
  EyeIcon, 
  DocumentTextIcon, 
  BriefcaseIcon, 
  XMarkIcon,
  FunnelIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface Anomaly {
  id: string
  account: string
  product: string
  period: string
  actual: number
  reported: number
  delta: number
  billableDelta: number
  grossAmount: number
  creditsApplied: number
  creditsEligible: number
  netDue: number
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  rootCause: string
  lastSync: string
  status: 'Open' | 'Needs Evidence' | 'Resolved' | 'Suppressed'
}

interface AnomalyTableProps {
  anomalies: Anomaly[]
  showFilters?: boolean
  allowSelection?: boolean
  onRowClick?: (anomaly: Anomaly) => void
  onViewEvidence?: (anomaly: Anomaly) => void
  onDraftInvoice?: (anomaly: Anomaly) => void
  onCreateTask?: (anomaly: Anomaly) => void
  onSuppress?: (anomaly: Anomaly) => void
}

const severityColors = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
}

export function AnomalyTable({ 
  anomalies, 
  showFilters = true,
  allowSelection = false,
  onRowClick,
  onViewEvidence,
  onDraftInvoice,
  onCreateTask,
  onSuppress
}: AnomalyTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    severity: '',
    product: '',
    status: '',
    search: ''
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const filteredAnomalies = anomalies.filter(anomaly => {
    if (filters.severity && anomaly.severity !== filters.severity) return false
    if (filters.product && !anomaly.product.toLowerCase().includes(filters.product.toLowerCase())) return false
    if (filters.status && anomaly.status !== filters.status) return false
    if (filters.search && !anomaly.account.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const toggleRowSelection = (id: string) => {
    const newSelection = new Set(selectedRows)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedRows(newSelection)
  }

  return (
    <div className="card">
      {showFilters && (
        <div className="border-b p-4">
          <div className="flex items-center gap-4 mb-4">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
            <div className="ml-auto flex items-center gap-2">
              <BookmarkIcon className="w-4 h-4 text-gray-400" />
              <select className="form-select text-sm">
                <option>Saved Views</option>
                <option>CFO Weeklies</option>
                <option>Top 20 by $</option>
                <option>Critical Only</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search accounts..."
              className="form-input"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
            <select
              className="form-select"
              value={filters.severity}
              onChange={(e) => setFilters({...filters, severity: e.target.value})}
            >
              <option value="">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              className="form-select"
              value={filters.product}
              onChange={(e) => setFilters({...filters, product: e.target.value})}
            >
              <option value="">All Products</option>
              <option value="API Calls">API Calls</option>
              <option value="Storage">Storage</option>
              <option value="Bandwidth">Bandwidth</option>
            </select>
            <select
              className="form-select"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Needs Evidence">Needs Evidence</option>
              <option value="Resolved">Resolved</option>
              <option value="Suppressed">Suppressed</option>
            </select>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {allowSelection && (
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="form-checkbox" />
                </th>
              )}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Reported</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Δ</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net $ Due</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Root Cause</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAnomalies.map((anomaly) => (
              <tr 
                key={anomaly.id} 
                className={clsx(
                  'hover:bg-gray-50 cursor-pointer',
                  selectedRows.has(anomaly.id) && 'bg-blue-50'
                )}
                onClick={() => onRowClick?.(anomaly)}
              >
                {allowSelection && (
                  <td className="px-4 py-4">
                    <input 
                      type="checkbox" 
                      className="form-checkbox"
                      checked={selectedRows.has(anomaly.id)}
                      onChange={() => toggleRowSelection(anomaly.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{anomaly.account}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{anomaly.product}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{anomaly.period}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900">{formatNumber(anomaly.actual)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900">{formatNumber(anomaly.reported)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-red-600">+{formatNumber(anomaly.delta)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(anomaly.netDue)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    severityColors[anomaly.severity]
                  )}>
                    {anomaly.severity}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{anomaly.rootCause}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewEvidence?.(anomaly)
                      }}
                      className="text-gray-400 hover:text-gray-600"
                      title="View Evidence"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDraftInvoice?.(anomaly)
                      }}
                      className="text-blue-400 hover:text-blue-600"
                      title="Draft Invoice"
                    >
                      <DocumentTextIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onCreateTask?.(anomaly)
                      }}
                      className="text-green-400 hover:text-green-600"
                      title="Create SF Task"
                    >
                      <BriefcaseIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSuppress?.(anomaly)
                      }}
                      className="text-red-400 hover:text-red-600"
                      title="Suppress"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAnomalies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No anomalies found matching the current filters.</div>
        </div>
      )}
    </div>
  )
}
