'use client'

import { useState } from 'react'
import { 
  ClipboardDocumentIcon, 
  LinkIcon,
  CodeBracketIcon,
  TableCellsIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface EvidenceViewerProps {
  title?: string
  query: string
  queryHash?: string
  sampleData: any[]
  className?: string
}

export function EvidenceViewer({ 
  title = "Evidence Query",
  query, 
  queryHash,
  sampleData,
  className 
}: EvidenceViewerProps) {
  const [activeTab, setActiveTab] = useState<'query' | 'results'>('query')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const copyEvidenceLink = () => {
    const link = `${window.location.origin}/evidence/${queryHash || 'demo-hash'}`
    copyToClipboard(link)
  }

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return '-'
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-US').format(value)
    }
    return String(value)
  }

  const tabs = [
    { id: 'query', name: 'SQL Query', icon: CodeBracketIcon },
    { id: 'results', name: 'Sample Data', icon: TableCellsIcon }
  ]

  return (
    <div className={clsx('card', className)}>
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="flex items-center gap-2">
            {queryHash && (
              <button
                onClick={copyEvidenceLink}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 text-sm"
              >
                <LinkIcon className="w-4 h-4" />
                Copy Evidence Link
              </button>
            )}
          </div>
        </div>
        
        <div className="flex space-x-1 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'query' | 'results')}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md',
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'query' && (
          <div className="space-y-4">
            <div className="relative">
              <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
                <code className="text-gray-800">{query}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(query)}
                className={clsx(
                  'absolute top-2 right-2 p-2 rounded-md transition-colors',
                  copied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
                title="Copy SQL"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <ClipboardDocumentIcon className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {queryHash && (
              <div className="text-sm text-gray-500">
                Query Hash: <code className="bg-gray-100 px-2 py-1 rounded">{queryHash}</code>
              </div>
            )}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Showing {sampleData.length} sample rows
            </div>
            
            {sampleData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(sampleData[0]).map((header) => (
                        <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sampleData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.values(row).map((value, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap">
                            {formatValue(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No sample data available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
