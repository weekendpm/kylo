// Demo data for when backend is not available

export const demoSummaryData = {
  total_leak_value: 427850,
  total_anomalies: 24,
  affected_accounts: 1247,
  median_confidence: 0.942,
  top_anomalies: [
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
      anomaly_type: 'UNDER_REPORTED' as const,
      confidence: 0.97,
      severity: 'HIGH' as const,
      status: 'NEW' as const
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
      anomaly_type: 'MISSED_OVERAGE' as const,
      confidence: 0.89,
      severity: 'HIGH' as const,
      status: 'NEW' as const
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
      anomaly_type: 'UNDER_REPORTED' as const,
      confidence: 0.93,
      severity: 'HIGH' as const,
      status: 'NEW' as const
    }
  ],
  leak_by_type: {
    UNDER_REPORTED: 320000,
    MISSED_OVERAGE: 87850,
    RENEWAL_DRIFT: 20000
  },
  leak_by_severity: {
    HIGH: 250000,
    MEDIUM: 127850,
    LOW: 50000
  }
}

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('auth_token') === 'demo-token'
}