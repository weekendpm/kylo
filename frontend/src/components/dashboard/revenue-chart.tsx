'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface RevenueChartProps {
  leakByType: Record<string, number>
  leakBySeverity: Record<string, number>
}

const COLORS = {
  UNDER_REPORTED: '#ef4444',
  MISSED_OVERAGE: '#f59e0b',
  RENEWAL_DRIFT: '#3b82f6',
  HIGH: '#ef4444',
  MEDIUM: '#f59e0b',
  LOW: '#22c55e',
}

export function RevenueChart({ leakByType, leakBySeverity }: RevenueChartProps) {
  const typeData = Object.entries(leakByType).map(([type, value]) => ({
    name: type.replace('_', ' '),
    value,
    color: COLORS[type as keyof typeof COLORS] || '#6b7280'
  }))

  const severityData = Object.entries(leakBySeverity).map(([severity, value]) => ({
    name: severity,
    value,
    color: COLORS[severity as keyof typeof COLORS] || '#6b7280'
  }))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Leak by Type */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Revenue Leak by Type
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leak by Severity */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Revenue Leak by Severity
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={severityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="value" fill="#8884d8">
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}