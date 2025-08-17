'use client'

import { 
  CreditCardIcon,
  EyeIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const demoEntitlements = [
  {
    id: '1',
    account: 'Acme Corp',
    plan: 'Enterprise Pro',
    includedQty: { 'API Calls': 100000, 'Storage GB': 1000, 'Bandwidth TB': 10 },
    tiers: {
      'API Calls': [
        { min: 0, max: 100000, price: 0 },
        { min: 100001, max: 500000, price: 0.02 },
        { min: 500001, max: null, price: 0.015 }
      ]
    },
    overagePrice: { 'API Calls': 0.02, 'Storage GB': 0.50, 'Bandwidth TB': 100 },
    lastSync: '2024-01-31T10:00:00Z',
    source: 'Stripe'
  },
  {
    id: '2',
    account: 'TechStart Inc',
    plan: 'Growth',
    includedQty: { 'API Calls': 50000, 'Storage GB': 500 },
    tiers: {
      'API Calls': [
        { min: 0, max: 50000, price: 0 },
        { min: 50001, max: 200000, price: 0.025 },
        { min: 200001, max: null, price: 0.02 }
      ]
    },
    overagePrice: { 'API Calls': 0.025, 'Storage GB': 0.75 },
    lastSync: '2024-01-30T14:30:00Z',
    source: 'Salesforce'
  }
]

export default function EntitlementsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Entitlements</h1>
          <p className="text-gray-600">Read-only view from Stripe and CRM systems</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4" />
            Last sync: 2 hours ago
          </div>
          
          <button className="btn-secondary">
            <EyeIcon className="w-4 h-4" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="card p-4">
          <div className="text-sm text-gray-600">Total Accounts</div>
          <div className="text-2xl font-bold text-gray-900">{demoEntitlements.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Active Plans</div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(demoEntitlements.map(e => e.plan)).size}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600">Data Sources</div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(demoEntitlements.map(e => e.source)).size}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            Sync Health
            <ExclamationTriangleIcon className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">Healthy</div>
        </div>
      </div>

      {/* Entitlements Table */}
      <div className="card">
        <div className="border-b p-4">
          <h3 className="text-lg font-medium text-gray-900">Account Entitlements</h3>
          <p className="text-sm text-gray-600 mt-1">Included quantities, pricing tiers, and overage rates</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Included Quantities</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overage Pricing</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {demoEntitlements.map((entitlement) => (
                <tr key={entitlement.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entitlement.account}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entitlement.plan}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {Object.entries(entitlement.includedQty).map(([product, qty]) => (
                        <div key={product} className="mb-1">
                          <span className="font-medium">{product}:</span> {qty.toLocaleString()}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {Object.entries(entitlement.overagePrice).map(([product, price]) => (
                        <div key={product} className="mb-1">
                          <span className="font-medium">{product}:</span> ${price}/unit
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {entitlement.source}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(entitlement.lastSync).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CreditCardIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Read-Only Data</h4>
            <p className="text-sm text-blue-700 mt-1">
              Entitlement data is automatically synced from your billing and CRM systems. 
              To modify entitlements, make changes in the source system (Stripe, Salesforce, etc.).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
