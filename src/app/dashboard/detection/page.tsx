'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, EyeIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function DetectionPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <MagnifyingGlassIcon className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <div>
            <h1>Detection Engine</h1>
            <p>AI-powered revenue leak detection with real-time monitoring</p>
          </div>
        </div>
        <button className="btn btn-primary">
          <AdjustmentsHorizontalIcon className="w-4 h-4" />
          Configure Rules
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="summary-card">
          <div className="summary-icon bg-blue-500">
            <MagnifyingGlassIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">24</div>
            <div className="summary-label">Active Detections</div>
            <div className="summary-change text-success">+3 today</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon bg-green-500">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">94.2%</div>
            <div className="summary-label">Accuracy Rate</div>
            <div className="summary-change text-success">+2.1%</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon bg-purple-500">
            <EyeIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">2.3h</div>
            <div className="summary-label">Avg Detection Time</div>
            <div className="summary-change text-success">-30m</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon bg-orange-500">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div className="summary-content">
            <div className="summary-value">$427K</div>
            <div className="summary-label">Total Detected</div>
            <div className="summary-change text-success">+$45K</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b" style={{ borderColor: 'var(--border-secondary)' }}>
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: ChartBarIcon },
              { key: 'rules', label: 'Detection Rules', icon: AdjustmentsHorizontalIcon },
              { key: 'recent', label: 'Recent Detections', icon: EyeIcon }
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3>Performance Metrics</h3>
            </div>
            <div className="card-content">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Detection Accuracy</div>
                    <div className="text-2xl font-bold text-green-500">94.2%</div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="text-green-600 font-bold">A+</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--text-secondary)' }}>Coverage</span>
                    <span className="font-medium">98.1%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.1%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--text-secondary)' }}>False Positives</span>
                    <span className="font-medium">5.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '5.8%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Detection Types</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Usage Variance</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>15 detections</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$248K</div>
                    <div className="text-sm text-green-500">+12%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Overage Detection</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>7 detections</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$134K</div>
                    <div className="text-sm text-green-500">+8%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Renewal Drift</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>2 detections</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">$45K</div>
                    <div className="text-sm text-yellow-500">-3%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="card">
          <div className="card-header">
            <h3>Detection Rules Configuration</h3>
            <button className="btn btn-primary btn-sm">Add New Rule</button>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {[
                {
                  name: 'Usage Variance Detection',
                  description: 'Detect when actual usage differs from reported usage by >10%',
                  sensitivity: 'High',
                  status: 'Active',
                  lastTriggered: '2 hours ago'
                },
                {
                  name: 'Overage Monitoring',
                  description: 'Monitor for unreported usage beyond billing limits',
                  sensitivity: 'Medium',
                  status: 'Active',
                  lastTriggered: '5 hours ago'
                },
                {
                  name: 'Renewal Drift Analysis',
                  description: 'Identify accounts with declining renewal rates',
                  sensitivity: 'Low',
                  status: 'Active',
                  lastTriggered: '1 day ago'
                }
              ].map((rule, index) => (
                <div key={index} className="border rounded-lg p-4" style={{ borderColor: 'var(--border-secondary)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{rule.name}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{rule.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        rule.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.status}
                      </span>
                      <button className="btn btn-secondary btn-sm">Configure</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>Sensitivity: </span>
                      <span className={`font-medium ${
                        rule.sensitivity === 'High' ? 'text-red-500' :
                        rule.sensitivity === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                      }`}>{rule.sensitivity}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)' }}>Last Triggered: </span>
                      <span>{rule.lastTriggered}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recent' && (
        <div className="card">
          <div className="card-header">
            <h3>Recent Detections</h3>
            <div className="flex space-x-2">
              <select className="form-select text-sm">
                <option>All Types</option>
                <option>Usage Variance</option>
                <option>Overage Detection</option>
                <option>Renewal Drift</option>
              </select>
              <select className="form-select text-sm">
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {[
                { time: '10:30 AM', account: 'Acme Corp', rule: 'Usage Variance', confidence: 97, amount: '$12,890', status: 'Under Review' },
                { time: '09:15 AM', account: 'TechFlow Solutions', rule: 'Overage Detection', confidence: 89, amount: '$7,682', status: 'Confirmed' },
                { time: '08:45 AM', account: 'DataSync Enterprise', rule: 'Usage Variance', confidence: 93, amount: '$5,823', status: 'Confirmed' }
              ].map((detection, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--border-secondary)' }}>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">{detection.time}</div>
                    <div>
                      <div className="font-medium">{detection.account}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{detection.rule}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className={`text-sm font-medium ${detection.confidence >= 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {detection.confidence}%
                      </div>
                      <div className="text-xs text-gray-500">Confidence</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-500">{detection.amount}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        detection.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {detection.status}
                      </div>
                    </div>
                    <button className="btn btn-primary btn-sm">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}