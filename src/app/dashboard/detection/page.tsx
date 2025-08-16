'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

export default function DetectionPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <MagnifyingGlassIcon className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <div>
            <h1>Detection Engine</h1>
            <p>Configure and monitor revenue leak detection algorithms</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-header">
            <h3>Detection Rules</h3>
            <button className="btn btn-primary btn-sm">
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              Configure Rules
            </button>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Usage Variance Detection</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Detect when actual usage differs from reported usage by >10%</div>
                </div>
                <div className="status-indicator status-active">Active</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Overage Monitoring</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Monitor for unreported usage beyond billing limits</div>
                </div>
                <div className="status-indicator status-active">Active</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Renewal Drift Analysis</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Identify accounts with declining renewal rates</div>
                </div>
                <div className="status-indicator status-active">Active</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Detection Performance</h3>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="metric-item">
                <div className="metric-label">Detection Accuracy</div>
                <div className="metric-value text-success">94.2%</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">False Positives</div>
                <div className="metric-value text-warning">5.8%</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Coverage</div>
                <div className="metric-value text-success">98.1%</div>
              </div>
              <div className="metric-item">
                <div className="metric-label">Avg. Detection Time</div>
                <div className="metric-value">2.3 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Recent Detections</h3>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Account</th>
                  <th>Rule Triggered</th>
                  <th>Confidence</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-01-15 10:30 AM</td>
                  <td>Acme Corp</td>
                  <td>Usage Variance</td>
                  <td><span className="confidence-score high">97%</span></td>
                  <td className="text-danger">$12,890</td>
                  <td><span className="status-indicator status-pending">Under Review</span></td>
                </tr>
                <tr>
                  <td>2024-01-15 09:15 AM</td>
                  <td>TechFlow Solutions</td>
                  <td>Overage Detection</td>
                  <td><span className="confidence-score high">89%</span></td>
                  <td className="text-danger">$7,682</td>
                  <td><span className="status-indicator status-confirmed">Confirmed</span></td>
                </tr>
                <tr>
                  <td>2024-01-15 08:45 AM</td>
                  <td>DataSync Enterprise</td>
                  <td>Usage Variance</td>
                  <td><span className="confidence-score high">93%</span></td>
                  <td className="text-danger">$5,823</td>
                  <td><span className="status-indicator status-confirmed">Confirmed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}