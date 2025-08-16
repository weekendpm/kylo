'use client'

import { useState } from 'react'
import { ClockIcon, PlusIcon, PlayIcon, PauseIcon, CogIcon, ChartBarIcon, BoltIcon } from '@heroicons/react/24/outline'

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('rules')

  const rules = [
    {
      id: 1,
      name: 'High-Value Invoice Generation',
      description: 'Automatically create Stripe invoices for high-confidence revenue leaks',
      trigger: 'Confidence ≥ 95% AND Amount ≥ $1,000',
      action: 'Create Stripe Draft Invoice',
      status: 'Active',
      executions: 42,
      lastTriggered: '2h ago',
      recovered: '$89,420',
      priority: 'High'
    },
    {
      id: 2,
      name: 'CRM Follow-up Tasks',
      description: 'Create follow-up tasks in CRM for medium-confidence leaks',
      trigger: 'Confidence ≥ 80% AND Amount ≥ $500',
      action: 'Create CRM Task',
      status: 'Active',
      executions: 128,
      lastTriggered: '45m ago',
      recovered: '$34,580',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Enterprise Alert System',
      description: 'Send immediate alerts for critical enterprise account leaks',
      trigger: 'Account Tier = Enterprise AND Amount ≥ $10,000',
      action: 'Send Email Alert',
      status: 'Paused',
      executions: 7,
      lastTriggered: '1d ago',
      recovered: '$127,890',
      priority: 'Critical'
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <BoltIcon className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <div>
            <h1>Automation Engine</h1>
            <p>Smart automation workflows for revenue recovery at scale</p>
          </div>
        </div>
        <button className="btn btn-primary">
          <PlusIcon className="w-4 h-4" />
          Create Workflow
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="summary-card">
          <div className="summary-icon bg-green-500">
            <PlayIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">3</div>
            <div className="summary-label">Active Rules</div>
            <div className="summary-change text-success">+1 this week</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon bg-blue-500">
            <BoltIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">247</div>
            <div className="summary-label">Actions Executed</div>
            <div className="summary-change text-success">+18 today</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon bg-purple-500">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">$251K</div>
            <div className="summary-label">Total Recovered</div>
            <div className="summary-change text-success">+$23K</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon bg-orange-500">
            <ClockIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">94%</div>
            <div className="summary-label">Success Rate</div>
            <div className="summary-change text-success">+2%</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b" style={{ borderColor: 'var(--border-secondary)' }}>
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'rules', label: 'Active Rules', icon: PlayIcon },
              { key: 'performance', label: 'Performance', icon: ChartBarIcon },
              { key: 'templates', label: 'Templates', icon: CogIcon }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="card">
              <div className="card-content">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <button className={`mt-1 ${
                      rule.status === 'Active' 
                        ? 'text-green-500 hover:text-green-600' 
                        : 'text-gray-400 hover:text-gray-500'
                    }`}>
                      {rule.status === 'Active' ? 
                        <PlayIcon className="w-6 h-6" /> : 
                        <PauseIcon className="w-6 h-6" />
                      }
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                          {rule.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rule.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                          rule.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {rule.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rule.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {rule.status}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                        {rule.description}
                      </p>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                        <div className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                          <div className="font-medium text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Trigger Condition
                          </div>
                          <div className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>
                            {rule.trigger}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                          <div className="font-medium text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Automated Action
                          </div>
                          <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {rule.action}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                          <div className="font-medium text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-secondary)' }}>
                            Performance (30d)
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{rule.executions} runs</span>
                            <span className="font-bold text-green-500">{rule.recovered}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm">
                      <div style={{ color: 'var(--text-secondary)' }}>Last triggered</div>
                      <div className="font-medium">{rule.lastTriggered}</div>
                    </div>
                    <button className="btn btn-secondary btn-sm">
                      <CogIcon className="w-4 h-4" />
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add New Rule CTA */}
          <div className="card border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
            <div className="card-content text-center py-8">
              <PlusIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Create New Automation Rule
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Set up automated actions to streamline your revenue recovery process
              </p>
              <button className="btn btn-primary">
                <PlusIcon className="w-4 h-4" />
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3>Success Rate by Rule</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {rule.executions} executions
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">
                        {Math.floor(Math.random() * 10) + 90}%
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        success rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Recovery Impact</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                    <div>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Last 30 days
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">{rule.recovered}</div>
                      <div className="text-xs text-green-500">+23% vs last month</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Stripe Invoice Automation',
              description: 'Automatically create and send invoices for confirmed revenue leaks',
              category: 'Billing',
              integrations: ['Stripe', 'QuickBooks'],
              popular: true
            },
            {
              name: 'CRM Task Creation',
              description: 'Create follow-up tasks in your CRM for manual review',
              category: 'Sales',
              integrations: ['Salesforce', 'HubSpot', 'Pipedrive'],
              popular: true
            },
            {
              name: 'Slack Notifications',
              description: 'Send real-time notifications to your team channels',
              category: 'Communication',
              integrations: ['Slack', 'Microsoft Teams'],
              popular: false
            },
            {
              name: 'Email Alert System',
              description: 'Send automated email alerts to stakeholders',
              category: 'Communication',
              integrations: ['SMTP', 'SendGrid', 'Mailgun'],
              popular: false
            },
            {
              name: 'Webhook Integration',
              description: 'Send data to custom endpoints for advanced workflows',
              category: 'Developer',
              integrations: ['REST API', 'GraphQL'],
              popular: false
            },
            {
              name: 'Data Export Automation',
              description: 'Automatically export detection data to cloud storage',
              category: 'Data',
              integrations: ['AWS S3', 'Google Drive', 'Dropbox'],
              popular: false
            }
          ].map((template, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow">
              <div className="card-content">
                {template.popular && (
                  <div className="mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      Popular
                    </span>
                  </div>
                )}
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {template.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {template.description}
                </p>
                <div className="mb-4">
                  <div className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    INTEGRATIONS
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {template.integrations.map((integration, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="btn btn-primary btn-sm w-full">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}