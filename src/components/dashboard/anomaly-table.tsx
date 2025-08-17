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
  Critical: 'status-critical',
  High: 'status-high', 
  Medium: 'status-medium',
  Low: 'status-low'
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
        <div className="border-b border-border-primary p-4">
          <div className="flex items-center gap-4 mb-4">
            <FunnelIcon className="w-5 h-5 text-text-muted" />
            <span className="text-sm font-medium text-text-primary">Filters</span>
            <div className="ml-auto flex items-center gap-2">
              <BookmarkIcon className="w-4 h-4 text-text-muted" />
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
        <table className="data-table">
          <thead>
            <tr>
              {allowSelection && (
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="form-checkbox" />
                </th>
              )}
              <th className="text-left">Account</th>
              <th className="text-left">Product</th>
              <th className="text-left">Period</th>
              <th className="text-right">Actual</th>
              <th className="text-right">Reported</th>
              <th className="text-right">Δ</th>
              <th className="text-right">Net $ Due</th>
              <th className="text-left">Severity</th>
              <th className="text-left">Root Cause</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnomalies.map((anomaly) => (
              <tr 
                key={anomaly.id} 
                className={clsx(
                  'cursor-pointer',
                  selectedRows.has(anomaly.id) && 'bg-primary/5'
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
                <td>
                  <div className="font-medium">{anomaly.account}</div>
                </td>
                <td>
                  <div>{anomaly.product}</div>
                </td>
                <td>
                  <div>{anomaly.period}</div>
                </td>
                <td className="text-right">
                  <div className="value-cell">{formatNumber(anomaly.actual)}</div>
                </td>
                <td className="text-right">
                  <div className="value-cell">{formatNumber(anomaly.reported)}</div>
                </td>
                <td className="text-right">
                  <div className="value-cell text-danger">+{formatNumber(anomaly.delta)}</div>
                </td>
                <td className="text-right">
                  <div className="value-cell font-bold">{formatCurrency(anomaly.netDue)}</div>
                </td>
                <td>
                  <span className={clsx('status-badge', severityColors[anomaly.severity])}>
                    {anomaly.severity}
                  </span>
                </td>
                <td>
                  <div>{anomaly.rootCause}</div>
                </td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewEvidence?.(anomaly)
                      }}
                      className="text-text-muted hover:text-text-primary transition-colors"
                      title="View Evidence"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDraftInvoice?.(anomaly)
                      }}
                      className="text-primary hover:text-primary-light transition-colors"
                      title="Draft Invoice"
                    >
                      <DocumentTextIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onCreateTask?.(anomaly)
                      }}
                      className="text-success hover:text-success/80 transition-colors"
                      title="Create SF Task"
                    >
                      <BriefcaseIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSuppress?.(anomaly)
                      }}
                      className="text-danger hover:text-danger/80 transition-colors"
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
          <div className="text-text-secondary">No anomalies found matching the current filters.</div>
        </div>
      )}
    </div>
  )
}
