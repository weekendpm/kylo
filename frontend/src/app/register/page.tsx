'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/api'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    admin_email: '',
    admin_first_name: '',
    admin_last_name: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await authService.register(formData)
      router.push('/login?message=Registration successful! Please sign in.')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
            Get Started with Revenue Recovery
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            Create your organization account
          </p>
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
          <div className="space-y-4">
            <div>
              <label htmlFor="name" style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                Organization Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
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
                placeholder="Acme Corporation"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="domain" style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                Domain (Optional)
              </label>
              <input
                id="domain"
                name="domain"
                type="text"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  width: '100%',
                  fontSize: '14px'
                }}
                placeholder="acme.com"
                value={formData.domain}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="admin_first_name" style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                Admin First Name
              </label>
              <input
                id="admin_first_name"
                name="admin_first_name"
                type="text"
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
                placeholder="John"
                value={formData.admin_first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="admin_last_name" style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                Admin Last Name
              </label>
              <input
                id="admin_last_name"
                name="admin_last_name"
                type="text"
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
                placeholder="Doe"
                value={formData.admin_last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="admin_email" style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                Admin Email
              </label>
              <input
                id="admin_email"
                name="admin_email"
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
                placeholder="john@acme.com"
                value={formData.admin_email}
                onChange={handleChange}
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="font-medium"
                style={{ color: 'var(--primary-light)' }}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}