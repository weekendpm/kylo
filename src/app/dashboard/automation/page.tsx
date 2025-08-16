'use client'

import { useState } from 'react'
import { ClockIcon, PlusIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline'

export default function AutomationPage() {
  const [activeRules, setActiveRules] = useState(3)

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <ClockIcon className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <div>
            <h1>Automation Rules</h1>
            <p>Configure automated actions for revenue recovery</p>
          </div>
        </div>
        <button className="btn btn-primary">
          <PlusIcon className="w-4 h-4" />
          Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="summary-card">
          <div className="summary-icon bg-blue-500">
            <ClockIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">{activeRules}</div>
            <div className="summary-label">Active Rules</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon bg-green-500">
            <PlayIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">247</div>
            <div className="summary-label">Actions Executed</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon bg-purple-500">
            <ClockIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">$127K</div>
            <div className="summary-label">Recovered via Automation</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Automation Rules</h3>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            <div className="automation-rule">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="text-green-500 hover:text-green-600">
                    <PlayIcon className="w-5 h-5" />
                  </button>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Auto-Draft Invoice for High Confidence Leaks</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      When confidence > 95% and amount > $1,000, create draft invoice in Stripe
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="status-indicator status-active">Active</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Last triggered: 2h ago</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Trigger Condition</div>
                  <div style={{ color: 'var(--text-primary)' }}>Confidence ≥ 95% AND Amount ≥ $1,000</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Action</div>
                  <div style={{ color: 'var(--text-primary)' }}>Create Stripe Draft Invoice</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Executions (30d)</div>
                  <div style={{ color: 'var(--text-primary)' }}>42 times</div>
                </div>
              </div>
            </div>

            <div className="automation-rule">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="text-green-500 hover:text-green-600">
                    <PlayIcon className="w-5 h-5" />
                  </button>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Create CRM Task for Medium Leaks</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      When confidence > 80% and amount > $500, create follow-up task in CRM
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="status-indicator status-active">Active</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Last triggered: 5h ago</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Trigger Condition</div>
                  <div style={{ color: 'var(--text-primary)' }}>Confidence ≥ 80% AND Amount ≥ $500</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Action</div>
                  <div style={{ color: 'var(--text-primary)' }}>Create CRM Follow-up Task</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Executions (30d)</div>
                  <div style={{ color: 'var(--text-primary)' }}>128 times</div>
                </div>
              </div>
            </div>

            <div className="automation-rule">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="text-yellow-500 hover:text-yellow-600">
                    <PauseIcon className="w-5 h-5" />
                  </button>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Email Alert for Critical Accounts</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      When enterprise account has leak > $10,000, send immediate email alert
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="status-indicator status-paused">Paused</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Last triggered: 1d ago</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Trigger Condition</div>
                  <div style={{ color: 'var(--text-primary)' }}>Account Tier = Enterprise AND Amount ≥ $10,000</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Action</div>
                  <div style={{ color: 'var(--text-primary)' }}>Send Email Alert</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Executions (30d)</div>
                  <div style={{ color: 'var(--text-primary)' }}>7 times</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}