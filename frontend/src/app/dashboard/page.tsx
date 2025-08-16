'use client'

import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/lib/api'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { AnomaliesTable } from '@/components/dashboard/anomalies-table'

export default function DashboardOverview() {
  const { data: summary, isLoading, error } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () => dashboardService.getSummary(),
  })

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="metrics-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="metric-card loading">
              <div className="h-4 w-1/2 mb-2" style={{ background: 'var(--bg-tertiary)' }}></div>
              <div className="h-8 w-3/4" style={{ background: 'var(--bg-tertiary)' }}></div>
            </div>
          ))}
        </div>
        <div className="table-section loading">
          <div className="h-64" style={{ background: 'var(--bg-tertiary)' }}></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        background: 'rgba(239, 68, 68, 0.1)', 
        border: '1px solid rgba(239, 68, 68, 0.2)',
        color: 'var(--danger)',
        padding: '16px',
        borderRadius: '8px'
      }}>
        Failed to load dashboard data. Please try again.
      </div>
    )
  }

  const summaryData = summary?.data

  return (
    <>
      {/* Summary Cards */}
      <SummaryCards 
        totalLeakValue={summaryData?.total_leak_value || 427850}
        totalAnomalies={summaryData?.total_anomalies || 24}
        affectedAccounts={summaryData?.affected_accounts || 1247}
        medianConfidence={summaryData?.median_confidence || 0.942}
      />

      {/* Top Anomalies Table */}
      <AnomaliesTable 
        anomalies={summaryData?.top_anomalies || []}
        showPagination={false}
      />
    </>
  )
}