import { demoSummaryData, isDemoMode } from './demo-data'

// Demo-only API helper for frontend
const createMockApiCall = async <T>(data: T, delay = 300): Promise<{ data: T }> => {
  await new Promise(resolve => setTimeout(resolve, delay))
  return { data }
}

// Demo-only API service functions
export const authService = {
  login: async (email: string, password: string) => {
    if (email === 'demo@demo') {
      return createMockApiCall({
        token: 'demo-token',
        user: {
          id: 'demo-user-1',
          org_id: 'demo-org-1',
          email: 'demo@demo',
          first_name: 'Demo',
          last_name: 'User',
          role: 'ADMIN',
          status: 'ACTIVE'
        },
        org: {
          id: 'demo-org-1',
          name: 'Demo Organization',
          domain: 'demo.com',
          settings: {}
        }
      }, 500)
    }
    throw new Error('Invalid credentials - use demo@demo')
  },
  
  register: async (data: any) => {
    throw new Error('Registration not available in demo mode')
  },
  
  me: async () => {
    const demoUser = localStorage.getItem('demo_user')
    const demoOrg = localStorage.getItem('demo_org')
    if (demoUser && demoOrg) {
      return createMockApiCall({
        user: JSON.parse(demoUser),
        org: JSON.parse(demoOrg)
      })
    }
    throw new Error('Not authenticated')
  },
}

export const dashboardService = {
  getSummary: async (params?: { period_start?: string; period_end?: string }) => {
    return createMockApiCall(demoSummaryData, 500)
  },
  
  getAccountDetails: async (accountId: string) => {
    return createMockApiCall({
      account_id: accountId,
      anomalies: demoSummaryData.top_anomalies.filter(a => a.account_id === accountId),
      usage_trends: []
    })
  },
}

export const reconService = {
  getResults: async (params?: any) => {
    return createMockApiCall({
      results: demoSummaryData.top_anomalies,
      total: demoSummaryData.top_anomalies.length,
      page: 1,
      limit: 10
    })
  },
  
  getRuns: async () => {
    return createMockApiCall({
      runs: [
        {
          id: 'run-1',
          status: 'completed',
          period_start: '2024-01-01',
          period_end: '2024-01-31',
          created_at: '2024-01-31T10:00:00Z',
          completed_at: '2024-01-31T10:05:00Z'
        }
      ]
    })
  },
  
  createRun: async (data: { period_start: string; period_end: string }) => {
    return createMockApiCall({
      id: 'run-new',
      status: 'running',
      ...data,
      created_at: new Date().toISOString()
    })
  },
}

export const integrationService = {
  getAll: async () => {
    return createMockApiCall({
      integrations: [
        { id: 'stripe', name: 'Stripe', status: 'connected', type: 'payment' },
        { id: 'salesforce', name: 'Salesforce', status: 'disconnected', type: 'crm' },
        { id: 'hubspot', name: 'HubSpot', status: 'disconnected', type: 'crm' }
      ]
    })
  },
  
  getStatus: async () => {
    return createMockApiCall({
      stripe: { connected: true, last_sync: '2024-01-31T10:00:00Z' },
      salesforce: { connected: false },
      hubspot: { connected: false }
    })
  },
  
  connectStripe: async (data: { api_key: string }) => {
    return createMockApiCall({ success: true, message: 'Demo: Stripe would be connected' })
  },
}

export const actionService = {
  getAll: async () => {
    return createMockApiCall({
      actions: [
        {
          id: 'action-1',
          type: 'stripe_invoice',
          status: 'completed',
          created_at: '2024-01-31T10:00:00Z'
        }
      ]
    })
  },
  
  createStripeInvoice: async (data: { recon_result_id: string }) => {
    return createMockApiCall({
      id: 'invoice-demo',
      status: 'draft',
      message: 'Demo: Invoice would be created in Stripe'
    })
  },
  
  createCrmTask: async (data: { recon_result_id: string }) => {
    return createMockApiCall({
      id: 'task-demo',
      status: 'created',
      message: 'Demo: Task would be created in CRM'
    })
  },
}

export const exportService = {
  getAll: async () => {
    return createMockApiCall({
      exports: [
        {
          id: 'export-1',
          type: 'csv',
          status: 'completed',
          created_at: '2024-01-31T10:00:00Z',
          download_url: '/demo-export.csv'
        }
      ]
    })
  },
  
  createCsv: async (data: { filters: Record<string, any> }) => {
    return createMockApiCall({
      id: 'export-new',
      status: 'processing',
      message: 'Demo: CSV export would be generated'
    })
  },
  
  download: async (exportId: string) => {
    // Create a demo CSV blob
    const csvContent = 'Account,Product,Amount,Type\nDemo Account,Demo Product,$1000,Revenue Leak'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    return createMockApiCall(blob)
  },
}