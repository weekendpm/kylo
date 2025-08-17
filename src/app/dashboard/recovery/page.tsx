'use client'

import { useState } from 'react'
import { 
  DocumentTextIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  PlayIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface RecoveryAction {
  id: string
  type: 'stripe_draft' | 'stripe_sent' | 'stripe_posted' | 'sf_task' | 'sf_opportunity'
  targetAccount: string
  amount: number
  memoHash: string
  status: 'Pending' | 'Sent' | 'Posted' | 'Created' | 'Won' | 'Lost'
  owner: string
  createdAt: string
  anomalyIds: string[]
}

const demoActions: RecoveryAction[] = [
  {
    id: '1',
    type: 'stripe_draft',
    targetAccount: 'Acme Corp',
    amount: 2500,
    memoHash: 'abc123',
    status: 'Pending',
    owner: 'Finance Team',
    createdAt: '2024-01-31T10:00:00Z',
    anomalyIds: ['1']
  },
  {
    id: '2',
    type: 'stripe_sent',
    targetAccount: 'TechStart Inc',
    amount: 1200,
    memoHash: 'def456',
    status: 'Sent',
    owner: 'Finance Team',
    createdAt: '2024-01-30T14:30:00Z',
    anomalyIds: ['2', '3']
  },
  {
    id: '3',
    type: 'stripe_posted',
    targetAccount: 'Global Systems',
    amount: 3400,
    memoHash: 'ghi789',
    status: 'Posted',
    owner: 'Finance Team',
    createdAt: '2024-01-29T09:15:00Z',
    anomalyIds: ['4']
  },
  {
    id: '4',
    type: 'sf_task',
    targetAccount: 'DataFlow Ltd',
    amount: 850,
    memoHash: 'jkl012',
    status: 'Created',
    owner: 'Sales Team',
    createdAt: '2024-01-28T16:45:00Z',
    anomalyIds: ['5']
  },
  {
    id: '5',
    type: 'sf_opportunity',
    targetAccount: 'CloudCorp',
    amount: 5600,
    memoHash: 'mno345',
    status: 'Won',
    owner: 'Sales Team',
    createdAt: '2024-01-25T11:20:00Z',
    anomalyIds: ['6', '7']
  }
]

const tabs = [
  { 
    id: 'stripe-drafts', 
    name: 'Stripe Drafts', 
    icon: DocumentTextIcon,
    types: ['stripe_draft', 'stripe_sent', 'stripe_posted']
  },
  { 
    id: 'salesforce', 
    name: 'Salesforce', 
    icon: BriefcaseIcon,
    types: ['sf_task', 'sf_opportunity']
  }
]

const getActionTypeIcon = (type: string) => {
  switch (type) {
    case 'stripe_draft':
    case 'stripe_sent':
    case 'stripe_posted':
      return DocumentTextIcon
    case 'sf_task':
    case 'sf_opportunity':
      return BriefcaseIcon
    default:
      return DocumentTextIcon
  }
}

const getActionTypeLabel = (type: string) => {
  switch (type) {
    case 'stripe_draft': return 'Draft Invoice'
    case 'stripe_sent': return 'Sent Invoice'
    case 'stripe_posted': return 'Posted Invoice'
    case 'sf_task': return 'SF Task'
    case 'sf_opportunity': return 'SF Opportunity'
    default: return type
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    case 'Sent': return 'bg-blue-100 text-blue-800'
    case 'Posted': return 'bg-green-100 text-green-800'
    case 'Created': return 'bg-blue-100 text-blue-800'
    case 'Won': return 'bg-green-100 text-green-800'
    case 'Lost': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function RecoveryActionsPage() {
  const [activeTab, setActiveTab] = useState('stripe-drafts')
  const [selectedActions, setSelectedActions] = useState<Set<string>>(new Set())

  const filteredActions = demoActions.filter(action => {
    const tab = tabs.find(t => t.id === activeTab)
    return tab?.types.includes(action.type)
  })

  const totalAmount = filteredActions.reduce((sum, action) => sum + action.amount, 0)
  const pendingAmount = filteredActions
    .filter(action => action.status === 'Pending')
    .reduce((sum, action) => sum + action.amount, 0)

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Recovery Actions</h1>
          <p className="text-gray-600">Push dollars to systems of record</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Total Pipeline: <span className="font-semibold text-gray-900">${totalAmount.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-primary">
              <PaperAirplaneIcon className="w-4 h-4" />
              Submit All Drafts
            </button>
            <button className="btn-secondary">
              <ArrowPathIcon className="w-4 h-4" />
              Re-run Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Action Type Tabs */}
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
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {filteredActions.length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="card p-4">
          <div className="text-sm text-gray-600">Total Actions</div>
          <div className="text-2xl font-bold text-gray-900">{filteredActions.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Total Amount</div>
          <div className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Pending Amount</div>
          <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Success Rate</div>
          <div className="text-2xl font-bold text-green-600">92.3%</div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedActions.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-700">
              {selectedActions.size} actions selected
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-sm bg-blue-600 text-white hover:bg-blue-700">
                <PaperAirplaneIcon className="w-4 h-4" />
                Submit Selected
              </button>
              <button className="btn-sm bg-red-600 text-white hover:bg-red-700">
                <XMarkIcon className="w-4 h-4" />
                Revoke Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actions Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="form-checkbox" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActions.map((action) => {
                const IconComponent = getActionTypeIcon(action.type)
                return (
                  <tr key={action.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="form-checkbox" />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {getActionTypeLabel(action.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{action.targetAccount}</div>
                      <div className="text-xs text-gray-500">Memo: {action.memoHash}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${action.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={clsx(
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        getStatusColor(action.status)
                      )}>
                        {action.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{action.owner}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(action.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {action.status === 'Pending' && (
                          <button
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            title="Submit"
                          >
                            Submit
                          </button>
                        )}
                        <button
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                          title="Revoke"
                        >
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredActions.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <BriefcaseIcon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No recovery actions yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create recovery actions from detected anomalies to start recovering revenue.
          </p>
          <button className="btn-primary">
            <PlayIcon className="w-4 h-4" />
            Go to Anomalies
          </button>
        </div>
      )}
    </div>
  )
}
