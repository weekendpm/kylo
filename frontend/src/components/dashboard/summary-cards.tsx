'use client'

import { 
  UserGroupIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface SummaryCardsProps {
  totalLeakValue: number
  totalAnomalies: number
  affectedAccounts: number
  medianConfidence: number
}

export function SummaryCards({
  totalLeakValue,
  totalAnomalies,
  affectedAccounts,
  medianConfidence
}: SummaryCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`
  }

  const cards = [
    {
      title: 'At-Risk Accounts',
      value: affectedAccounts.toLocaleString(),
      icon: UserGroupIcon,
      aiConfidence: 97.1,
      trend: '+12.3% detection rate',
      trendType: 'positive' as const,
    },
    {
      title: 'Recovery Success Rate',
      value: '89.2%',
      icon: ClockIcon,
      aiConfidence: 91.8,
      trend: '+5.7% vs last quarter',
      trendType: 'positive' as const,
    },
    {
      title: 'Average Processing Time',
      value: '2.1ms',
      icon: ShieldCheckIcon,
      aiConfidence: 99.4,
      trend: '-34% latency reduction',
      trendType: 'positive' as const,
    },
    {
      title: 'Recoverable Revenue Identified',
      value: formatCurrency(totalLeakValue),
      icon: CurrencyDollarIcon,
      aiConfidence: 94.2,
      trend: '+18.5% this month',
      trendType: 'positive' as const,
    },
  ]

  return (
    <div className="metrics-grid">
      {cards.map((card) => (
        <div key={card.title} className="metric-card">
          <div className="confidence-indicator">
            <div className="confidence-score">AI: {card.aiConfidence}%</div>
            <div className="confidence-bar">
              <div className="confidence-fill" style={{ width: `${card.aiConfidence}%` }}></div>
            </div>
          </div>
          <div className="metric-icon">
            <card.icon />
          </div>
          <div className="metric-value">{card.value}</div>
          <div className="metric-label">{card.title}</div>
          <div className={`metric-trend trend-${card.trendType}`}>
            <svg className="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
              <polyline points="17,6 23,6 23,12"/>
            </svg>
            {card.trend}
          </div>
        </div>
      ))}
    </div>
  )
}