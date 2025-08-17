'use client'

import { ArrowUpIcon, ArrowDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: number
    period?: string
  }
  tooltip?: string
  trend?: 'up' | 'down' | 'neutral'
  format?: 'currency' | 'percentage' | 'number'
  className?: string
}

export function KPICard({ 
  title, 
  value, 
  change, 
  tooltip, 
  trend, 
  format = 'number',
  className 
}: KPICardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(val)
      case 'percentage':
        return `${val}%`
      default:
        return new Intl.NumberFormat('en-US').format(val)
    }
  }

  const getTrendColor = () => {
    if (!change) return ''
    
    const isPositive = change.value > 0
    const isNegative = change.value < 0
    
    // For currency, positive is good (green), negative is bad (red)
    // For percentages, depends on context but assume positive is good
    if (isPositive) return 'text-success'
    if (isNegative) return 'text-danger'
    return 'text-text-secondary'
  }

  const getTrendIcon = () => {
    if (!change || change.value === 0) return null
    
    return change.value > 0 ? (
      <ArrowUpIcon className="w-4 h-4" />
    ) : (
      <ArrowDownIcon className="w-4 h-4" />
    )
  }

  return (
    <div className={clsx('summary-card', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="summary-label">{title}</h3>
            {tooltip && (
              <div className="group relative">
                <InformationCircleIcon className="w-4 h-4 text-text-muted cursor-help" />
                <div className="absolute left-0 top-6 invisible group-hover:visible bg-bg-elevated text-text-primary text-xs rounded py-1 px-2 whitespace-nowrap z-10 border border-border-secondary shadow-md">
                  {tooltip}
                </div>
              </div>
            )}
          </div>
          
          <div className="summary-value mb-2">
            {formatValue(value)}
          </div>
          
          {change && (
            <div className={clsx('summary-change flex items-center gap-1', getTrendColor())}>
              {getTrendIcon()}
              <span>
                {Math.abs(change.value)}% {change.period || 'vs last month'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
