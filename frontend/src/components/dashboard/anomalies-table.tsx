'use client'

import { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  DocumentTextIcon,
  LinkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface Anomaly {
  id: string
  account_id: string
  account_name?: string
  product_name: string
  period_start: string
  period_end: string
  actual_units: number
  reported_units: number
  leak_units: number
  leak_value: number
  anomaly_type: 'UNDER_REPORTED' | 'MISSED_OVERAGE' | 'RENEWAL_DRIFT'
  confidence: number
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'NEW' | 'REVIEWED' | 'ACTION_DRAFTED' | 'ACTION_SENT' | 'DISMISSED'
}

interface AnomaliesTableProps {
  anomalies: Anomaly[]
  showPagination?: boolean
}

// Sample data for demonstration
const sampleAnomalies: Anomaly[] = [
  {
    id: '1',
    account_id: 'acc_1a2b3c4d5e',
    account_name: 'Acme Corporation',
    product_name: 'API Gateway Pro',
    period_start: '2024-12-01',
    period_end: '2024-12-31',
    actual_units: 1245678,
    reported_units: 987234,
    leak_units: 258444,
    leak_value: 12890,
    anomaly_type: 'UNDER_REPORTED',
    confidence: 0.97,
    severity: 'HIGH',
    status: 'NEW'
  },
  {
    id: '2',
    account_id: 'acc_9x8y7w6v5u',
    account_name: 'TechFlow Solutions',
    product_name: 'Storage Premium',
    period_start: '2024-12-01',
    period_end: '2024-12-31',
    actual_units: 45892,
    reported_units: 38210,
    leak_units: 7682,
    leak_value: 7682,
    anomaly_type: 'MISSED_OVERAGE',
    confidence: 0.89,
    severity: 'HIGH',
    status: 'NEW'
  },
  {
    id: '3',
    account_id: 'acc_4t5r6e7w8q',
    account_name: 'DataSync Enterprise',
    product_name: 'Transaction Engine',
    period_start: '2024-12-01',
    period_end: '2024-12-31',
    actual_units: 892456,
    reported_units: 834221,
    leak_units: 58235,
    leak_value: 5823,
    anomaly_type: 'UNDER_REPORTED',
    confidence: 0.93,
    severity: 'HIGH',
    status: 'NEW'
  },
  {
    id: '4',
    account_id: 'acc_3z2x1c4v5b',
    account_name: 'CloudBase Systems',
    product_name: 'Bandwidth Plus',
    period_start: '2024-11-01',
    period_end: '2024-11-30',
    actual_units: 234567,
    reported_units: 221890,
    leak_units: 12677,
    leak_value: 2534,
    anomaly_type: 'UNDER_REPORTED',
    confidence: 0.85,
    severity: 'MEDIUM',
    status: 'REVIEWED'
  }
]

export function AnomaliesTable({ anomalies = sampleAnomalies, showPagination = true }: AnomaliesTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'status-critical'
      case 'MEDIUM': return 'status-high'
      case 'LOW': return 'status-medium'
      default: return 'status-medium'
    }
  }

  const filteredAnomalies = anomalies.filter(anomaly => {
    const matchesSearch = anomaly.account_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anomaly.account_id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = activeFilter === 'All' || 
                         (activeFilter === 'Critical' && anomaly.severity === 'HIGH') ||
                         (activeFilter === 'High Value' && anomaly.leak_value >= 5000) ||
                         (activeFilter === 'This Month' && new Date(anomaly.period_start).getMonth() === new Date().getMonth())
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="table-section">
      <div className="table-header">
        <h2 className="table-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
          Revenue Leak Detection Results
        </h2>
        <div className="table-controls">
          <div className="search-box">
            <MagnifyingGlassIcon className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-pills">
            {['All', 'Critical', 'High Value', 'This Month'].map((filter) => (
              <button 
                key={filter}
                className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Product</th>
            <th>Period</th>
            <th>Actual Usage</th>
            <th>Reported Usage</th>
            <th>Revenue Impact</th>
            <th>Risk Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnomalies.map((anomaly) => (
            <tr key={anomaly.id}>
              <td>
                <div className="account-cell">
                  <div className="account-name">{anomaly.account_name || 'Unknown Account'}</div>
                  <div className="account-id">{anomaly.account_id}</div>
                </div>
              </td>
              <td>{anomaly.product_name}</td>
              <td>{new Date(anomaly.period_start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
              <td className="value-cell">{anomaly.actual_units.toLocaleString()}</td>
              <td className="value-cell">{anomaly.reported_units.toLocaleString()}</td>
              <td className="value-cell">{formatCurrency(anomaly.leak_value)}</td>
              <td>
                <span className={`status-badge ${getSeverityClass(anomaly.severity)}`}>
                  {anomaly.severity.charAt(0) + anomaly.severity.slice(1).toLowerCase()}
                </span>
              </td>
              <td>
                <button className="action-button">
                  <DocumentTextIcon width="14" height="14" />
                  Draft Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredAnomalies.length === 0 && (
        <div className="text-center py-8">
          <p style={{ color: 'var(--text-secondary)' }}>No anomalies found</p>
        </div>
      )}
    </div>
  )
}