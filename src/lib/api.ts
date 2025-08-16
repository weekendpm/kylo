import axios from 'axios'
import { demoSummaryData, isDemoMode } from './demo-data'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API service functions
export const authService = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  
  register: (data: {
    name: string
    domain?: string
    admin_email: string
    admin_first_name: string
    admin_last_name: string
  }) => api.post('/api/auth/register', data),
  
  me: () => api.get('/api/auth/me'),
}

export const dashboardService = {
  getSummary: async (params?: { period_start?: string; period_end?: string }) => {
    if (isDemoMode()) {
      // Return demo data with a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      return { data: demoSummaryData }
    }
    return api.get('/api/dashboard/summary', { params })
  },
  
  getAccountDetails: async (accountId: string) => {
    if (isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { 
        data: {
          account_id: accountId,
          anomalies: demoSummaryData.top_anomalies.filter(a => a.account_id === accountId),
          usage_trends: []
        }
      }
    }
    return api.get(`/api/dashboard/accounts/${accountId}`)
  },
}

export const reconService = {
  getResults: (params?: {
    account_id?: string
    product_id?: string
    anomaly_type?: string
    status?: string
    severity?: string
    period_start?: string
    period_end?: string
    min_leak_value?: number
    min_confidence?: number
    limit?: number
    offset?: number
  }) => api.get('/api/recon/results', { params }),
  
  getRuns: () => api.get('/api/recon/runs'),
  
  createRun: (data: { period_start: string; period_end: string }) =>
    api.post('/api/recon/runs', data),
}

export const integrationService = {
  getAll: () => api.get('/api/integrations'),
  
  getStatus: () => api.get('/api/integrations/status'),
  
  connectStripe: (data: { api_key: string }) =>
    api.post('/api/integrations/stripe/connect', data),
}

export const actionService = {
  getAll: () => api.get('/api/actions'),
  
  createStripeInvoice: (data: { recon_result_id: string }) =>
    api.post('/api/actions/stripe/draft-invoice', data),
  
  createCrmTask: (data: { recon_result_id: string }) =>
    api.post('/api/actions/crm/task', data),
}

export const exportService = {
  getAll: () => api.get('/api/exports'),
  
  createCsv: (data: { filters: Record<string, any> }) =>
    api.post('/api/exports/csv', data),
  
  download: (exportId: string) =>
    api.get(`/api/exports/${exportId}/download`, { responseType: 'blob' }),
}