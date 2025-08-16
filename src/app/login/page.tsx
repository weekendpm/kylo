'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-provider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Demo mode: if email is 'demo@demo', skip actual authentication
      if (email === 'demo@demo') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Create fake user data and store in localStorage for demo
        const demoUser = {
          id: 'demo-user-id',
          org_id: 'demo-org-id',
          email: 'demo@demo',
          first_name: 'Demo',
          last_name: 'User',
          role: 'ADMIN' as const,
          status: 'ACTIVE' as const
        }
        
        const demoOrg = {
          id: 'demo-org-id',
          name: 'Demo Corporation',
          domain: 'demo.com',
          settings: {}
        }
        
        localStorage.setItem('demo_user', JSON.stringify(demoUser))
        localStorage.setItem('demo_org', JSON.stringify(demoOrg))
        localStorage.setItem('auth_token', 'demo-token')
        
        router.push('/dashboard')
        return
      }
      
      await login(email, password)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="logo-icon mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10 5.16 0 9-4.45 9-10V7l-10-5z"/>
              <path d="M12 12h.01"/>
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            Kylo.ai
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            Sign in to your account
          </p>
          <div className="mt-4 p-3 text-center" style={{ 
            background: 'rgba(59, 130, 246, 0.1)', 
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '8px'
          }}>
            <p className="text-xs" style={{ color: 'var(--primary-light)' }}>
              💡 Demo Mode: Use email <strong>demo@demo</strong> with any password
            </p>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: 'var(--danger)',
              padding: '12px 16px',
              borderRadius: '8px'
            }}>
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  width: '100%',
                  fontSize: '14px'
                }}
                className="search-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  width: '100%',
                  fontSize: '14px'
                }}
                className="search-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full justify-center py-3"
              style={{ width: '100%' }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="font-medium"
                style={{ color: 'var(--primary-light)' }}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}