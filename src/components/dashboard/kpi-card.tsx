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
    if (isPositive) return 'text-green-600'
    if (isNegative) return 'text-red-600'
    return 'text-gray-500'
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
    <div className={clsx('card p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            {tooltip && (
              <div className="group relative">
                <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute left-0 top-6 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                  {tooltip}
                </div>
              </div>
            )}
          </div>
          
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatValue(value)}
          </div>
          
          {change && (
            <div className={clsx('flex items-center gap-1 text-sm', getTrendColor())}>
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
